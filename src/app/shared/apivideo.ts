import {SafeResourceUrl} from "@angular/platform-browser";

export interface APIVideo {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    safeURL?: SafeResourceUrl;
    site: string;
    size: number;
    type: string;
}
