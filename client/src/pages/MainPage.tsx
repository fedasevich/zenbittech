import { OpenDeals } from '#/components/Deals/Deals';
import { Hero } from '#/components/Hero/Hero';
import styled from 'styled-components';

const StyledMainPage = styled.div`
  scroll-behavior: smooth;
`;

export function MainPage() {
  return (
    <StyledMainPage>
      <Hero />
      <OpenDeals />
    </StyledMainPage>
  );
}
