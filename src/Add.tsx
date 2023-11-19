import { useRef, useState } from "react";
import styled from "styled-components";
import { IconPlus } from "@tabler/icons";
import Modal from "./components/modal";

const TokenList = styled.div`
  cursor: pointer;
  margin: 4px auto;

  > img {
    width: 1.5em;
    margin-right: 0.5em;
    vertical-align: middle;
  }
`;

const Result = styled.div`
  width: 100%;
  border-radius: 4px;
  text-align: left;
  padding-left: 8px;
  z-index: 10;
  max-height: calc(100vh - 150px);
  overflow: scroll;
`;

const AddBtn = styled.div`
  border-radius: 8px;
  background: var(--gray-color);
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  &:hover {
    filter: brightness(0.95);
  }
`;

const AddToken = ({ onAdd, mapData }: any) => {
  const [search, setSearch] = useState("");
  const mapArr = Object.values(mapData);
  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

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
    <>
      <AddBtn
        onClick={() => {
          setOpen(true);
          setTimeout(() => {
            ref.current?.focus();
          }, 500);
        }}
      >
        <IconPlus></IconPlus>
      </AddBtn>
      <Modal
        show={open}
        onClose={() => {
          setOpen(false);
          setSearch("");
        }}
      >
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
          <Result className={"result"}>
            {searchRes.slice(0, 100).map((r: any) => (
              <TokenList
                key={r.id}
                onClick={() => {
                  onAdd(r.id);
                  setSearch("");

                  setOpen(false);
                }}
              >
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${r.id}.png`}
                  alt={r.id}
                />
                {r.name}
              </TokenList>
            ))}
          </Result>
        ) : null}
      </Modal>
    </>
  );
};

export default AddToken;
