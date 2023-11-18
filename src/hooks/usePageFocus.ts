import { useEffect, useState } from "react";

function usePageFocus(callback: (isFocused: boolean) => void) {
  const [isFocused, setIsFocused] = useState(document.hasFocus());

  useEffect(() => {
    // 当页面获得或失去焦点时的处理函数
    const handleFocusChange = () => {
      const currentFocus = document.hasFocus();
      setIsFocused(currentFocus);
      callback(currentFocus);
    };

    // 绑定事件监听器
    window.addEventListener("focus", handleFocusChange);
    window.addEventListener("blur", handleFocusChange);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener("focus", handleFocusChange);
      window.removeEventListener("blur", handleFocusChange);
    };
  }, [callback]); // 将 callback 添加到依赖数组中

  return isFocused;
}

export default usePageFocus;
