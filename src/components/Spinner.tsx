import styled, { keyframes } from "styled-components";

const spin = keyframes`
    to {
        transform: rotate(1turn);
    }
`;

const SpinnerWrapper = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  > span {
    border: 3px solid var(--border-color);
    border-radius: 50%;
    border-top-color: var(--text-color);
    width: 1em;
    height: 1em;
    animation: ${spin} 1s linear 0s infinite;
  }
`;

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <span></span>
    </SpinnerWrapper>
  );
};

export default Spinner;
