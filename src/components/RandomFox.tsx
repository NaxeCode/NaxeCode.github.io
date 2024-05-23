import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const RandomFox = () => {
	const [randomFoxPic, setRandomFoxPic] = useState('');

	useEffect(() => {
		const randomPic = `https://randomfox.ca/images/${Math.floor(
			Math.random() * (1 + 110 + 1)
		)}.jpg`;
		setRandomFoxPic(randomPic);
	}, []);

	const imgStyle = {
		borderRadius: '2%',
		width: '60%',
		display: 'block',
		margin: '0 auto', // Center the image
	};

	return (
		<div>
			{randomFoxPic ? (
				<img src={randomFoxPic} style={imgStyle} alt="Random Fox" />
			) : (
				<p>Loading...</p> // Debugging fallback
			)}
		</div>
	);
};

export default RandomFox;
