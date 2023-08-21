import { MutableRefObject, useEffect, useRef, useState } from "react";

const useCountdown = (seconds: number) => {
  const currentDate = new Date();
  const [desiredDate] = useState(
    new Date(currentDate.getTime() + seconds * 1000)
  );
  const [countDown, setCountDown] = useState(seconds * 1000);

  const intervalRef: MutableRefObject<NodeJS.Timer | undefined> = useRef();

  const countdownWork = () => {
    const now = new Date();
    setCountDown(desiredDate.getTime() - now.getTime());
    intervalRef.current = setTimeout(countdownWork, 100);
  };

  useEffect(() => {
    intervalRef.current = setTimeout(countdownWork, 100);

    return () => clearTimeout(intervalRef.current);
  }, [seconds]);

  return countDown;
};

export { useCountdown };
