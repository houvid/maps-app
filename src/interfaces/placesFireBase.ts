export interface Feature {
    idCollection?: string;
    properties?: Properties;
    text_es?: string;
    id?: string;
    place_type?: string[];
    geometry?: Geometry;
    place_name?: string;
    text?: string;
    relevance?: number;
    center?: number[];
    context?: Context[];
    bbox?: number[];
    place_name_es?: string;
    type?: string;
}

export interface Context {
    mapbox_id?: string;
    wikidata?: string;
    id?: string;
    text_es?: string;
    language_es?: string;
    short_code?: string;
    language?: string;
    text?: string;
}

export interface Geometry {
    coordinates: number[];
    type: string;
}

export interface Properties {
    mapbox_id: string;
    name?: string;
    descripcion?: string;
    urlImagen?: string;
    categoria?: string;
    Eventos?: Evento[];
}
export interface Evento {
    date: Date;
    eventName: string;
    description: string;
    horarioEvento: string;
    municipio: string;
    urlImagen?: string;
    organizador?: string;
    telefonoOrg?: string;
    emailOrg?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkWeb?: string;
}
