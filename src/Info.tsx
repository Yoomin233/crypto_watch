import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  /* position: absolute; */
  /* bottom: 0.5em; */
  width: 100%;
  font-size: 0.8em;
  a {
    &:visited {
      color: var(--text-color);
    }
  }
`;

const Info = () => {
  return (
    <Wrapper className={"info"}>
      <span>
        Data Source:{" "}
        <a href="https://coinmarketcap.com/" target="_blank" rel="noreferrer">
          CoinMarketCap
        </a>
      </span>
      &nbsp;
      <span>
        <a
          href="https://github.com/YueminHu/crypto_watch"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </span>
    </Wrapper>
  );
};

export default Info;
