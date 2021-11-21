import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
    to {
        transform: rotate(1turn);
    }
`;

// console.log(spin);

const Spinner = styled.span`
  width: 100%;
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

const ImgLoading: React.FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = ({ src = "", alt }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
      console.log("loaded!");
    };
  }, [src]);
//   return (
//     <Spinner>
//       <span></span>
//     </Spinner>
//   );
  return loaded ? (
    <img src={src} alt={alt} />
  ) : (
    <Spinner>
      <span></span>
    </Spinner>
  );
};

export default ImgLoading;
