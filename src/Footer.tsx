import styled from "styled-components";

const Wrapper = styled.p`
  position: fixed;
  bottom: 0;
  margin: 0px auto;
  font-size: 0.8em;
  padding: 8px;
  width: 100%;
  background-color: var(--background-color);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(6px);
  a {
    color: var(--text-color);
    color: inherit;
  }

  &.connecting {
    background-color: yellow;
    color: #000;
  }
  &.connected {
    background-color: rgba(0, 255, 0, 0.33);
  }
  &.disconnected {
    background-color: var(--down-color);
  }
`;

const Footer = ({
  wsInstance,
  reconnect,
}: {
  wsInstance: React.MutableRefObject<WebSocket | undefined>;
  reconnect: any;
}) => {
  const status = wsInstance.current?.readyState;
  //   console.log(status);
  const statusString =
    status === 0 || status === undefined
      ? "connecting"
      : status === 1
      ? "connected"
      : status === 3
      ? "disconnected"
      : undefined;
  return (
    <Wrapper className={statusString}>
      <span>
        Data Provider:{" "}
        <a href="https://coinmarketcap.com/" target="_blank" rel="noreferrer">
          CoinMarketCap
        </a>
      </span>
      <span>WS Status: {statusString}</span>
    </Wrapper>
  );
};

export default Footer;
