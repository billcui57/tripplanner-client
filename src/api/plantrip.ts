import { camelizeKeys } from "../pages/result/utils";


export interface IGeoCode {
  latitude: number;
  longitude: number;
}
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
export interface IPlanTripResponse {
  result_status: "missing_hotels";
  day_drive_with_hotels: IDayDriveWithHotel[];
  sites: string[]
}


export const IPlanTripResponseAdapter = (json: any): IPlanTripResponse => {
  return camelizeKeys(json) as IPlanTripResponse
}

