import { camelCase } from 'lodash';
import { IPin } from '../../components/Pin/Pin';
import { blue, green, pink } from "@mui/material/colors";

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


export const formatDecimalTime = (time: number): string => {
  const hours = Math.floor(time)
  let hoursString = ""
  if (hours === 0) {

  } else if (hours === 1) {
    hoursString = "1 hour"
  } else {
    hoursString = hours + " hours"
  }
  const minutes = Math.floor((time - hours) * 60)
  let minutesString = ""
  if (minutes === 0) {

  } else if (minutes === 1) {
    minutesString = "1 minute"
  } else {
    minutesString = minutes + " minutes"
  }
  return `${hoursString} ${minutesString}`
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