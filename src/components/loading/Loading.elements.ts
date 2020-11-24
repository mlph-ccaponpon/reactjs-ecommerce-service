import styled, { keyframes } from "styled-components";
import { Container, theme } from "../../styles/global";
interface LoadingProps {
    delay: string
}

export const LoadingContainer = styled(Container)`
  display: flex;
  height: 100vh;

  ${Container}
`;

export const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

export const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin: auto;
`;

export const Dot = styled.div`
  background-color: ${theme.primaryLight};
  border-radius: 50%;
  width: 18px;
  height: 18px;
  margin: 0 5px;
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(p: LoadingProps) => p.delay ? p.delay: '0s'};
`;