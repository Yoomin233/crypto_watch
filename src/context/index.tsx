import React, {useState} from "react";

type Periods = "1D" | "7D" | "1M" | "1Y" | "ALL";

export const GlobalContext = React.createContext<{
  period: Periods;
  setPeriod: React.Dispatch<React.SetStateAction<Periods>>;
}>({
  period: "1D",
  setPeriod: () => void 0
});

export const GlobalContextProvider: React.FC = ({ children }) => {
  const [period, setPeriod] = useState<Periods>("1D");
  return (
    <GlobalContext.Provider
      value={{
        period,
        setPeriod
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
