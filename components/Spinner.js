export function Spinner() {
  return (
    <div className="bg-secondary spinner-grow mb-2 inline-block h-12 w-12 rounded-full opacity-0" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
