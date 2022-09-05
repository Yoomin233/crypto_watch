import { useEffect, useRef, useState } from "react";

const useWbSocket = ({
  onClose,
  onMessage,
  ids,
}: {
  onClose: any;
  onMessage: any;
  ids: any;
}) => {
  const [wsStatus, setWSStatus] = useState<number>(0);
  const WSInstance = useRef<WebSocket>();
  const resubscribing = useRef(false);

  useEffect(() => {
    if (ids.length) {
      resubscribing.current = true;
      reconnect();
    }
  }, [ids.length]);

  const initWS = () => {
    let WS;
    try {
      WS = new WebSocket("wss://stream.coinmarketcap.com/price/latest");
      WSInstance.current = WS;
    } catch (e) {
      console.log("reconnect!");
      setTimeout(() => {
        initWS();
        subscribeWS(ids);
      }, 1000);
    }
  };

  const closeWS = () => {
    WSInstance.current?.close();
  };

  const subscribeWS = (ids: number[]) => {
    if (!WSInstance.current) return;
    const WS = WSInstance.current;
    setWSStatus(WS.readyState);
    WS.onopen = function () {
      console.log("ws connected!");
      setWSStatus(WS.readyState);
      if (resubscribing.current) {
        resubscribing.current = false;
      }
      const param = {
        method: "subscribe",
        id: "price",
        data: {
          cryptoIds: ids,
        },
      };
      WS.send(JSON.stringify(param));

      WS.onmessage = function (res) {
        onMessage && onMessage(res);
      };
      WS.addEventListener("close", (e) => {
        console.log("ws closed!");
        setWSStatus(WS.readyState);
        if (!resubscribing.current) {
          console.log("reconnecting...");
          onClose && onClose();
          setTimeout(() => {
            initWS();
            subscribeWS(ids);
          }, 1000);
        }
      });
    };
  };

  const reconnect = () => {
    console.log("reconnect!");
    closeWS();
    initWS();
    subscribeWS(ids);
  };
  return [wsStatus, reconnect] as const;
};

export default useWbSocket;
