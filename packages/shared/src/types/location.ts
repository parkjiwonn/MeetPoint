export interface Location {
  lat: number;
  lng: number;
}

export interface Address {
  formatted: string;
  city?: string;
  district?: string;
}
