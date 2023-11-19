import { IconCaretLeft, IconCaretRight, IconTrash } from "@tabler/icons";
import {
  lazy,
  memo,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
// import styled from "styled-components";
// import ImgLoading from "./components/ImgLoading";
import Spinner from "../components/Spinner";
import { GlobalContext } from "../context";
import { abbreviateNumber, priceFormatter } from "../utils/number";
import { CellWrapper, ChartsWrapper, MoreSection, Wrapper } from "./styled";
import Modal from "../components/modal";

const LazyChart = lazy(() => import("../components/chart"));

const ChartsGroup = memo<{
  id?: number;
  crypto?: string;
}>(({ id = 1, crypto }) => {
  const { period: globalPeriod, setPeriod: setGlobalPeriod } = useContext(
    GlobalContext
  );
  const [period, setPeriod] = useState(globalPeriod);
  useEffect(() => {
    setGlobalPeriod(period);
  }, [setGlobalPeriod, period]);
  return (
    <ChartsWrapper>
      <div
        style={{
          marginBottom: 8,
          textAlign: "center",
          fontWeight: "bold"
        }}
      >
        {crypto} Chart
      </div>

      <div className="switch">
        <span
          className={period === "1D" ? "selected" : undefined}
          onClick={() => setPeriod("1D")}
        >
          24h
        </span>
        <span
          className={period === "7D" ? "selected" : undefined}
          onClick={() => setPeriod("7D")}
        >
          7D
        </span>
        <span
          className={period === "1M" ? "selected" : undefined}
          onClick={() => setPeriod("1M")}
        >
          1M
        </span>
        <span
          className={period === "1Y" ? "selected" : undefined}
          onClick={() => setPeriod("1Y")}
        >
          1Y
        </span>
        <span
          className={period === "ALL" ? "selected" : undefined}
          onClick={() => setPeriod("ALL")}
        >
          ALL
        </span>
      </div>
      <Charts id={id} period={period} />
    </ChartsWrapper>
  );
});

const Charts = ({ id = 1, period = "1D" }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyChart id={id} period={period} />
    </Suspense>
  );
};

const PriceCell = memo(
  ({
    name,
    info,
    onRemove,
    prices,
    setPrices,
    idx,
    expandStatus,
    setExpandStatus,
    edit
  }: any) => {
    const { id, p24h, price, slug, symbol, amount: propsAmount } = info;
    const lastPrice = useRef(price);
    const [isUp, setIsUp] = useState<1 | 0 | -1>(0);

    const [amount, setAmount] = useState(propsAmount);

    useEffect(() => {
      if (
        price !== lastPrice.current &&
        price !== undefined &&
        lastPrice.current !== undefined
      ) {
        if (lastPrice.current < price) {
          setIsUp(1);
        } else {
          setIsUp(-1);
        }
        setTimeout(() => setIsUp(0), 1000);
      }
      lastPrice.current = price;
    }, [price]);

    const onMove = (isUp?: boolean) => {
      const idxOffset = isUp ? -1 : 1;
      const temp = prices[idx + idxOffset];
      prices[idx + idxOffset] = prices[idx];
      prices[idx] = temp;

      setPrices([...prices]);
    };

    const isExpanded = !!expandStatus[id];

    const priceDisplay = useMemo(() => {
      return price ? priceFormatter(price) : "-";
    }, [price]);

    const onInput = (e: any) => {
      if (!e) return;
      const newAmount = Number(e.target.value);
      setAmount(newAmount);
      const elementIndex = prices.findIndex((token: any) => token.id === id);
      if (elementIndex >= 0) {
        prices[elementIndex] = {
          ...prices[elementIndex],
          amount: newAmount
        };
        setPrices([...prices]);
      }
    };

    return (
      <Wrapper>
        <CellWrapper
          key={id}
          onClick={() => {
            expandStatus[id] = !expandStatus[id];
            setExpandStatus({ ...expandStatus });
          }}
        >
          <a
            href={`https://coinmarketcap.com/currencies/${slug}/`}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
              alt={id}
            />
            <span>
              <span>{name || symbol || "unknown"}</span>
              {amount > 0 && <span>Balance: {abbreviateNumber(amount)}</span>}
            </span>
          </a>
          {edit ? (
            <div className={`buttons`} onClick={e => e.stopPropagation()}>
              <input
                placeholder="Balance"
                type={"number"}
                value={amount}
                onChange={onInput}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    onInput(e);
                  }
                }}
              ></input>
              <button onClick={() => onMove(true)} disabled={idx === 0}>
                <IconCaretLeft></IconCaretLeft>
              </button>
              <button
                onClick={() => onMove()}
                disabled={idx === prices.length - 1}
              >
                <IconCaretRight></IconCaretRight>
              </button>
              <button onClick={() => onRemove(id)} className="danger">
                <IconTrash></IconTrash>
              </button>
            </div>
          ) : (
            <span className="metrics">
              <span
                className={`price ${
                  isUp === 1 ? "up" : isUp === -1 ? "down" : ""
                }`}
              >
                <span>${priceDisplay}</span>
                {amount > 0 && !!price && (
                  <span>${(price * amount).toFixed(2)}</span>
                )}
              </span>
              <span
                className="percentage"
                style={{
                  backgroundColor:
                    p24h > 0
                      ? `rgba(0, 255, 0, ${Math.max(
                          0.5,
                          Math.sqrt(Math.abs(p24h / 20))
                        )})`
                      : `rgba(255, 0, 0, ${Math.max(
                          0.5,
                          Math.sqrt(Math.abs(p24h / 20))
                        )})`
                }}
              >
                {p24h ? `${p24h.toFixed(2)}%` : ""}
              </span>
            </span>
          )}
        </CellWrapper>

        <Modal
          show={isExpanded}
          onClose={() => {
            expandStatus[id] = false;
            setExpandStatus({ ...expandStatus });
          }}
        >
          <MoreSection>
            <ChartsGroup id={id} crypto={name || symbol} />
          </MoreSection>
        </Modal>
      </Wrapper>
    );
  }
);

export default PriceCell;
