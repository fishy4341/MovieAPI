import {APISearchResult} from "./apisearch-result";
import {APIDates} from "./apidates";

export interface APINowPlaying extends APISearchResult{
    dates: APIDates;
}
