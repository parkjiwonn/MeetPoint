import type { Location } from "../types/location";

export function calculateMidpoint(locations: Location[]): Location {
  if (locations.length === 0) {
    throw new Error("At least one location is required");
  }

  const sum = locations.reduce(
    (acc, loc) => ({ lat: acc.lat + loc.lat, lng: acc.lng + loc.lng }),
    { lat: 0, lng: 0 },
  );

  return {
    lat: sum.lat / locations.length,
    lng: sum.lng / locations.length,
  };
}
