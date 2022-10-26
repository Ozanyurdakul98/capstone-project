import React from 'react';

export function ClickToCloseFullscreen({ onClick, style }) {
	return (
		<button
			onClick={(event) => onClick(event)}
			className={`${style} absolute top-0 left-0 z-30 h-screen w-screen cursor-default`}
		></button>
	);
}

export function ClickToCloseDiv({ onClick, style }) {
	return (
		<button
			onClick={(event) => onClick(event)}
			className={`${style} absolute z-30 h-full w-full cursor-default`}
		></button>
	);
}
