import { useReducer, useEffect } from "react";
import { getUserLocation } from "../../helpers";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number,number];
}

export interface Props {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined
}

export const PlacesProvider = ({children}: Props) => {

    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

    useEffect(() => {
        getUserLocation().then(lnLat => dispatch({type: 'setUserLocation',payload: lnLat}))
    }, [])
    

    return (
        <PlacesContext.Provider value={{
            ...state,

        }}>
            {children}
        </PlacesContext.Provider>
    )
    
}