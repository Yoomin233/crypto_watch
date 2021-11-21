import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ImgLoading from "./components/ImgLoading";

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
  }
`;

const ChartsWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  .switch {
    display: grid;
    margin-right: 8px;
    > span {
      border: 2px solid transparent;
      border-right: none;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      padding: 2px 8px;
      &.selected {
        /* color: yellow; */
        border-color: var(--border-color);
      }
    }
  }
  img {
    width: 100%;
  }
`;

const ChartsGroup = ({ id = 1 }) => {
  const [period, setPeriod] = useState(7);
  return (
    <ChartsWrapper>
      <div className="switch">
        <span
          className={period === 1 ? "selected" : undefined}
          onClick={() => setPeriod(1)}
        >
          24h
        </span>
        <span
          className={period === 7 ? "selected" : undefined}
          onClick={() => setPeriod(7)}
        >
          7d
        </span>
        <span
          className={period === 30 ? "selected" : undefined}
          onClick={() => setPeriod(30)}
        >
          30d
        </span>
        <span
          className={period === 60 ? "selected" : undefined}
          onClick={() => setPeriod(60)}
        >
          60d
        </span>
        <span
          className={period === 90 ? "selected" : undefined}
          onClick={() => setPeriod(90)}
        >
          90d
        </span>
      </div>
      <Charts id={id} period={period} />
    </ChartsWrapper>
  );
};

const Charts = ({ id = 1, period = 7 }) => {
  return (
    <ImgLoading
      src={`https://s3.coinmarketcap.com/generated/sparklines/web/${period}d/2781/${id}.svg`}
      alt={`${id} sparkline`}
    />
  );
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
  const { id, p24h, price, name: infoName, slug } = info;
  const lastPrice = useRef(price);
  const isUp = useRef(true);

  // const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (price !== lastPrice.current) {
      //   console.log("update!", price);
      isUp.current = lastPrice.current < price || price === undefined;
      lastPrice.current = price;
    }
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
          {name || infoName || "unknown"}
        </a>
        <span>
          <span className={`price ${isUp.current ? "up" : "down"}`}>
            {price ? price?.toFixed(4) : "-"}
            {isUp.current ? "↑" : "↓"}
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
      {isExpanded && (
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
              ╳
            </button>
          </div>
        </MoreSection>
      )}
    </Wrapper>
  );
};

export default PriceCell;
