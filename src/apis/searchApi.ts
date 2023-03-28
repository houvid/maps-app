import axios from "axios";

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params:{
        limit: 3,
        language: 'es',
        access_token: 'pk.eyJ1IjoiaG91dmlkIiwiYSI6ImNsZnBob2lkODBhMjIzeHBvZmlqd3E2ODgifQ.BAKHnn5wTYJUm01JLmgo3g',

    }


})

export default searchApi;