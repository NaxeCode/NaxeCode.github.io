/* The live transport and the offline audio sample use the same oscillator voices. */
(function (global) {
	"use strict";
	function instrument(ctx, output, track, n, at, duration) {
		const env = ctx.createGain(),
			pan = ctx.createStereoPanner();
		pan.pan.value = n.pan / 100;
		env.connect(pan).connect(output);
		const level = Math.max(0.00015, (track.gain * n.vol) / 100);
		const attack = track.id === "bed" ? 0.075 : 0.006;
		const release =
			track.id === "clock" ? 0.025 : track.id === "bed" ? 0.15 : 0.085;
		const attackEnd = at + Math.min(duration * 0.45, attack);
		env.gain.setValueAtTime(0.0001, at);
		env.gain.exponentialRampToValueAtTime(level, attackEnd);
		env.gain.exponentialRampToValueAtTime(
			Math.max(
				0.00012,
				level *
					(track.id === "clock"
						? 0.025
						: track.id === "glass"
							? 0.19
							: 0.72),
			),
			at + duration,
		);
		env.gain.exponentialRampToValueAtTime(0.0001, at + duration + release);
		const partials =
			track.id === "glass"
				? [
						[1, 1],
						[2, 0.26],
						[3, 0.08],
					]
				: track.id === "bed"
					? [
							[1, 0.85],
							[2, 0.15],
						]
					: [[1, 1]];
		const frequency = 440 * 2 ** ((n.key - 69) / 12);
		for (const [multiple, amount] of partials) {
			const osc = ctx.createOscillator(),
				gain = ctx.createGain();
			osc.type = track.wave;
			osc.frequency.value = frequency * multiple;
			gain.gain.value = amount;
			osc.connect(gain).connect(env);
			osc.start(at);
			osc.stop(at + duration + release + 0.01);
			osc.onended = () => {
				osc.disconnect();
				gain.disconnect();
			};
		}
	}
	function master(ctx) {
		const mix = ctx.createGain();
		mix.gain.value = 0.66;
		mix.connect(ctx.destination);
		return mix;
	}
	async function render(project) {
		const sec = 60 / (project.bpm * SessionScore.beat),
			rate = 44100;
		// Render two passes so a sustained release from the last bar is present
		// at the start of the exported loop, just as it is on the live transport.
		const frames = Math.round(SessionScore.length * sec * rate);
		const ctx = new OfflineAudioContext(2, frames * 2, rate);
		const mix = master(ctx);
		for (let pass = 0; pass < 2; pass++) {
			for (const track of project.tracks) {
				if (track.muted) continue;
				for (const n of track.notes) {
					instrument(
						ctx,
						mix,
						track,
						n,
						(pass * frames) / rate + n.pos * sec,
						n.len * sec,
					);
				}
			}
		}
		const full = await ctx.startRendering();
		const loop = new AudioBuffer({
			length: frames,
			numberOfChannels: 2,
			sampleRate: rate,
		});
		for (let channel = 0; channel < 2; channel++) {
			loop.copyToChannel(
				full.getChannelData(channel).subarray(frames),
				channel,
			);
		}
		return loop;
	}
	function wave(buffer) {
		const channels = buffer.numberOfChannels,
			frames = buffer.length,
			bytes = 44 + frames * channels * 2;
		const out = new ArrayBuffer(bytes),
			v = new DataView(out);
		const tag = (p, s) =>
			[...s].forEach((c, i) => v.setUint8(p + i, c.charCodeAt(0)));
		tag(0, "RIFF");
		v.setUint32(4, bytes - 8, true);
		tag(8, "WAVE");
		tag(12, "fmt ");
		v.setUint32(16, 16, true);
		v.setUint16(20, 1, true);
		v.setUint16(22, channels, true);
		v.setUint32(24, buffer.sampleRate, true);
		v.setUint32(28, buffer.sampleRate * channels * 2, true);
		v.setUint16(32, channels * 2, true);
		v.setUint16(34, 16, true);
		tag(36, "data");
		v.setUint32(40, bytes - 44, true);
		const planes = Array.from({ length: channels }, (_, i) =>
			buffer.getChannelData(i),
		);
		let pos = 44;
		for (let i = 0; i < frames; i++)
			for (const plane of planes) {
				const sample = Math.max(-1, Math.min(1, plane[i]));
				v.setInt16(
					pos,
					Math.round(sample * (sample < 0 ? 32768 : 32767)),
					true,
				);
				pos += 2;
			}
		return out;
	}
	global.SessionSynth = { instrument, master, render, wave };
})(globalThis);
