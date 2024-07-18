import type { Metadata } from 'next';

import './globals.css';

import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Orca Learn',
  description: 'Get to Learning!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
