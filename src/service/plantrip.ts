import axios from "axios";
import { IGeoCode, IHotel, ISite } from "../types";
import { planTripResponseMock } from "./mock";
import { buildUrl } from "./util";

export interface IDayDrive {
  duration_in_seconds: number;
  start_location: IGeoCode;
  end_location: IGeoCode;
  distance_in_meters: number;
}

export interface IDayDriveWithHotel {
  day_drive: IDayDrive;
  hotels: IHotel[];
}

export interface ILeanRoute {
  path: IGeoCode[]
}

export interface IPlanTripRequest {
  sites: ISite[];
  max_driving_seconds: number;
  hotel_finding_radius: number;
}

export interface IPlanTripResponse {
  day_drive_with_hotels: IDayDriveWithHotel[];
  sites: ISite[]
  lean_route: ILeanRoute
}

export default async function planTrip(planTripRequest: IPlanTripRequest) {
  return axios
    .post<IPlanTripResponse>(buildUrl("/plan-trip"), planTripRequest)
    .then((res) => {
      return res.data;
    });
};
