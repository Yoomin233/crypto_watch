// import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  bottom: 3em;
  right: 12px;
  max-width: 0.8em;
  white-space: nowrap;
  overflow: hidden;
  max-width: 1em;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:focus-within {
    max-width: 20em;
  }
  > span:first-child {
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.5em;
    vertical-align: middle;
  }
  > span.connecting {
    background-color: yellow;
  }
  > span.connected {
    background-color: var(--up-color);
  }
  > span.disconnected {
    background-color: var(--down-color);
  }
`;

const WSStatus = ({
  wsInstance,
  reconnect,
}: {
  wsInstance: React.MutableRefObject<WebSocket | undefined>;
  reconnect: any;
}) => {
  //   useEffect(() => {
  //     wsInstance.current?.addEventListener("close", () => {
  //       console.log("closed");
  //     });
  //   }, [wsInstance.current]);
  //   const [expand, setExpand] = useState(false);
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
    <Wrapper
      //   onClick={() => setExpand(true)}
      //   className={expand ? "expand" : undefined}
      tabIndex={-1}
      //   onBlur={() => setExpand(false)}
    >
      <span className={statusString}></span>
      {`WS Status: ${statusString}`}
      <button
        onClick={reconnect}
        style={{
          display: status === 3 ? undefined : "none",
        }}
      >
        Reconnect
      </button>
    </Wrapper>
  );
};

export default WSStatus;
