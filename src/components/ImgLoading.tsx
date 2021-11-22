import { useEffect, useState } from "react";
// import styled, { keyframes } from "styled-components";
import Spinner from "./Spinner";

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
  return loaded ? <img src={src} alt={alt} /> : <Spinner></Spinner>;
};

export default ImgLoading;
