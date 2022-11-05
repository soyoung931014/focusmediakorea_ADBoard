import { useEffect, useRef } from 'react';

function useInterval(callback: any, delay: number | null) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      newFunction(savedCallback)();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
export default useInterval;

function newFunction(savedCallback: any) {
  return savedCallback.current;
}
