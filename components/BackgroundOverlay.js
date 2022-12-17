export function BackgroundOverlayFullscreen({ onClick, style }) {
  return <button type="button" onClick={(event) => onClick(event)} className={`${style} modalIn`}></button>;
}

export function BackgroundOverlay({ onClick, style }) {
  return (
    <button
      type="button"
      onClick={(event) => onClick(event)}
      className={`${style} absolute  z-30 h-full w-full cursor-default`}></button>
  );
}
