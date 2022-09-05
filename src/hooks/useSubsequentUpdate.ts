import { useEffect, useRef } from "react";

const useSubsequentUpdate = (cb: any, deps: string) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    cb();
  }, [deps]);
};

export default useSubsequentUpdate;
