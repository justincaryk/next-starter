'use client';

import React from 'react';

import { COMPANY_NAME } from '@/constants';
import reportAccessibility from '@/utils/report-accessibility';

function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative h-screen">
      <div className="w-full flex justify-center items-center">
        <img src="OrcaLearn.png" className="max-h-16" alt={`${COMPANY_NAME} Logo`} />
        <div className="font-bold text-4xl text-blue-dark">{COMPANY_NAME}</div>
      </div>
      <div className="flex justify-center py-10 lg:py-6">
        <div className="max-w-2xl w-full px-10">{children}</div>
      </div>
    </section>
  );
}

// @eslint-disable-next-line @typescript-eslint/no-floating-promises
void reportAccessibility(React);

export default PrivateLayout;
