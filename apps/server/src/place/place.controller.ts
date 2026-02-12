import { Controller, Get, Query } from "@nestjs/common";
import { PlaceService } from "./place.service";
import type { Place } from "@meet-point/shared";

@Controller("place")
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get("search")
  search(
    @Query("lat") lat: string,
    @Query("lng") lng: string,
    @Query("category") category?: string,
  ): Place[] {
    return this.placeService.search(
      parseFloat(lat),
      parseFloat(lng),
      category,
    );
  }
}
