import { Body, Controller, Post } from "@nestjs/common";
import { LocationService } from "./location.service";
import type { Location } from "@meet-point/shared";

@Controller("location")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post("midpoint")
  calculateMidpoint(@Body() body: { locations: Location[] }): Location {
    return this.locationService.calculateMidpoint(body.locations);
  }
}
