import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
// import ImgLoading from "./components/ImgLoading";
import LazyRender from "./components/lazyRender";
import Spinner from "./components/Spinner";
import { determineFraction } from "./utils/number";

const LazyChart = lazy(() => import("./components/chart"));

const Wrapper = styled.div`
  display: inline-block;
  padding: 6px 8px;
  /* margin-top: 8px; */
  width: calc(50%);
  vertical-align: top;
  /* display: inline-block; */
  /* border-left: 1px solid #fff; */
  /* border-radius: 4px; */
  cursor: pointer;
  box-sizing: border-box;
  user-select: none;
  border-bottom: 1px solid var(--border-color);
  @media screen and (max-width: 450px) {
    white-space: nowrap;
    width: 100%;
    /* overflow: hidden; */
  }
`;

const CellWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* &:hover {
    transform: translateY(-2px);
  } */
  @media screen and (max-width: 450px) {
    > a:first-child {
      max-width: 45vw;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  > a {
    color: inherit;
    font-size: 1.1em;
    text-decoration: none;
    font-weight: bold;
  }
  img {
    width: 2rem;
    margin-right: 0.5em;
    vertical-align: middle;
  }
  span.price {
    font-weight: bold;
    font-size: 1.2em;
    transition: all 0.1s linear;
    &.up {
      color: var(--up-color);
    }
    &.down {
      color: var(--down-color);
    }
  }
  span.percentage {
    padding: 4px 8px;
    border-radius: 4px;
    color: #fff;
    margin-left: 12px;
    display: inline-block;
    text-align: center;
    /* width: 4.5em; */
  }
`;

const MoreSection = styled.div`
  padding-top: 8px;
  /* border-bottom: 1px solid var(--border-color); */
  justify-content: space-between;
  display: flex;
  button {
    font-size: 0.8em;
  }
  .buttons {
    display: grid;
    gap: 4px;
    margin-left: 8px;
  }
`;

const ChartsWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  .switch {
    display: grid;
    margin-right: 8px;
    > span {
      border: 1px solid transparent;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      padding: 2px 8px;
      border-right-color: #1fe230;
      &.selected {
        /* color: yellow; */
        border-color: #1fe230;
        border-right-color: transparent;
      }
    }
  }
  img {
    width: 100%;
  }
`;

const ChartsGroup = ({ id = 1 }) => {
  const [period, setPeriod] = useState('1D');
  return (
    <ChartsWrapper>
      <div className="switch">
        <span
          className={period === '1D' ? "selected" : undefined}
          onClick={() => setPeriod('1D')}
        >
          24h
        </span>
        <span
          className={period === '7D' ? "selected" : undefined}
          onClick={() => setPeriod('7D')}
        >
          7D
        </span>
        <span
          className={period === '1M' ? "selected" : undefined}
          onClick={() => setPeriod('1M')}
        >
          1M
        </span>
        <span
          className={period === '3M' ? "selected" : undefined}
          onClick={() => setPeriod('3M')}
        >
          3M
        </span>
        <span
          className={period === '1Y' ? "selected" : undefined}
          onClick={() => setPeriod('1Y')}
        >
          1Y
        </span>
      </div>
      <Charts id={id} period={period} />
    </ChartsWrapper>
  );
};

const Charts = ({ id = 1, period = '1D' }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyChart id={id} period={period} />
    </Suspense>
  );
  //   return (
  //     <ImgLoading
  //       src={`https://s3.coinmarketcap.com/generated/sparklines/web/${period}d/2781/${id}.svg`}
  //       alt={`${id} sparkline`}
  //     />
  //   );
};

const PriceCell = ({
  name,
  info,
  onRemove,
  prices,
  setPrices,
  idx,
  expandStatus,
  setExpandStatus,
}: any) => {
  // console.log(info);
  const { id, p24h, price, slug, symbol } = info;
  const lastPrice = useRef(price);
  // const isUp = useRef(true);
  const [isUp, setIsUp] = useState<1 | 0 | -1>(0);

  // const [expand, setExpand] = useState(false);

  useEffect(() => {
    // console.log('updatw!', price, lastPrice.current)
    if (
      price !== lastPrice.current &&
      price !== undefined &&
      lastPrice.current !== undefined
    ) {
      //   console.log("update!", price);
      if (lastPrice.current < price) {
        setIsUp(1);
      } else {
        setIsUp(-1);
      }
      setTimeout(() => setIsUp(0), 1000);
      // isUp.current =
    }
    lastPrice.current = price;
    // console.log("price change!", lastPrice.current, price);
  }, [price]);

  const onMove = (isUp?: boolean) => {
    // let temp;
    const idxOffset = isUp ? -1 : 1;
    // if (isUp) {
    const temp = prices[idx + idxOffset];
    prices[idx + idxOffset] = prices[idx];
    prices[idx] = temp;

    const expandTemp = expandStatus[idx + idxOffset];
    expandStatus[idx + idxOffset] = expandStatus[idx];
    expandStatus[idx] = expandTemp;
    setPrices([...prices]);
    setExpandStatus([...expandStatus]);
  };

  useEffect(() => {
    expandStatus[idx] = 0;
    setExpandStatus([...expandStatus]);
  }, []);

  const isExpanded = !!expandStatus[idx];

  const priceDisplay = useMemo(() => {
    // console.log(price);
    return price ? price.toFixed(determineFraction(price)) : "-";
  }, [price]);

  return (
    <Wrapper>
      <CellWrapper
        key={id}
        onClick={() => {
          // console.log("click!", expand);
          expandStatus[idx] = !expandStatus[idx];
          setExpandStatus([...expandStatus]);
        }}
      >
        <a
          href={`https://coinmarketcap.com/currencies/${slug}/`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
            alt={id}
          />
          {name || symbol || "unknown"}
        </a>
        <span>
          <span
            className={`price ${
              isUp === 1 ? "up" : isUp === -1 ? "down" : undefined
            }`}
          >
            {priceDisplay}
            {/* {isUp === 1 ? "↑" : isUp === -1 ? "↓" : null} */}
          </span>
          <span
            className="percentage"
            style={{
              backgroundColor:
                p24h > 0
                  ? `rgba(0, 255, 0, ${Math.sqrt(Math.abs(p24h / 10))})`
                  : `rgba(255, 0, 0, ${Math.sqrt(Math.abs(p24h / 10))})`,
            }}
          >
            {p24h ? `${p24h.toFixed(2)}%` : ""}
          </span>
        </span>
      </CellWrapper>
      <LazyRender show={isExpanded}>
        <MoreSection>
          <ChartsGroup id={id} />
          <div className="buttons">
            <button onClick={() => onMove(true)} disabled={idx === 0}>
              ⬆
            </button>
            <button
              onClick={() => onMove()}
              disabled={idx === prices.length - 1}
            >
              ⬇
            </button>
            <button onClick={() => onRemove(id)} className="danger">
              ❌
            </button>
          </div>
        </MoreSection>
      </LazyRender>
    </Wrapper>
  );
};

export default PriceCell;
