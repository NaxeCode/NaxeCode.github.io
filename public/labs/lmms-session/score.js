/* Original four-bar cue and the shared LMMS tick representation (48 ticks per quarter). */
(function (global) {
	"use strict";
	const beat = 48,
		bar = 192,
		length = bar * 4,
		step = 12;
	const pitchName = (key) =>
		["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"][
			key % 12
		] +
		(Math.floor(key / 12) - 1);
	const note = (pos, len, key, vol, pan = 0) => ({ pos, len, key, vol, pan });
	const part = (id, name, voice, color, wave, gain, notes) => ({
		id,
		name,
		voice,
		color,
		wave,
		gain,
		clip: "Low Tide Relay",
		muted: false,
		notes,
	});
	function create() {
		const lead = [],
			bass = [],
			bed = [],
			clock = [];
		const tunes = [
			[
				[0, 74, 3],
				[4, 77, 2],
				[7, 81, 3],
				[12, 79, 2],
				[14, 77, 2],
			],
			[
				[0, 76, 4],
				[6, 74, 2],
				[8, 71, 3],
				[13, 74, 3],
			],
			[
				[0, 72, 3],
				[4, 76, 2],
				[7, 79, 3],
				[11, 81, 2],
				[14, 76, 2],
			],
			[
				[0, 79, 4],
				[6, 76, 2],
				[9, 74, 3],
				[13, 72, 2],
			],
		];
		const chords = [
			[62, 65, 69, 72],
			[59, 62, 67, 69],
			[60, 64, 67, 69],
			[60, 64, 67, 71],
		];
		const roots = [38, 43, 45, 36];
		for (let b = 0; b < 4; b++) {
			const start = b * bar;
			tunes[b].forEach(([s, key, d], i) =>
				lead.push(
					note(
						start + s * step,
						d * step,
						key,
						i === 0 ? 90 : 74,
						-12,
					),
				),
			);
			[
				[0, 5, 0],
				[7, 2, 7],
				[10, 4, 12],
				[15, 1, 7],
			].forEach(([s, d, offset], i) =>
				bass.push(
					note(
						start + s * step,
						d * step,
						roots[b] + offset,
						i === 0 ? 98 : 76,
					),
				),
			);
			chords[b].forEach((key, i) =>
				bed.push(note(start, bar - 12, key, 48, i % 2 ? 34 : -34)),
			);
			[2, 4, 7, 10, 12, 15].forEach((s, i) =>
				clock.push(
					note(
						start + s * step,
						step,
						i % 3 ? 86 : 81,
						i % 3 ? 43 : 62,
						23,
					),
				),
			);
		}
		return {
			title: "Low Tide Relay",
			bpm: 96,
			tracks: [
				part(
					"glass",
					"Glass lead",
					"Bell pluck",
					"#197f78",
					"sine",
					0.19,
					lead,
				),
				part(
					"bass",
					"Harbor bass",
					"Round pulse",
					"#945332",
					"triangle",
					0.24,
					bass,
				),
				part(
					"bed",
					"Tide chords",
					"Soft keys",
					"#605eaf",
					"sine",
					0.12,
					bed,
				),
				part(
					"clock",
					"Signal ticks",
					"Mallet",
					"#936a16",
					"triangle",
					0.08,
					clock,
				),
			],
		};
	}
	function validate(project) {
		if (
			!Number.isInteger(project.bpm) ||
			project.bpm < 60 ||
			project.bpm > 168
		)
			throw Error("Tempo must be 60–168 BPM.");
		for (const track of project.tracks)
			for (const n of track.notes) {
				for (const field of ["pos", "len", "key", "vol", "pan"])
					if (!Number.isInteger(n[field]))
						throw Error("Note fields must be integers.");
				if (
					n.pos < 0 ||
					n.len <= 0 ||
					n.pos + n.len > length ||
					n.key < 0 ||
					n.key > 127 ||
					n.vol < 0 ||
					n.vol > 200 ||
					Math.abs(n.pan) > 100
				)
					throw Error(
						"Note is outside this session’s tick, pitch, volume or pan range.",
					);
			}
	}
	const ordered = (track) =>
		[...track.notes].sort((a, b) => a.pos - b.pos || a.key - b.key);
	function requests(project) {
		validate(project);
		return project.tracks.map((track) => ({
			cmd: "set_notes",
			track: track.name,
			clip: track.clip,
			notes: ordered(track),
		}));
	}
	const xml = (value) =>
		String(value).replace(
			/[&<>"']/g,
			(c) =>
				({
					"&": "&amp;",
					"<": "&lt;",
					">": "&gt;",
					'"': "&quot;",
					"'": "&apos;",
				})[c],
		);
	function mmp(project) {
		validate(project);
		// 31 is the file version of this fork (DataFile::UPGRADE_METHODS.size()).
		const tracks = project.tracks
			.map((track) => {
				const notes = ordered(track)
					.map(
						(n) =>
							`          <note pos="${n.pos}" len="${n.len}" key="${n.key}" vol="${n.vol}" pan="${n.pan}" type="0"/>`,
					)
					.join("\n");
				return `      <track name="${xml(track.name)}" type="0" muted="${Number(track.muted)}" solo="0">
        <instrumenttrack name="tripleoscillator" vol="${Math.round(track.gain * 190)}" pan="0" basenote="69">
          <instrument name="tripleoscillator"><tripleoscillator wavetype0="${track.wave === "sine" ? 0 : 1}" vol0="100" vol1="0" vol2="0" coarse0="0" modalgo1="2" modalgo2="2"/></instrument>
        </instrumenttrack>
        <midiclip name="${xml(track.clip)}" type="1" pos="0" len="${length}" steps="16" muted="0" autoresize="0">
${notes}
        </midiclip>
      </track>`;
			})
			.join("\n");
		return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE lmms-project>
<lmms-project version="31" type="song" creator="LMMS Session" creatorversion="1.3.0-alpha.2">
  <head bpm="${project.bpm}" timesig_numerator="4" timesig_denominator="4" mastervol="85" masterpitch="0"/>
  <song>
    <trackcontainer type="song" visible="1">
${tracks}
    </trackcontainer>
    <timeline lpstate="1" lp0pos="0" lp1pos="${length}"/>
  </song>
</lmms-project>
`;
	}
	const api = {
		beat,
		bar,
		length,
		step,
		pitchName,
		create,
		validate,
		ordered,
		requests,
		mmp,
	};
	global.SessionScore = api;
	if (typeof module !== "undefined") module.exports = api;
})(globalThis);
