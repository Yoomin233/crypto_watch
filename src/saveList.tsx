import { IconDeviceFloppy } from "@tabler/icons";
import axios from "axios";
import { APIHost } from "./components/useUpdateData";
import { writeURL } from "./utils/dom";

const SaveList: React.FC<{ prices: any }> = ({ prices }) => {
  // const s = useMutation

  const onClickSave = () => {
    // const hasIds = new URL(window.location.href).searchParams.get("ids");
    /**
     * has id
     */
    // console.log(prices);
    const data = {
      name: "my-watchlist",
      secret: 1234,
      list: prices.map((price: any) => ({
        id: price.id,
        amount: price.amount,
      })),
    };
    axios.post(`${APIHost}/api/v1/crypto-watch-name`, data).then((d) => {
      //   console.log(d.data);
      if (d.data.status.code === 0) {
        writeURL({ name: data.name }, ["ids"]);
      }
      alert(d.data.status.code);
    });
  };
  return (
    <button onClick={onClickSave}>
      <IconDeviceFloppy></IconDeviceFloppy>Save
    </button>
  );
};

export default SaveList;
