import { Headers, Jsonp } from 'angular2/http';
import { Response } from "angular2/http";
import { Observable } from 'rxjs/Observable';
export declare class DomoticzService {
    private username;
    private password;
    private domoticzAdress;
    private jsonpCb;
    private jsonp;
    private headers;
    constructor(jsonp: Jsonp);
    getAuthHeader(): Headers;
    getAuthorizationHeader(): string;
    getAllDevices(): Observable<Response>;
    getAllScenes(): Observable<Response>;
    getAllPlans(): Observable<Response>;
    getDevicesByPlan(planId: number): Observable<Response>;
    switchToState(switchId: string, command: string): Observable<Response>;
    switchSceneToState(sceneId: string, command: string): Observable<Response>;
    dimLightToLevel(switchId: string, level: string): Observable<Response>;
}
