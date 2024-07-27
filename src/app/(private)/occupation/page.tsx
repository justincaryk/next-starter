'use client';

import { Industry } from '@/types';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '@/components/parts/button';
import Card from '@/components/parts/card';
import PageSubtitle from '@/components/parts/page-subtitle';
import PageTitle from '@/components/parts/page-title';
import { industries } from '@/mocks';
import { ROUTES } from '@/constants';

export default function Occupation() {
  const router = useRouter();
  const [userIndustry, setUserIndustry] = useState<Industry | null>(null);

  const handleIndustryClick = (industry: Industry) => {
    setUserIndustry(industry);
  };

  const submitOccupation = () => {
    console.log('user occupation: ', userIndustry);
    if (!userIndustry?.id) {
      return;
    }
    router.push(ROUTES.INTERESTS);
  };

  return (
    <div className="space-y-10">
      <div>
        <PageTitle text={'Tell us about yourself.'} />
        <PageSubtitle text={'What is your professional background?'} />
      </div>
      <ul className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4">
        {industries.map((industry, i) => (
          <Card
            key={industry.id}
            i={i}
            active={industry.id === userIndustry?.id}
            onClick={() => handleIndustryClick(industry)}
          >
            {industry.name}
          </Card>
        ))}
      </ul>
      <div className="flex gap-x-4 items-center justify-end">
        <Link href={ROUTES.INTERESTS} className="w-1/3">
          <Button type="submit">Skip</Button>
        </Link>
        <div className="w-2/3">
          <Button
            primary
            type="submit"
            disabled={!userIndustry?.id}
            aria-disabled={!userIndustry?.id}
            onClick={submitOccupation}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
