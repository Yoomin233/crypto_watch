import { useState } from "react";

import styled from "styled-components";
import PriceCell from "./Cell";
import Status from "./Footer";
import AddToken from "./Add";
import { GlobalContextProvider } from "./context";
import useGetListings from "./hooks/useGetListings";
import useGetMapStorage from "./hooks/useGetMapStorage";
import useSubsequentUpdate from "./hooks/useSubsequentUpdate";
import useWbSocket from "./hooks/useWebSocket";
import Info from "./Info";
import eventEmitter from "./utils/eventEmitter";

const ID_SEPARATOR = "_";
const AMOUNT_SEPARATOR = "-";

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
  position: sticky;
  /* top: 0; */
  background-image: linear-gradient(
    to bottom,
    var(--background-color) 0%,
    var(--background-color) 70%,
    transparent 100%
  );
  top: -1px;
  z-index: 10;
  > div:first-child {
    flex-grow: 1;
  }
`;

const getIds = () => {
  const idsStored =
    localStorage.getItem(LOCAL_ID_KEY) ||
    new URL(window.location.href).searchParams.get("ids") ||
    "";
  return idsStored.split(ID_SEPARATOR).map((id) => ({
    id: id.includes(AMOUNT_SEPARATOR)
      ? parseInt(id.split(AMOUNT_SEPARATOR)[0], 36)
      : parseInt(id, 36) || 1,
    amount: id.includes(AMOUNT_SEPARATOR)
      ? Number(id.split(AMOUNT_SEPARATOR)[1])
      : "",
  }));
};

export default function App() {
  const [edit, setEdit] = useState(false);

  const [prices, setPrices] = useState<
    {
      id: number;
      price?: number;
      p24h?: number;
      slug?: string;
      name?: string;
      amount?: number | string;
    }[]
  >(getIds);

  // console.log(prices);

  const [expandStatus, setExpandStatus] = useState({});

  const ids = prices.map(({ id }) => id);
  const amounts = prices.map(({ amount }) => amount);

  const mapData = useGetMapStorage(LOCAL_KEY);

  const [refetchAPI, lastRefetch] = useGetListings(ids, setPrices);

  const [wsStatus, reconnect] = useWbSocket({
    ids,
    onClose: () => refetchAPI(),
    onMessage: (res: any) => {
      const data = JSON.parse(res.data);
      if (data?.d?.cr) {
        const info = data.d.cr;
        // console.log(info);
        eventEmitter.emit(`WS-${info.id}`, info);
        setPrices((prices) => {
          return prices.map((p) => {
            if (p.id === info.id) {
              return {
                ...info,
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
    },
  });

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

  const handleExpand = (expand?: boolean) => {
    if (expand) {
    } else {
      setExpandStatus({});
    }
  };

  const writeURL = (ids: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("ids", ids);
    window.history.replaceState("", document.title, url);
  };

  /**
   * rewrite URL when id length / order changes
   */
  useSubsequentUpdate(() => {
    // console.log(ids);
    // console.log(amounts);
    // console.log(ids, amounts);
    const idsString = ids
      .map((id, idx) => {
        return (
          id.toString(36) +
          (amounts[idx] ? `${AMOUNT_SEPARATOR}${amounts[idx]}` : "")
        );
      })
      .join(ID_SEPARATOR);

    // console.log(amounts, idsStringss);

    // const idsString = ids
    //   .map((id, idx) => {
    //     return id.toString(36);
    //   })
    //   .join(ID_SEPARATOR);
    writeURL(idsString);
    localStorage.setItem(LOCAL_ID_KEY, idsString);
    // if (ids.length) {
    // }
  }, ids.join() + amounts.join());

  return (
    <GlobalContextProvider>
      <div className='App'>
        <HeadWrapper>
          <AddToken
            onAdd={(id: number) => handleAddOrRemove(id, true)}
            mapData={mapData}
          />
          <button onClick={() => handleExpand(false)}>{"Collapse All"}</button>
          &nbsp;
          <button onClick={() => setEdit(!edit)}>
            {edit ? "Done" : "Edit"}
          </button>
          &nbsp;
          <button
            onClick={() => {
              const newPrices = [...prices];
              newPrices.sort((a, b) =>
                a.amount &&
                a.price &&
                b.price &&
                b.amount &&
                typeof a.amount === "number" &&
                typeof b.amount === "number"
                  ? b.amount * b.price - a.amount * a.price
                  : -Infinity
              );
              setPrices(newPrices);
            }}
          >
            Sort by value
          </button>
          &nbsp;
          <button
            onClick={() => {
              const newPrices = [...prices];
              newPrices.sort((a, b) =>
                a.price && b.price ? b.price - a.price : Infinity
              );
              setPrices(newPrices);
            }}
          >
            Sort by price
          </button>
        </HeadWrapper>
        <Wrapper>
          {prices.map((info: any, idx) => (
            <PriceCell
              name={mapData[info.id]?.symbol}
              key={info.id}
              info={info}
              onRemove={(id: number) => handleAddOrRemove(id)}
              prices={prices}
              setPrices={setPrices}
              idx={idx}
              expandStatus={expandStatus}
              setExpandStatus={setExpandStatus}
              edit={edit}
            />
          ))}
        </Wrapper>
        {prices.some((price) => !!price.amount) && (
          <p>
            Total Amount: $
            <b>
              {prices
                .reduce((prev, next) => {
                  return next.amount &&
                    next.price &&
                    typeof next.amount == "number"
                    ? prev + next.amount * next.price
                    : prev;
                }, 0)
                .toFixed(2)}
            </b>
          </p>
        )}
        <Info />

        {ids.length ? (
          <Status
            wsStatus={wsStatus}
            // wsInstance={WSInstance}
            reconnect={reconnect}
            lastRefetch={lastRefetch}
          />
        ) : null}
      </div>
    </GlobalContextProvider>
  );
}
