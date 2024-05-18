import styled from 'styled-components';
import { Navbar } from '@/components/shared/Navbar';
import { AnalysisNavbar } from '@/components/shared/AnalysisNavbar';

type DefaultLayoutProps = {
  children: React.ReactNode;
  variant?: 'analysis' | 'inspection';
};

const Main = styled.main`
  padding-top: 6.4rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.6rem;
`;

export const DefaultLayout = ({ variant = 'inspection', children }: DefaultLayoutProps) => {
  return (
    <Main>
      {variant === 'analysis' ? <AnalysisNavbar /> : <Navbar />}
      {children}
    </Main>
  );
};
