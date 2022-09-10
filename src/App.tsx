import { useEffect, useState } from "react";

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
import {
  IconEdit,
  IconFold,
  IconSortDescendingNumbers,
  IconSortDescending,
} from "@tabler/icons";
import SaveList from "./saveList";
import { getSearchParams } from "./utils/dom";
import axios from "axios";
import { APIHost } from "./components/useUpdateData";

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
  @media screen and (max-width: 450px) {
    flex-direction: column;
    /* overflow: hidden; */
  }
  > div:first-child {
    flex-grow: 1;
  }
  > p.buttons {
    margin: 0px auto 8px;
    white-space: nowrap;
    width: 100%;
    overflow: scroll;
  }
`;

const Guide = styled.div`
  text-align: center;
  cursor: pointer;
  margin: 32px auto;
  font-weight: bold;
`;

const getIds = () => {
  const url = new URL(window.location.href);

  if (url.searchParams.get("name")) {
    return [];
  }

  const idsStored =
    localStorage.getItem(LOCAL_ID_KEY) || url.searchParams.get("ids") || "";

  const hasNewFormat = idsStored.match(/[a-z]/);

  return idsStored
    ? idsStored.split(ID_SEPARATOR).map((id) => ({
        id: id.includes(AMOUNT_SEPARATOR)
          ? parseInt(id.split(AMOUNT_SEPARATOR)[0], hasNewFormat ? 36 : 10)
          : parseInt(id, hasNewFormat ? 36 : 10) || 1,
        amount: id.includes(AMOUNT_SEPARATOR)
          ? Number(id.split(AMOUNT_SEPARATOR)[1])
          : "",
      }))
    : [];
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

  // console.log(prices)

  const [expandStatus, setExpandStatus] = useState({});

  const idsArray = prices.map(({ id }) => id);
  const amountsArray = prices.map(({ amount }) => amount);

  const cryptoListData = useGetMapStorage(LOCAL_KEY);

  const [refetchAPI, lastRefetch] = useGetListings(idsArray, setPrices);

  const [wsStatus, reconnect] = useWbSocket({
    ids: idsArray,
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
    if (idsArray.includes(id) && add) {
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
    setExpandStatus({
      ...expandStatus,
      [id]: true,
    });
  };

  // const handleCollapse = (expand?: boolean) => {
  //   if (!expand) {
  //     setExpandStatus({});
  //   }
  // };

  useEffect(() => {
    const name = getSearchParams("name");
    if (name) {
      axios
        .get(`${APIHost}/api/v1/crypto-watch-name?name=${name}`)
        .then((d) => {
          if (d.data.data) {
            setPrices(d.data.data);
          }
        });
    }
  }, []);

  /**
   * rewrite URL when id length / order changes
   */
  useSubsequentUpdate(() => {
    // console.log(ids);
    // console.log(amounts);
    // console.log(ids, amounts);
    const idsString = idsArray
      .map((id, idx) => {
        return (
          id.toString(36) +
          (amountsArray[idx] ? `${AMOUNT_SEPARATOR}${amountsArray[idx]}` : "")
        );
      })
      .join(ID_SEPARATOR);
    // writeURL(idsString);
    localStorage.setItem(LOCAL_ID_KEY, idsString);
  }, idsArray.join() + amountsArray.join());

  return (
    <GlobalContextProvider>
      <div className='App'>
        <HeadWrapper>
          <AddToken
            onAdd={(id: number) => handleAddOrRemove(id, true)}
            mapData={cryptoListData}
          />
          <p className='buttons'>
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
              <IconSortDescendingNumbers></IconSortDescendingNumbers>
              Sort Value
            </button>
            &nbsp;
            <button
              onClick={() => {
                const newPrices = [...prices];
                newPrices.sort((a, b) =>
                  a.p24h && b.p24h ? b.p24h - a.p24h : Infinity
                );
                setPrices(newPrices);
              }}
            >
              <IconSortDescending></IconSortDescending>
              Sort Change
            </button>
            &nbsp;
            <button onClick={() => setExpandStatus({})}>
              <IconFold></IconFold>
              Fold All
            </button>
            &nbsp;
            <button onClick={() => setEdit(!edit)}>
              <IconEdit></IconEdit>
              {edit ? "Done" : "Edit"}
            </button>
            &nbsp;
            <SaveList prices={prices}></SaveList>
          </p>
        </HeadWrapper>
        <Wrapper>
          {prices.length ? (
            prices.map((info: any, idx) => (
              <PriceCell
                name={cryptoListData[info.id]?.symbol}
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
            ))
          ) : (
            <Guide
              onClick={() => {
                document
                  .querySelector<HTMLInputElement>("input.crypto-search")
                  ?.focus();
              }}
            >
              Click me to add
            </Guide>
          )}
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

        {idsArray.length ? (
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
