import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import Footer from "./Footer";
import PriceCell from "./Cell";
// import useGetMapStorage from "./hooks/useGetMapStorage";
// import WSStatus from "./Status";
import AddToken from "./Add";
import useGetListings from "./hooks/useGetListings";
import useGetMapStorage from "./hooks/useGetMapStorage";
import useSubsequentUpdate from "./hooks/useSubsequentUpdate";

const Separater = "_";

const LOCAL_KEY = "LOCAL_KEY";
const LOCAL_ID_KEY = "LOCAL_ID_KEY";

const Wrapper = styled.div`
  text-align: left;
  padding: 0px 8px;
  /* padding-top: 8px; */
`;

const HeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div:first-child {
    flex-grow: 1;
  }
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
        id: Number(id) || 1,
      }));
    }
    return [];
  });

  // console.log(prices);

  const [expandStatus, setExpandStatus] = useState(() =>
    Array.from({ length: prices.length }).fill(0)
  );

  // console.log(expandStatus);

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

  // const allExpanded = expandStatus.every((v) => v);

  const handleExpand = (expand?: boolean) => {
    if (expand) {
      setExpandStatus((e) => e.map((_) => 1));
    } else {
      setExpandStatus((e) => e.map((_) => 0));
    }
  };

  const writeURL = (ids: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("ids", ids);
    window.history.replaceState("", document.title, url);
  };

  useEffect(() => {
    const idsStored = localStorage.getItem(LOCAL_ID_KEY);
    const idsUrl = new URL(window.location.href).searchParams.get("ids");
    // console.log(idsStored, idsUrl);
    if (idsStored !== idsUrl && idsStored) {
      writeURL(idsStored);
    }
  }, []);

  /**
   * rewrite URL when id length / order changes
   */
  useSubsequentUpdate(() => {
    const idsString = ids.join(Separater);
    writeURL(idsString);
    localStorage.setItem(LOCAL_ID_KEY, idsString);
    // if (ids.length) {
    // }
  }, ids.join());

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
      <HeadWrapper>
        <AddToken
          onAdd={(id: number) => handleAddOrRemove(id, true)}
          mapData={mapData}
        />
        <button onClick={() => handleExpand(false)}>{"Collapse"}</button>
        &nbsp;
        <button onClick={() => handleExpand(true)}>{"Expand"}</button>
      </HeadWrapper>
      <Wrapper>
        {prices.map((info: any, idx) => (
          <PriceCell
            name={mapData[info.id]?.name}
            key={info.id}
            info={info}
            onRemove={(id: number) => handleAddOrRemove(id)}
            prices={prices}
            setPrices={setPrices}
            idx={idx}
            expandStatus={expandStatus}
            setExpandStatus={setExpandStatus}
          />
        ))}
      </Wrapper>
      {/* <WSStatus /> */}
      {ids.length ? (
        <Footer
          wsStatus={wsStatus}
          // wsInstance={WSInstance}
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
