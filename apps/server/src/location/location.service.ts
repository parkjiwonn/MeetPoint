import { Injectable } from "@nestjs/common";
import { calculateMidpoint, type Location } from "@meet-point/shared";

@Injectable()
export class LocationService {
  calculateMidpoint(locations: Location[]): Location {
    return calculateMidpoint(locations);
  }
}
