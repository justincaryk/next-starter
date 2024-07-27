import { COMPANY_NAME } from '@/constants';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
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
