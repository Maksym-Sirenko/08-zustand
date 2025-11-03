import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './globals.css';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import { VERSEL_URL, IMAGE_URL } from '@/lib/constants';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Create you next note',
  openGraph: {
    title: 'NoteHub - Your Personal Notes Manager',
    description:
      'Create, organize and manage your notes efficiently with NoteHub.',
    url: VERSEL_URL,
    images: [
      {
        url: IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'NoteHub - Notes Management App',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoteHub - Your Personal Notes Manager',
    description:
      'Create, organize and manage your notes efficiently with NoteHub.',
    images: [IMAGE_URL],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
