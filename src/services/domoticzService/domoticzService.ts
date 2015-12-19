import {Http, Headers, Jsonp} from 'angular2/http';
import {Component} from "angular2/core";
import {Response} from "angular2/http";
import {Observable} from 'rxjs/Observable';

@Component({
    providers: [Jsonp]
})

export class DomoticzService {
    private username:string = 'test';
    private password:string = 'test';
    private domoticzAdress:string = 'http://192.168.1.3:8080';
    private jsonpCb = "&jsoncallback=JSONP_CALLBACK";
    private jsonp:Jsonp;
    private headers:Headers;

    constructor (jsonp:Jsonp) {
        console.log('starting service');
        this.jsonp = jsonp;
    }

    // todo get header send with request
    getAuthHeader () {
        var authHeader = this.getAuthorizationHeader();
        return new Headers({'Authorization' : authHeader});
    }

    getAuthorizationHeader () {
        return "Basic " + window.btoa(this.username + ":" + this.password);
    }

    getAllDevices():Observable<Response> {
        console.log('getting devices');
        console.log(this.getAuthorizationHeader());
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=devices&filter=all&used=true&order=Name' + this.jsonpCb, { headers: this.getAuthHeader() });
    }

    getAllScenes():Observable<Response> {
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=scenes' + this.jsonpCb, {headers: this.getAuthHeader()});
    }

    getAllPlans():Observable<Response> {
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=plans' + this.jsonpCb, {headers: this.getAuthHeader()});
    }

    getDevicesByPlan(planId:number):Observable<Response> {
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=devices&filter=all&used=true&order=Name&plan=' + planId  + this.jsonpCb, {headers: this.getAuthHeader()});
    }

    /*
     ** switchToState
     * @param switchId:string idx of switch
     * @param command:string 'On' or 'Off'
     */
    switchToState(switchId:string, command:string):Observable<Response>{
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=command&param=switchlight&idx=' + switchId +
            '&switchcmd=' + command + this.jsonpCb,
            {headers: this.headers}
        )
    }

    /*
     ** switchToState
     * @param sceneId:string idx of scene
     * @param command:string 'On' or 'Off'
     */
    switchSceneToState(sceneId:string, command:string):Observable<Response>{
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=command&param=switchscene&idx=' + sceneId +
            '&switchcmd=' + command + this.jsonpCb,
            {headers: this.headers}
        )
    }

    /*
     ** dimLightToLevel
     * @param switchId:string idx of switch
     * @param command:string 'On' or 'Off'
     */
    dimLightToLevel(switchId:string, level:string):Observable<Response>{
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=command&param=switchlight&idx='+ switchId +
            '&switchcmd=Set%20Level&level=' + level + this.jsonpCb,
            {headers: this.headers}
        )
    }

}