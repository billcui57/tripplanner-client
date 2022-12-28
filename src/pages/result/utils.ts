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