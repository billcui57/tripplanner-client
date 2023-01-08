import { blue, green, pink } from "@mui/material/colors";
import { camelCase } from 'lodash';
import { IPin } from './components/Pin/Pin';

export const camelizeKeys = (obj: any): object => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};



export const formatHourDecimalTime = (hourDecimal: number): string => {
  const hours = Math.floor(hourDecimal)
  let hoursString = ""
  if (hours === 0) {

  } else if (hours === 1) {
    hoursString = "1 hour"
  } else {
    hoursString = hours + " hours"
  }
  const minutes = Math.floor((hourDecimal - hours) * 60)
  let minutesString = ""
  if (minutes === 0) {

  } else if (minutes === 1) {
    minutesString = "1 minute"
  } else {
    minutesString = minutes + " minutes"
  }
  return `${hoursString} ${minutesString}`
}

//time : seconds
export const formatSecondTime = (seconds: number): string => {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
  return hDisplay + mDisplay
}

export const getPinColour = (pinType: IPin['type']) => {
  if (pinType === "hotel") {
    return pink[500];
  } else if (pinType === "site") {
    return green[500];
  } else if (pinType === "cluster") {
    return blue[500];
  } else {
    return pink[500];
  }
}

export const secondsToHours = (seconds: number): number => {
  return seconds / 60 / 60
}

export const hoursToSeconds = (hours: number): number => {
  return hours * 60 * 60
}
