import axios from "axios";
import { useEffect, useState } from "react";

const Gas = () => {
  const [gas, setGas] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const fetchGas = () =>
    axios.get("https://etherchain.org/api/gasnow").then(({ data }) => {
      setGas(data.data.fast / 10 ** 9);
      setEthPrice(data.data.priceUSD);
    });
  useEffect(() => {
    fetchGas();
    const timer = setInterval(fetchGas, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <p>
      Gas is: {gas.toFixed(0)}, price is: $
      {((gas * ethPrice * 0.0021) / 100).toFixed(2)}
    </p>
  );
};

export default Gas;
