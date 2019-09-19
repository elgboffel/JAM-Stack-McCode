import React, {useEffect, useState} from "react";

const Clock = () => {

  const [time, setTime] = useState(undefined);

  useEffect(() => {
    setTime(new Date());
  }, []);

  return (
    <time dateTime={time ? time.toISOString() : ""}>{ time ? time.toLocaleTimeString() : "" }</time>
  );
};

export default Clock;
