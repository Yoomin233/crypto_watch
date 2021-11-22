import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import eventEmitter from "../utils/eventEmitter";

const TimeInterval: any = {
  "1D": 300,
  "7D": 300,
  "1M": 3600,
  "3M": 3600,
  "1Y": 86400,
};

const useUpdateData = (id: number, period: string): [any[], boolean] => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //   const latestNewLine = useRef<number>(0);

  const getData = useCallback(() => {
    // clear();
    setLoading(true);
    return axios
      .get(
        `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=${id}&range=${period}`
      )
      .then(({ data }) => {
        const mappedData = Object.entries<any>(data.data.points).map(
          ([key, value]) => ({
            time: Number(key),
            value: value.v[0],
          })
        );
        setData(mappedData);
        return mappedData;
      })
      .catch((e) => {
        return [];
      })
      .finally(() => {
        setLoading(false);
      });

    // return () => eventEmitter.unsubscribe(`WS-${id}`, subscriber);
  }, [id, period]);

  useEffect(() => {
    getData();
    const subscriber = eventEmitter.subscribe(`WS-${id}`, (wsData: any) => {
      setData((data) => {
        const lastData = data[data.length - 1];
        const lastDataTime = lastData.time * 1000;
        const now = Number(new Date());
        const shouldInsertNewData = TimeInterval[period];
        if (now - lastDataTime >= shouldInsertNewData) {
          console.log("insert new line!");
          return [
            ...data,
            {
              time: Math.floor(Number(new Date()) / 1000),
              value: wsData.p,
            },
          ];
        } else {
          // lastData.time = now
          console.log("in-place update!");
          lastData.price = wsData.p;
          return [...data];
        }
        // console.log(lastDataTime);
        // // console.log(data);
        // return data;
      });
    });
    return () => {
      console.log("unsubscribe!");
      eventEmitter.unsubscribe(`WS-${id}`, subscriber);
    };
  }, [id, period, getData]);

  return [data, loading];
};

export default useUpdateData;
