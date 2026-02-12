import type { Location } from "./location";

export interface Place {
  id: string;
  name: string;
  category: string;
  location: Location;
  address: string;
  rating?: number;
  imageUrl?: string;
}
