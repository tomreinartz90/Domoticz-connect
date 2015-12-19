import { Http } from 'angular2/http';
export declare class DomoticzService {
    private username;
    private password;
    private domoticzAdress;
    private http;
    private headers;
    constructor(http: Http);
    setAuthHeader(): void;
    getAuthorizationHeader(): string;
    getAllDevices(): void;
}
