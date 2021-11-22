import axios from "axios";
import {
  BusinessDay,
  createChart,
  ISeriesApi,
  TickMarkType,
  UTCTimestamp,
} from "lightweight-charts";
import { useCallback, useEffect, useRef, useState } from "react";
// import { EventEmitter } from "stream";
import styled from "styled-components";
import eventEmitter from "../utils/eventEmitter";
// import useSubsequentUpdate from "../hooks/useSubsequentUpdate";
import Spinner from "./Spinner";

// type DataStruct = { time: "string"; value: number };

var darkTheme = {
  chart: {
    layout: {
      backgroundColor: "transparent",
      lineColor: "#2B2B43",
      textColor: "#D9D9D9",
    },
    watermark: {
      color: "rgba(0, 0, 0, 0)",
    },
    crosshair: {
      color: "#758696",
    },
    grid: {
      vertLines: {
        color: "transparent",
      },
      horzLines: {
        color: "transparent",
      },
    },
  },
  series: {
    topColor: "rgba(32, 226, 47, 0.56)",
    bottomColor: "rgba(32, 226, 47, 0.04)",
    lineColor: "rgba(32, 226, 47, 1)",
  },
};

const lightTheme = {
  chart: {
    layout: {
      backgroundColor: "#FFFFFF",
      lineColor: "#2B2B43",
      textColor: "#191919",
    },
    watermark: {
      color: "rgba(0, 0, 0, 0)",
    },
    grid: {
      vertLines: {
        visible: false,
      },
      horzLines: {
        color: "#f0f3fa",
      },
    },
  },
  series: {
    topColor: "rgba(33, 150, 243, 0.56)",
    bottomColor: "rgba(33, 150, 243, 0.04)",
    lineColor: "rgba(33, 150, 243, 1)",
  },
};

var themesData: any = {
  Dark: darkTheme,
  Light: lightTheme,
};

const TVChartWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const TVChart: React.FC<{ id: number; period: string }> = ({
  id = 1,
  period = 7,
}) => {
  const domRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);

  const [data, setData] = useState<any[]>([]);

  //   const timerRef = useRef(null)

  const [loading, setLoading] = useState<boolean>(true);
  //   const [error, setError] = useState(false);

  //   useEffect(() => {
  //     if (loading) {
  //       console.log("race!");
  //       timerRef.current = setTimeout(() => setError(true), 5000)
  //     } else {

  //     }
  //   }, [loading]);

  const getData = useCallback(() => {
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
        // console.log(mappedData);
        setData(mappedData);
        return mappedData;

        // console.log(data.data.points);
      })
      .catch((e) => {
        return [];
      });
  }, [id, period]);

  //   useSubsequentUpdate(() => {
  // }, `${id}${period}`);

  const clear = () => {
    if (chartRef.current) {
      chartRef.current.remove();
    }
    // console.log(ref.current?.children?.[0]);
    // ref.current?.removeChild(ref.current?.children?.[0]);
    // if (ref.current) {
    //   ref.current.innerHTML = "";
    // }
    // setData([]);
  };

  useEffect(() => {
    if (!domRef.current) return;
    clear();
    setLoading(true);
    // console.log("exec!");
    const { width, height } = domRef.current.getBoundingClientRect();

    let subscriber: any;

    getData().then((data) => {
      //   console.log(data);
      if (!domRef.current) return;
      //   setData(data);
      const chart = createChart(domRef.current, {
        width,
        height,
        handleScale: {
          mouseWheel: false,
          pinch: false,
          axisPressedMouseMove: false,
        },
        rightPriceScale: {
          borderVisible: false,
        },
        timeScale: {
          borderVisible: false,
          timeVisible: true,
          fixLeftEdge: true,
          fixRightEdge: true,
          tickMarkFormatter: (
            time: UTCTimestamp | BusinessDay,
            tickMarkType: TickMarkType,
            locale: string
          ) => {
            return new Date(Number(time) * 1000).toLocaleDateString();

            //   console.log(time, tickMarkType);
            //   return "333";
          },
        },
        localization: {
          timeFormatter: (time: BusinessDay | UTCTimestamp) => {
            // console.log(time);
            return new Date(Number(time) * 1000).toLocaleString();
            // return dayjs.unix(time).toDate().toLocaleDateString(locale);
          },
        },
      });

      chartRef.current = chart;

      seriesRef.current = chart.addAreaSeries({
        topColor: "rgba(33, 150, 243, 0.56)",
        bottomColor: "rgba(33, 150, 243, 0.04)",
        lineColor: "rgba(33, 150, 243, 1)",
        lineWidth: 1,
      });

      chart.applyOptions(themesData["Dark"].chart);
      seriesRef.current.applyOptions(themesData["Dark"].series);

      setLoading(false);

      chart.timeScale().fitContent();

      seriesRef.current.setData(data as any);
      //   areaSeries.re

      subscriber = eventEmitter.subscribe(`WS-${id}`, (wsData: any) => {
        setData((data) => [
          ...data,
          {
            time: Math.floor(Number(new Date()) / 1000),
            value: wsData.p,
          },
        ]);
      });
    });
    return () => eventEmitter.unsubscribe(`WS-${id}`, subscriber);
  }, [getData]);

  useEffect(() => {
    if (seriesRef.current && data.length) {
      seriesRef.current.setData(data as any);
    }
  }, [data]);

  //   if (!data.length) return ;
  return (
    <TVChartWrapper ref={domRef}>
      {loading ? <Spinner></Spinner> : null}
    </TVChartWrapper>
  );
};

export default TVChart;
