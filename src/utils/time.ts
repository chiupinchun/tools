export const fillZero = (number: number, dig: number) => {
  let result = "";
  for (let i = 0; i < dig; i++) {
    result += "0";
  }
  result += number;
  return result.slice(-1 * dig);
};

export const formatTimeDifference = (time1: Date, time2: Date) => {
  let timeDifference = +time1 - +time2;
  const result: string[] = [];
  const hour = Math.floor(timeDifference / (60 * 60 * 1000));
  if (hour > 0) {
    result.push(`${fillZero(hour, 2)}時`);
  }
  timeDifference = timeDifference % (60 * 60 * 1000);

  const minute = Math.floor(timeDifference / (60 * 1000));
  if (minute > 0) {
    result.push(`${fillZero(minute, 2)}分`);
  }
  timeDifference = timeDifference % (60 * 1000);

  const second = Math.floor(timeDifference / 1000);
  if (second > 0) {
    result.push(`${fillZero(second, 2)}秒`);
  }

  return result.join(" ");
};
