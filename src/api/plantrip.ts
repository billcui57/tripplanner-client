import axios from "axios";
import { IGeoCode, ISite } from "./types";

export interface IDayDrive {
  duration_in_hours: number;
  start_location: IGeoCode;
  end_location: IGeoCode;
  distance_in_meters: number;
}

export interface IDayDriveWithHotel {
  day_drive: IDayDrive;
  hotel_geocodes: IGeoCode[];
}

export interface IPlanTripRequest {
  sites: ISite[];
  max_driving_hours: number;
  hotel_finding_radius: number;
}

export interface IPlanTripResponse {
  day_drive_with_hotels: IDayDriveWithHotel[];
  sites: string[]
}

export default async function planTrip(planTripRequest: IPlanTripRequest) {
  return axios
    .post<IPlanTripResponse>("/api/plan-trip", planTripRequest)
    .then((res) => {
      return res.data;
    });
};
