import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '#/libs/constants/routes';
import { useAppSelector } from '#/libs/hooks/redux';
import { publicRoutes } from '#/routes';
import { logOut } from '#/store/reducers/user/UserSlice';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StyledButton } from '../Button/Button';
import { Container } from '../Container/Container';
import { Flex } from '../Flex/Flex';

const StyledNavbar = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  color: white;
  min-height: 40px;
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.06), 0px 2px 10px 0px rgba(0, 0, 0, 0.1);

  @media ${({ theme }) => theme.media.lg} {
    padding: 20px;
  }
`;

const StyledNavBarButton = styled(StyledButton)`
  padding: 9px 15px;

  @media ${({ theme }) => theme.media.lg} {
    padding: 9px 55px;
  }
`;

export function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.userReducer.user);

  const isNavbarShow = publicRoutes.some((item) => item.isNavBarShow && location.pathname === item.path);

  const navigate = useNavigate();

  const handleLogInClick = () => {
    navigate(SIGN_IN_ROUTE);
  };

  const handleSignUpClick = () => {
    navigate(SIGN_UP_ROUTE);
  };

  const handleLogOutClick = () => {
    dispatch(logOut());
  };

  return (
    <StyledNavbar>
      {isNavbarShow && (
        <Container>
          <Flex $justifyEnd $gap="10px">
            {user ? (
              <StyledNavBarButton $variant="outline" onClick={handleLogOutClick}>
                Log Out
              </StyledNavBarButton>
            ) : (
              <>
                <StyledNavBarButton $variant="outline" onClick={handleLogInClick}>
                  Log In
                </StyledNavBarButton>
                <StyledNavBarButton $variant="primary" onClick={handleSignUpClick}>
                  Sign Up
                </StyledNavBarButton>
              </>
            )}
          </Flex>
        </Container>
      )}
    </StyledNavbar>
  );
}
