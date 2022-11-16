import React from 'react';

export function BackgroundOverlayFullscreen({ onClick, style }) {
  return <button onClick={(event) => onClick(event)} className={`${style} `}></button>;
}

export function BackgroundOverlay({ onClick, style }) {
  return (
    <button
      onClick={(event) => onClick(event)}
      className={`${style} absolute z-30 h-full w-full cursor-default`}></button>
  );
}
