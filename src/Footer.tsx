import styled from "styled-components";

const Wrapper = styled.p`
  position: fixed;
  bottom: 0;
  margin: 0px auto;
  font-size: 0.8em;
  padding: 8px 0px;
  width: 100%;
  background-color: var(--background-color);
  border-top: 1px solid var(--border-color);
  > a {
    color: var(--text-color);
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      Data Provider:{" "}
      <a href="https://coinmarketcap.com/" target="_blank" rel="noreferrer">
        CoinMarketCap
      </a>
    </Wrapper>
  );
};

export default Footer;
