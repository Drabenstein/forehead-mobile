import { MutableRefObject, useEffect, useRef, useState } from "react";

const useCountdown = (seconds, onElapsed) => {
  const currentDate = new Date();
  const [desiredDate] = useState(
    new Date(currentDate.getTime() + seconds * 1000)
  );
  const [countDown, setCountDown] = useState(seconds * 1000);

  const intervalRef = useRef(null);

  const countdownWork = () => {
    const now = new Date();
    const timeDiff = desiredDate.getTime() - now.getTime();
    if (timeDiff <= 0) {
      onElapsed();
    } else {
      setCountDown(timeDiff);
      intervalRef.current = setTimeout(countdownWork, 100);
    }
  };

  useEffect(() => {
    intervalRef.current = setTimeout(countdownWork, 100);

    return () => clearTimeout(intervalRef.current);
  }, [seconds]);

  return countDown;
};

export { useCountdown };
