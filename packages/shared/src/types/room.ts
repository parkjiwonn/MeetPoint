import type { Location } from "./location";
import type { Participant } from "./participant";

export interface Room {
  id: string;
  name: string;
  participants: Participant[];
  midpoint?: Location;
  createdAt: Date;
}
