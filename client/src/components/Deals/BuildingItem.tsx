import { formatNumber } from '#/libs/helpers/formatNumber';
import { getDifferenceInDays } from '#/libs/helpers/getDifferenceInDays';
import { getImageUrl } from '#/libs/helpers/getImageUrl';
import { Building } from '#/libs/types/Building/Building.type';
import styled, { css } from 'styled-components';
import { Flex } from '../Flex/Flex';
import { Text } from '../Text/Text';

const CURRENCY = 'Dhs';

interface StyledBuildingItemProps {
  $bgImageUrl: string;
}

const StyledBuildingItem = styled.div<StyledBuildingItemProps>`
  width: 100%;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  min-height: 400px;
  border-radius: 5px;
  background-position: center;
  background-size: cover;
  position: relative;

  ${({ $bgImageUrl }) =>
    css`
      background-image: url(${getImageUrl($bgImageUrl)});
    `}

  @media ${({ theme }) => theme.media.lg} {
    width: calc(50% - 10px);
  }
`;

const StyledBuildingItemInfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  max-width: 100%;
  margin-top: 5px;
  padding: 12px 14px;
`;

const StyledBuildingItemInfo = styled(Flex)`
  width: 100%;

  & p {
    min-width: 100%;
    padding-left: 5px;
    margin-bottom: 8px;
    font-family: 'Lato';

    @media ${({ theme }) => theme.media.md} {
      min-width: calc(33.33% - 5px);
    }
  }
`;

interface BuildingItemProps {
  building: Building;
}

export function BuildingItem({ building }: BuildingItemProps) {
  return (
    <StyledBuildingItem $bgImageUrl={building.imageUrl}>
      <StyledBuildingItemInfoContainer>
        <Text $color="white" $size={20} as="h4">
          {building.name}
        </Text>
        <StyledBuildingItemInfo $wrap>
          <Text $color="white" $size={18}>
            {formatNumber(building.totalPrice)} {CURRENCY}
          </Text>
          <Text $color="white" $size={18}>
            Yield {building.yield}%
          </Text>
          <Text $color="white" $size={18}>
            Sold {building.sold}%
          </Text>
          <Text $color="white" $size={18}>
            Tiket - {formatNumber(building.squareMeterPrice)} {CURRENCY}
          </Text>
          <Text $color="white" $size={18}>
            Days left {getDifferenceInDays(building.endDate)}
          </Text>
        </StyledBuildingItemInfo>
      </StyledBuildingItemInfoContainer>
    </StyledBuildingItem>
  );
}
