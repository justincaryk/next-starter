import { COMPANY_NAME } from '@/constants';
import { CheckIcon } from '@heroicons/react/24/outline';
import Button from '../parts/form/button';
import PageSubtitle from '../parts/page-subtitle';
import PageTitle from '../parts/page-title';

export default function RegisterSuccess() {
  return (
    <div className="p-6 space-y-10 flex justify-center" aria-live="polite" title='Account successfully created.'>
      <div className="space-y-4 pb-6 border inline-block rounded-b">
        <div className="flex justify-center bg-green-md pb-8 rounded-t">
          <div className="inline-block -mt-10 rounded-full bg-green-md p-1 border-4 border-white">
            <CheckIcon className="text-white w-14" />
          </div>
        </div>
        <div className="p-6  space-y-4">
          <PageTitle text={`You just joined ${COMPANY_NAME}!`} className="text-center" />
          <PageSubtitle
            text={'Click below to finish setting up your profile'}
            className="text-center"
          />
          <Button primary>Continue to profile setup</Button>
        </div>
      </div>
    </div>
  );
}
