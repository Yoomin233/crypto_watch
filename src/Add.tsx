import { useRef, useState } from "react";
import styled from "styled-components";

const TokenList = styled.div`
  cursor: pointer;
  margin: 4px auto;

  > img {
    width: 1.5em;
    margin-right: 0.5em;
    vertical-align: middle;
  }
`;

const Wrapper = styled.div`
  width: 100%;

  > div {
    position: absolute;
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    width: 100%;
    text-align: left;
    padding-left: 8px;
    z-index: 10;
    max-height: calc(100vw - 150px);
    overflow: scroll;
  }
`;

const AddToken = ({ onAdd, mapData }: any) => {
  const [search, setSearch] = useState("");
  const mapArr = Object.values(mapData);
  const ref = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   ref.current?.focus();
  // }, []);

  const searchRes = search
    ? mapArr.filter(
        (token: any) =>
          token.name.toLowerCase().includes(search.toLowerCase()) ||
          token.symbol.toLowerCase().includes(search.toLowerCase())
      )
    : [];
  return (
    <Wrapper>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={mapArr.length ? "Try 'Bitcoin'" : "Loading..."}
        disabled={!mapArr.length}
        ref={ref}
        className="crypto-search"
        style={{
          padding: "8px"
        }}
      />
      {searchRes.length ? (
        <div>
          {searchRes.slice(0, 100).map((r: any) => (
            <TokenList
              key={r.id}
              onClick={() => {
                onAdd(r.id);
                setSearch("");
                setTimeout(() => {
                  ref.current?.focus();
                }, 500);
              }}
            >
              <img
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${r.id}.png`}
                alt={r.id}
              />
              {r.name}
            </TokenList>
          ))}
        </div>
      ) : null}
    </Wrapper>
  );
};

export default AddToken;
