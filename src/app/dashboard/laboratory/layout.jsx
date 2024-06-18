import { LaboratoryContextProvider } from '@/state/laboratoryContext';

export const metadata = {
  title: 'Okta - Templates',
  description: 'Templates',
};

export default function layout({ children }) {
  return <LaboratoryContextProvider>{children}</LaboratoryContextProvider>;
}
