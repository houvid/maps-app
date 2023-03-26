import { PlacesProvider } from "./context";
import { HomeScreen } from "./screens";

export const MapsApps = () => {
    return (
        <PlacesProvider>
            <HomeScreen/>
        </PlacesProvider>
    )
}