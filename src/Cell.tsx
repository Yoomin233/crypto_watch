import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CellWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  /* margin-top: 8px; */
  width: calc(50% - 17px);
  /* display: inline-block; */
  /* border-left: 1px solid #fff; */
  /* border-radius: 4px; */
  cursor: pointer;
  box-sizing: border-box;
  user-select: none;
  border-bottom: 1px solid var(--border-color);
  /* &:hover {
    transform: translateY(-2px);
  } */
  @media screen and (max-width: 450px) {
    white-space: nowrap;
    width: 100%;
    border-left: none;
    /* overflow: hidden; */
    > span:first-child {
      max-width: 45vw;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  > a {
    color: inherit;
  }
  img {
    width: 1.5em;
    margin-right: 0.5em;
    vertical-align: middle;
  }
  span.price {
    font-weight: bold;
    font-size: 1.1em;
    &.up {
      color: var(--up-color);
    }
    &.down {
      color: var(--down-color);
    }
  }
  span.percentage {
    padding: 8px 4px;
    border-radius: 4px;
    color: #fff;
    margin-left: 12px;
    display: inline-block;
    text-align: center;
    width: 4.5em;
  }
`;

const Operations = styled.div`
  padding: 8px;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;
  display: flex;
`;

const PriceCell = ({ info, onRemove, prices, setPrices, idx }: any) => {
  const { id, p24h, price, name, slug } = info;
  const lastPrice = useRef(price);
  const isUp = useRef(true);

  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (price !== lastPrice.current) {
      //   console.log("update!", price);
      isUp.current = lastPrice.current < price || price === undefined;
      lastPrice.current = price;
    }
    // console.log("price change!", lastPrice.current, price);
  }, [price]);
  //   console.log(price)
  //   const isUp = lastPrice.current < price || price === undefined;
  //   const isEqual = lastPrice.current === price;
  //   console.log(isEqual);
  //   console.log(expand);

  const onMove = (isUp?: boolean) => {
    // let temp;
    const idxOffset = isUp ? -1 : 1;
    // if (isUp) {
    const temp = prices[idx + idxOffset];
    prices[idx + idxOffset] = prices[idx];
    prices[idx] = temp;
    setPrices([...prices]);
    // } else {
    //     temp = prices[idx - 1];
    //     prices[idx - 1] = prices[idx];
    //     prices[idx] = temp;
    //     setPrices([...prices]);
    // }
  };

  return (
    <>
      <CellWrapper key={id}>
        <a
          href={`https://coinmarketcap.com/currencies/${slug}/`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
            alt={id}
          />
          {name || "unknown"}
        </a>
        <span
          onClick={() => {
            // console.log("click!", expand);
            setExpand(!expand);
          }}
        >
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
      {expand && (
        <Operations>
          <button onClick={() => onMove(true)} disabled={idx === 0}>
            Move Up↑
          </button>
          <button onClick={() => onMove()} disabled={idx === prices.length - 1}>
            Move Down↓
          </button>
          <button onClick={() => onRemove(id)} className="danger">
            Delete
          </button>
        </Operations>
      )}
    </>
  );
};

export default PriceCell;
