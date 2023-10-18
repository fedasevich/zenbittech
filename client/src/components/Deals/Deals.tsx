import { buildingApi } from '#/store/reducers/building/BuildingApi';
import styled from 'styled-components';
import { Container } from '../Container/Container';
import { Flex } from '../Flex/Flex';
import Spinner from '../Spinner/Spinner';
import { Text } from '../Text/Text';
import { BuildingItem } from './BuildingItem';

const StyledOpenDeals = styled.div`
  margin-bottom: 12px;

  & h2 {
    margin-top: 50px;
    margin-bottom: 20px;
  }
`;

export function OpenDeals() {
  const { data: buildings, error, isLoading } = buildingApi.useGetAllBuildingsQuery();

  if (!buildings || error) {
    return (
      <Text $size={28} $centered as="h2">
        Something went wrong!
      </Text>
    );
  }

  return (
    <StyledOpenDeals>
      <Container>
        <Text $size={28} $color="secondary" as="h2" id="deals">
          Open Deals
        </Text>
        {isLoading && <Spinner />}
        <Flex $gap="20px" $wrap>
          {buildings.map((building) => (
            <BuildingItem building={building} key={building.id} />
          ))}
        </Flex>
      </Container>
    </StyledOpenDeals>
  );
}
