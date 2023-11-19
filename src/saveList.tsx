import { IconDeviceFloppy } from "@tabler/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "./components/modal";
import { APIHost } from "./components/useUpdateData";
import { getSearchParams, writeURL } from "./utils/dom";
import Spinner from "./components/Spinner";

const ModalWrapper = styled.div`
  form > p:last-child {
    display: flex;
    justify-content: space-between;
  }
`;

const SaveList: React.FC<{ prices: any }> = ({ prices }) => {
  // const s = useMutation

  const [modalShow, setModalShow] = useState(false);

  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const defaultName = getSearchParams("name");
    if (defaultName) {
      setName(defaultName);
    }
  }, []);

  const onClickSave = (e: any) => {
    e.preventDefault();
    // console.log(e.target);
    const form = e.target;
    const name = form.name.value;
    const secret = form.secret.value;
    // const hasIds = new URL(window.location.href).searchParams.get("ids");
    /**
     * has id
     */
    // console.log(prices);
    if (!name) {
      return alert("name is required!");
    }
    const data = {
      name,
      secret,
      list: prices.map((price: any) => ({
        id: price.id,
        amount: price.amount ? price.amount : undefined
      }))
    };
    setLoading(true);
    axios
      .post(`${APIHost}/api/v1/crypto-watch-name`, data)
      .then(d => {
        //   console.log(d.data);
        if (d.data.status.code === 0) {
          writeURL({ name: data.name }, ["ids"]);
          setModalShow(false);
        }
        alert("status: " + d.data.status.code);
      })
      .catch(e => {
        alert(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <button
        onClick={() => {
          setModalShow(true);
        }}
      >
        <IconDeviceFloppy></IconDeviceFloppy>Save
      </button>
      <Modal show={modalShow}>
        <ModalWrapper>
          <form onSubmit={onClickSave}>
            <p>
              <input
                type="text"
                placeholder="name..."
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </p>
            <p>
              <input
                type="text"
                placeholder="secret..."
                name="secret"
                value={secret}
                onChange={e => setSecret(e.target.value)}
              />
            </p>
            <p>
              <button onClick={() => setModalShow(false)}>Cancel</button>
              <button type="submit" disabled={loading}>
                {loading ? <Spinner></Spinner> : "Save"}
              </button>
            </p>
          </form>
        </ModalWrapper>
      </Modal>
    </>
  );
};

export default SaveList;
