import Header from '../Header';

import { Footer } from '../Footer';

export default function StudiosDetailpage({ children }) {
  return (
    <div className="bg-site relative overflow-x-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
