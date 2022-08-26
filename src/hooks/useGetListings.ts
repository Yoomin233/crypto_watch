import axios from "axios";
import { useEffect, useState } from "react";
import { APIHost } from "../components/useUpdateData";

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
  // refetch: boolean
): [() => Promise<any>, Date] => {
  // console.log(refetch);

  const [lastRefetch, setLastRefetch] = useState(new Date());

  const refetch = () =>
    axios
      .get(
        `${APIHost}/data-api/v3/cryptocurrency/listing?ids=${ids.join(
          ","
        )}&aux=ath`
      )
      .then(({ data }) => {
        if (!data?.data) return;
        const priceData = data.data.cryptoCurrencyList;
        setLastRefetch(new Date());
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
        });
      });
  useEffect(() => {
    refetch();
    // if (!refetch) return;
    // console.log("call!!");
  }, [ids.length, setter]);
  return [refetch, lastRefetch];
};

export default useGetListings;
