import { useEffect, useRef, useState } from "react";
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
    <div
      style={{
        margin: "12px 0px",
      }}
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={mapArr.length ? "Type Something..." : "Loading..."}
        disabled={!mapArr.length}
        ref={ref}
      />
      <div>
        {searchRes.slice(0, 10).map((r: any) => (
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
    </div>
  );
};

export default AddToken;
