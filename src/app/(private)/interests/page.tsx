'use client';

import { ROUTES } from '@/types';

import Link from 'next/link';
import { useState } from 'react';

import Button from '@/components/parts/button';
import Card from '@/components/parts/card';
import PageSubtitle from '@/components/parts/page-subtitle';
import PageTitle from '@/components/parts/page-title';

interface InterestOption {
  id: number;
  name: string;
  relatedOccupations: number[];
}
const interestOptions: InterestOption[] = [
  {
    id: 1,
    name: 'Certifications',
    relatedOccupations: [],
  },
  {
    id: 2,
    name: 'Training',
    relatedOccupations: [],
  },
  {
    id: 3,
    name: 'Education',
    relatedOccupations: [],
  },
  {
    id: 4,
    name: 'Career Advancement',
    relatedOccupations: [],
  },
  {
    id: 5,
    name: 'Sales',
    relatedOccupations: [6, 1],
  },
  {
    id: 6,
    name: 'Software Development',
    relatedOccupations: [5, 3],
  },
  {
    id: 7,
    name: 'Dev Ops',
    relatedOccupations: [5, 3],
  },
  {
    id: 8,
    name: 'Accessibility',
    relatedOccupations: [1, 2, 3, 5],
  },
  {
    id: 9,
    name: 'Security Policies',
    relatedOccupations: [5, 3],
  },
  {
    id: 10,
    name: 'Penetration Testing',
    relatedOccupations: [5, 3],
  },
  {
    id: 11,
    name: 'Cryptography',
    relatedOccupations: [5, 3],
  },
  {
    id: 12,
    name: 'SOC 2 Compliance',
    relatedOccupations: [5, 3],
  },
  {
    id: 13,
    name: 'Hardware Engineering',
    relatedOccupations: [5, 3],
  },
  {
    id: 14,
    name: 'Payroll',
    relatedOccupations: [10, 7],
  },
  {
    id: 15,
    name: 'Benefits and Health Insurance',
    relatedOccupations: [10, 7],
  },
  {
    id: 16,
    name: 'Lean Manufacturing',
    relatedOccupations: [4, 11, 3],
  },
  {
    id: 17,
    name: 'Logistics',
    relatedOccupations: [4, 11, 3],
  },
  {
    id: 18,
    name: 'Modern Design Principles',
    relatedOccupations: [1, 2],
  },
  {
    id: 19,
    name: 'Market Cap Tables',
    relatedOccupations: [10, 6],
  },
  {
    id: 20,
    name: 'Investments',
    relatedOccupations: [10, 6],
  },
  {
    id: 21,
    name: 'Accounting',
    relatedOccupations: [10, 7],
  },
  {
    id: 22,
    name: 'Business Management',
    relatedOccupations: [10, 11, 4, 3, 1],
  },
  {
    id: 23,
    name: 'Team Leadership',
    relatedOccupations: [],
  },
  {
    id: 24,
    name: 'Sales Pipelines',
    relatedOccupations: [6],
  },
];
// TODO build API to get these results
// TODO build API to post user choices
export default function Interests() {
  const [userInterestIds, updateUserInterestIds] = useState<number[]>([]);

  const handleInterestClick = (interest: InterestOption) => {
    const alreadySelected = userInterestIds.find((x) => x === interest.id);
    if (alreadySelected) {
      updateUserInterestIds(userInterestIds.filter((x) => x !== interest.id));
    } else {
      updateUserInterestIds([interest.id, ...userInterestIds]);
    }
  };
  const submitInterests = () => {};

  return (
    <div className="space-y-10">
      <div>
        <PageTitle text={'Tell us about your interests.'} />
        <PageSubtitle text={'Please choose as many as you like.'} />
      </div>
      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4">
        {interestOptions.map((opt) => (
          <Card
            key={opt.id}
            onClick={() => handleInterestClick(opt)}
            active={userInterestIds.includes(opt.id)}
          >
            {opt.name}
          </Card>
        ))}
      </div>
      <div className="flex gap-x-4 items-center justify-end">
        <Link href={ROUTES.INTERESTS} className="w-1/3">
          <Button>Skip</Button>
        </Link>
        <div className="w-2/3">
          <Button
            primary
            disabled={!userInterestIds.length}
            aria-disabled={!userInterestIds.length}
            onClick={submitInterests}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
