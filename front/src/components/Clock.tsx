import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    console.log(time.toLocaleTimeString());

    if ('1:05:00' === time.toLocaleTimeString()) {
      console.log('aaa');
    }

    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-center text-xl font-bold">
      {time.toLocaleTimeString()}
    </div>
  );
}

export default Clock;
