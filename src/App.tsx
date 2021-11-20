import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import Footer from "./Footer";
import PriceCell from "./Cell";
// import useGetMapStorage from "./hooks/useGetMapStorage";
import WSStatus from "./Status";
import AddToken from "./Add";
import useGetListings from "./hooks/useGetListings";
import useGetMapStorage from "./hooks/useGetMapStorage";

const Separater = "_";

const LOCAL_KEY = "LOCAL_KEY";

const Wrapper = styled.div`
  text-align: left;
  padding: 0px 8px;
  /* padding-top: 8px; */
`;

export default function App() {
  const [wsStatus, setWSStatus] = useState<number>(0);
  const [prices, setPrices] = useState<
    {
      id: number;
      price?: number;
      p24h?: number;
      slug?: string;
      name?: string;
    }[]
  >(() => {
    const ids = new URL(window.location.href).searchParams.get("ids");
    if (ids) {
      return ids.split(Separater).map((id) => ({
        id: Number(id),
      }));
    }
    return [];
  });

  const ids = prices.map(({ id }) => id);

  const resubscribing = useRef(false);

  const mapData = useGetMapStorage(LOCAL_KEY);

  const WSInstance = useRef<WebSocket>();

  const [refetchAPI, lastRefetch] = useGetListings(ids, setPrices);

  const initWS = () => {
    let WS;
    try {
      WS = new WebSocket("wss://stream.coinmarketcap.com/price/latest");
      WSInstance.current = WS;
    } catch (e) {
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
        const data = JSON.parse(res.data);
        if (data?.d?.cr) {
          const info = data.d.cr;
          setPrices((prices) => {
            return prices.map((p) => {
              if (p.id === info.id) {
                return {
                  ...p,
                  price: info.p,
                  p24h: info.p24h,
                };
              }
              return p;
            });
          });
        } else {
          console.log(data);
        }
      };
      WS.addEventListener("close", (e) => {
        console.log("ws closed!");
        setWSStatus(WS.readyState);
        if (!resubscribing.current) {
          console.log("reconnecting...");
          refetchAPI();
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

  const handleAddOrRemove = (id: number, add?: boolean) => {
    if (ids.includes(id) && add) {
      return;
    }
    setPrices((prices) => {
      const newPrices = add
        ? [
            ...prices,
            {
              id: id,
            },
          ]
        : prices.filter((price) => price.id !== id);
      return newPrices;
    });
  };

  /**
   * rewrite URL when id length / order changes
   */
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("ids", ids.join(Separater));
    window.history.replaceState("", document.title, url);
  }, [ids.join()]);

  /**
   * resubscribe when id length changes
   */
  useEffect(() => {
    if (ids.length) {
      resubscribing.current = true;
      reconnect();
    }
  }, [ids.length]);

  return (
    <div className="App">
      {/* <Gas /> */}
      <AddToken
        onAdd={(id: number) => handleAddOrRemove(id, true)}
        mapData={mapData}
      />
      <Wrapper>
        {prices.map((info: any, idx) => (
          <PriceCell
            key={info.id}
            info={info}
            onRemove={(id: number) => handleAddOrRemove(id)}
            prices={prices}
            setPrices={setPrices}
            idx={idx}
          />
        ))}
      </Wrapper>
      {/* <WSStatus /> */}
      {ids.length ? (
        <Footer
          wsInstance={WSInstance}
          // reconnect={reconnect}
          lastRefetch={lastRefetch}
        />
      ) : null}
      
      {/* <div>
        <button onClick={() => closeWS()}>Disconnect</button>
        <button
          onClick={() => {
            initWS();
            subscribeWS(ids);
          }}
        >
          Connect
        </button>
      </div> */}
    </div>
  );
}
