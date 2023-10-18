import { IMAGES } from '#/libs/constants/images';
import { getImageUrl } from '#/libs/helpers/getImageUrl';
import styled from 'styled-components';

export const StyledAuthFormImage = styled.div`
  background-image: url(${getImageUrl(IMAGES.AUTH)});
  display: none;

  background-size: cover;
  background-position: center;

  @media ${({ theme }) => theme.media.md} {
    width: 50%;
    display: block;
  }

  @media ${({ theme }) => theme.media.lg} {
    width: 80%;
  }
`;
