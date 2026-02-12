import type { Location } from "./location";

export interface Participant {
  id: string;
  name: string;
  location: Location;
  joinedAt: Date;
}
