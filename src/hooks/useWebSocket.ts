import { useEffect, useRef, useState } from "react";
import useDebounce from "./useDebounce";
import usePageFocus from "./usePageFocus";

const useWbSocket = ({
  onClose,
  onMessage,
  ids
}: {
  onClose: any;
  onMessage: any;
  ids: number[];
}) => {
  const [wsStatus, setWSStatus] = useState<number>(0);
  const WSInstance = useRef<WebSocket>();
  const debouncedIds = useDebounce(ids.join(","), 5000)
    .split(",")
    .filter(Boolean)
    .map(Number);
  // const resubscribing = useRef(false);

  // console.log(ids, debouncedIds);

  const connectAndSubscribe = () => {
    connectWS().then(ws => {
      subscribeWS(debouncedIds);
      ws.onmessage = function(res) {
        onMessage?.(res);
      };
      ws.onclose = e => {
        console.log("ws closed!");
        onClose?.();
        setWSStatus(ws.readyState);
        setTimeout(() => {
          connectAndSubscribe();
        }, 3000);
      };
    });
  };

  useEffect(() => {
    if (debouncedIds.length) {
      closeWS();
      connectAndSubscribe();
    }
  }, [debouncedIds.length]);

  /**
   * close websocket connection actively
   */
  const closeWS = () => {
    if (!WSInstance.current) return;
    // @ts-ignore
    if (WSInstance.current?.onclose) {
      WSInstance.current.onclose = null;
    }
    WSInstance.current.close();
  };

  const connectWS: () => Promise<WebSocket> = () => {
    return new Promise((resolve, reject) => {
      try {
        console.log("connecting...");
        const ws = new WebSocket(
          "wss://push.coinmarketcap.com/ws?device=web&client_source=home_page"
        );
        WSInstance.current = ws;
        WSInstance.current.addEventListener("open", e => {
          console.log("ws opened!");
          resolve(ws);
        });

        // @ts-ignore
        window.wsss = WSInstance.current;
        return WSInstance.current;
      } catch (e) {
        console.log("reconnecting...");
        setTimeout(() => {
          connectWS().then(ws => {
            resolve(ws);
          });
        }, 3000);
      }
    });
  };

  const subscribeWS = (ids: number[]) => {
    if (!WSInstance.current) return;
    const WS = WSInstance.current;
    setWSStatus(WS.readyState);
    const param = {
      method: "RSUBSCRIPTION",
      params: ["main-site@crypto_price_5s@{}@normal", ids.join(",")]
    };
    WS.send(JSON.stringify(param));
  };

  usePageFocus(isFocused => {
    if (isFocused && WSInstance.current?.readyState === 3) {
      connectAndSubscribe();
    }
  });

  return [wsStatus, connectAndSubscribe] as const;
};

export default useWbSocket;
