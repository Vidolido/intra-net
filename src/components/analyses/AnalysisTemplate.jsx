'use client';

import { useLaboratoryContext } from '@/state/laboratoryContext';

const AnalysisTemplate = ({ templates }) => {
  const state = useLaboratoryContext();

  console.log(state, 'state');
  return <div>AnalysisTemplate</div>;
};

export default AnalysisTemplate;
