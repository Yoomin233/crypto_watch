import {
  BusinessDay,
  createChart,
  TickMarkType,
  UTCTimestamp
} from "lightweight-charts";
import { useEffect, useRef } from "react";
// import { EventEmitter } from "stream";
import styled from "styled-components";
// import useSubsequentUpdate from "../hooks/useSubsequentUpdate";
import Spinner from "./Spinner";
import useUpdateData from "./useUpdateData";

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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &.loading {
    div.tv-lightweight-charts {
      filter: blur(4px);
    }
  }
  > span {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const TVChart: React.FC<{ id: number; period: string }> = ({
  id = 1,
  period = "1D",
}) => {
  const domRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);

  // const clear = () => {
  //   if (chartRef.current) {
  //     chartRef.current.remove();
  //   }
  // };

  const [data, loading] = useUpdateData(id, period);

  //   const timerRef = useRef(null)

  //   const [loading, setLoading] = useState<boolean>(true);
  //   const [error, setError] = useState(false);

  //   useEffect(() => {
  //     if (loading) {
  //       console.log("race!");
  //       timerRef.current = setTimeout(() => setError(true), 5000)
  //     } else {

  //     }
  //   }, [loading]);

  //   const getData = useCallback(() => {
  //     return axios
  //       .get(
  //         `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=${id}&range=${period}`
  //       )
  //       .then(({ data }) => {
  //         const mappedData = Object.entries<any>(data.data.points).map(
  //           ([key, value]) => ({
  //             time: Number(key),
  //             value: value.v[0],
  //           })
  //         );
  //         setData(mappedData);
  //         return mappedData;
  //       })
  //       .catch((e) => {
  //         return [];
  //       });
  //   }, [id, period]);

  useEffect(() => {
    // console.log("render!", domRef.current);
    if (!domRef.current) return;

    // console.log('update!', data)

    // console.log(domRef.current, chartRef.current, seriesRef.current);

    if (chartRef.current && seriesRef.current) {
      seriesRef.current.setData(data);
      chartRef.current.timeScale().fitContent();
      return;
    }

    // clear();
    // setLoading(true);

    // console.log("init render!", data);
    const { width, height } = domRef.current.getBoundingClientRect();

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
        priceFormatter: (price: number) => {
          const decimals = price <= 0.01 ? 6 : price < 1 ? 4 : 2;
          return price.toFixed(decimals);
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

    // setLoading(false);

    chart.timeScale().fitContent();

    seriesRef.current.setData(data);

    // console.log("mount!!");

    //   seriesRef.current.setData(data as any);
    //   areaSeries.re

    //   subscriber = eventEmitter.subscribe(`WS-${id}`, (wsData: any) => {
    //     setData((data) => [
    //       ...data,
    //       {
    //         time: Math.floor(Number(new Date()) / 1000),
    //         value: wsData.p,
    //       },
    //     ]);
    //   });
    // });
    // return () => eventEmitter.unsubscribe(`WS-${id}`, subscriber);
  }, [id, data]);

  //   useEffect(() => {
  //     clear();
  //   }, [period]);

  //   useEffect(() => {
  //     console.log("data update!", seriesRef.current);
  //     if (seriesRef.current && data.length) {
  //       //   console.log("update!");
  //       seriesRef.current.setData(data as any);
  //     }
  //   }, [data]);

  //   console.log(data);

  //   if (!data.length) return ;
  return (
    <Wrapper className={loading ? "loading" : undefined}>
      <TVChartWrapper ref={domRef}></TVChartWrapper>
      {loading && <Spinner></Spinner>}
    </Wrapper>
  );
};

export default TVChart;
