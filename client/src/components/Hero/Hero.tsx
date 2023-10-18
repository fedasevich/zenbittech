import { IMAGES } from '#/libs/constants/images';
import { getImageUrl } from '#/libs/helpers/getImageUrl';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { Container } from '../Container/Container';
import { Flex } from '../Flex/Flex';
import { Text } from '../Text/Text';

const StyledHero = styled(Flex)`
  background-image: url(${getImageUrl(IMAGES.HERO)});
  background-size: cover;
  color: white;
  height: calc(100vh - 60px);
  background-position: center;

  & > div {
    text-align: center;
  }

  & h1 {
    margin-bottom: 10px;
    font-size: 36px;

    @media ${({ theme }) => theme.media.sm} {
      font-size: 64px;
    }
  }

  & p {
    margin: 0 auto;
    font-family: 'Lato';
    width: 100%;
    margin-bottom: 30px;
    font-size: 20px;

    @media ${({ theme }) => theme.media.sm} {
      font-size: 24px;
    }

    @media ${({ theme }) => theme.media.lg} {
      width: 60%;
    }
  }

  & button {
    font-size: 20px;
    padding: 10px 24px;
  }

  @media ${({ theme }) => theme.media.lg} {
    height: calc(100vh - 80px);
  }
`;

export function Hero() {
  return (
    <StyledHero $center as="section">
      <Container>
        <Text as="h1">The chemical negatively charged</Text>
        <Text>
          {' '}
          Numerous calculations predict, and experiments confirm, that the force field reflects the beam, while the mass
          defect is not formed. The chemical compound is negatively charged. Twhile the mass defect is{' '}
        </Text>
        <a href="#deals">
          <Button $color="white" $variant="outline">
            Get Started
          </Button>
        </a>
      </Container>
    </StyledHero>
  );
}
