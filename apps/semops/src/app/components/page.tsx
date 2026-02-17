import { notFound } from 'next/navigation';
import { ComponentsPage } from './components-page';

export default function Page() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return <ComponentsPage />;
}
