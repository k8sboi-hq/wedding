'use client';

import { useSearchParams } from 'next/navigation';
import DetailsSection from './Details/DetailsSection';
import MapsSection from './Maps/MapsSection';
import { parsePartyParam } from '@/lib/partyFilter';

export default function PartyFilteredContent() {
  const searchParams = useSearchParams();
  const partyParam = searchParams.get('party');
  const partyFilter = parsePartyParam(partyParam);

  return (
    <>
      <DetailsSection partyFilter={partyFilter} />
      <MapsSection partyFilter={partyFilter} />
    </>
  );
}
