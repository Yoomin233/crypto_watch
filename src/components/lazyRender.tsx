import { useEffect, useState } from "react";

const LazyRender: React.FC<{ show: boolean }> = ({ show, children }) => {
  const [showed, setShowed] = useState<boolean>(show);
  useEffect(() => {
    if (show) {
      setShowed(show);
    }
  }, [show]);
  if (showed && show) {
    return <div>{children}</div>;
  } else if (showed && !show) {
    return (
      <div
        style={{
          display: "none",
        }}
      >
        {children}
      </div>
    );
  } else {
    return null;
  }
};

export default LazyRender;
