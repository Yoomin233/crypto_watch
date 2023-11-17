import { useState, useEffect } from 'react';

function useDebounce(value: string, delay: number) {
  // 设置一个内部状态来存储防抖后的值
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 设置一个延时器
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清除上一个延时器
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 仅在value或delay变化时重新运行

  return debouncedValue;
}

export default useDebounce;