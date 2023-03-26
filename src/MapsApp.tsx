import { MapProvider, PlacesProvider } from "./context";
import { HomeScreen } from "./screens";

export const MapsApps = () => {
    return (
        <PlacesProvider>
            <MapProvider>
            <HomeScreen/>
            </MapProvider>
        </PlacesProvider>
    )
}