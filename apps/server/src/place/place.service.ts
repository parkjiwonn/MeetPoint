import { Injectable } from "@nestjs/common";
import type { Place } from "@meet-point/shared";

@Injectable()
export class PlaceService {
  search(lat: number, lng: number, category?: string): Place[] {
    return [];
  }
}
