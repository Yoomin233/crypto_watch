import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useGetMapStorage = (key: string) => {
  const [mapData, setMapData] = useState<any>(() =>
    localStorage.getItem(key)
      ? JSON.parse(String(localStorage.getItem(key))).data
      : {}
  );
  const fetchMap = useCallback(
    () =>
      axios
        .get(
          "https://api.coinmarketcap.com/data-api/v3/map/all?cryptoAux=status&limit=10000&listing_status=active&start=1"
        )
        .then(({ data }) => {
          const storedData = data.data.cryptoCurrencyMap.reduce(
            (prev: any, next: any) => {
              prev[next.id] = next;
              return prev;
            },
            {}
          );
          // console.log(storedData);
          setMapData(storedData);
          localStorage.setItem(
            key,
            JSON.stringify({
              data: storedData,
              timeStamp: +new Date(),
            })
          );
        }),
    [key]
  );
  useEffect(() => {
    if (localStorage.getItem(key)) {
      const timeStamp = JSON.parse(String(localStorage.getItem(key))).timeStamp;
      if (timeStamp + 1000 * 3600 * 24 <= Number(new Date())) {
        console.log("refetch!");
        fetchMap();
      }
    } else {
      console.log("init fetch!");
      fetchMap();
    }
  }, [fetchMap, key]);
  return mapData;
};

export default useGetMapStorage;
