
export interface IGeoCode {
  latitude: number;
  longitude: number;
}

export interface IHotel {
  name: string,
  location: IGeoCode
}

export interface ISite {
  location: IGeoCode
}
