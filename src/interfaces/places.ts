export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:                   string;
    type:                 string;
    place_type:           string[];
    relevance:            number;
    properties:           Properties;
    text_es:              string;
    place_name_es:        string;
    text:                 string;
    place_name:           string;
    bbox?:                number[];
    center:               number[];
    geometry:             Geometry;
    context:              Context[];
    matching_text?:       string;
    matching_place_name?: string;
}

export interface Context {
    id:           string;
    short_code?:  string;
    wikidata?:    string;
    mapbox_id:    string;
    text_es:      string;
    language_es?: string;
    text:         string;
    language?:    string;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    mapbox_id?:  string;
    foursquare?: string;
    landmark?:   boolean;
    category?:   string;
    accuracy?:   string;
}
