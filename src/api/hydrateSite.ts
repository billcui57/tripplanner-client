import axios from "axios";
import { ISite } from "../types";


export interface IHydrateSiteRequest {
  sites: ISite[]
}

export interface IHydrateSiteResponse {
  sites: ISite[]
}

export default async function hydrateSite(hydrateSiteRequest: IHydrateSiteRequest) {
  return axios
    .post<IHydrateSiteResponse>("/api/plan-trip", hydrateSiteRequest)
    .then((res) => {
      return res.data;
    });
};