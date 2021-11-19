import axios from "axios";
import { useEffect } from "react";

const useGetListings = (
  ids: number[],
  setter: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        price?: number | undefined;
        p24h?: number | undefined;
      }[]
    >
  >
) => {
  useEffect(() => {
    axios
      .get(
        `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?ids=${ids.join(
          ","
        )}&aux=ath`
      )
      .then(({ data }) => {
        const priceData = data.data.cryptoCurrencyList;
        setter((data) => {
          return data.map((d) => {
            const find = priceData.find((p: any) => p.id === d.id);
            // console.log(find);
            // console.log(d.id);
            if (find) {
              return {
                ...d,
                price: find.quotes?.[0]?.price || 0,
                p24h: find.quotes?.[0]?.percentChange24h || 0,
                name: find.name,
                slug: find.slug,
              };
            } else {
              return d;
            }
          });
          //   return data;
          //   return data.reduce((prev, next) => {
          //     console.
          //   }, [])
        });
        // data.data.cryptoCurrencyList.map((token: any) => {
        //   console.log(token);
        // });
      });
  }, [ids.length, setter]);
};

export default useGetListings;
