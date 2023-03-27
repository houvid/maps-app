import { useReducer } from "react";

import { Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

export interface MapState {
    isMapReady: boolean;
    map?: Map,


}

interface Props {
    children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,

}



export const MapProvider = ({children}: Props ) => {
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)
    const setMap = ( map: Map ) => {
        
        const customMarker = document.createElement('div');
        customMarker.style.backgroundImage = 'url(https://cdn-icons-png.flaticon.com/512/10133/10133906.png)';
        customMarker.style.backgroundSize = 'cover';
        customMarker.style.backgroundPosition = 'center';
        customMarker.style.width = '27px';
        customMarker.style.height = '41px';
        const myLocationPopup = new Popup()
        .setHTML(
            `<h4> Aquí estoy </h4>
            <img src="https://cdn-icons-png.flaticon.com/512/10133/10133906.png" style="width: 50px;">
            <p> Acá vamos pablito  </p>`)

        new Marker({
            color: '#61DAFB',
            element: customMarker
        })
        .setLngLat( map.getCenter() )
        .setPopup( myLocationPopup )
        .addTo(map)

        dispatch({ type: 'setMap', payload: map})
    }

    return(
        <MapContext.Provider value={{
            ...state,

            //Methods
            setMap,
        }}>
            { children }
        </MapContext.Provider>
    )
}