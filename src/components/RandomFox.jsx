import { createElement, render } from 'preact';

export default function App() {
	let randomFixPic =
		'https://randomfox.ca/images/' +
		Math.floor(Math.random() * (1 + 110 + 1)) +
		'.jpg';

	const imgStyle = {
		borderRadius: '3%',
		width: '60%',
	};
	return <img src={randomFixPic} style={imgStyle} />;
}
