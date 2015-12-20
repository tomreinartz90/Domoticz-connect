var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('angular2/http');
var core_1 = require("angular2/core");
var DomoticzService = (function () {
    function DomoticzService(jsonp) {
        this.username = 'test';
        this.password = 'test';
        this.domoticzAdress = 'http://192.168.1.3:8080';
        this.jsonpCb = "&jsoncallback=JSONP_CALLBACK";
        console.log('starting service');
        this.jsonp = jsonp;
        this.getSettingsFromLocalStorage();
    }
    DomoticzService.prototype.getSettingsFromLocalStorage = function () {
        var settings = JSON.parse(localStorage.getItem('settings'));
        if (settings !== null) {
            this.username = settings.username;
            this.password = settings.password;
            this.domoticzAdress = settings.url;
        }
    };
    DomoticzService.prototype.setUserNameAndPassword = function (url, username, password) {
        this.domoticzAdress = url;
        this.username = username;
        this.password = password;
    };
    // todo get header send with request
    DomoticzService.prototype.getAuthHeader = function () {
        var authHeader = this.getAuthorizationHeader();
        return new http_1.Headers({ 'Authorization': authHeader });
    };
    DomoticzService.prototype.getAuthorizationHeader = function () {
        return "Basic " + window.btoa(this.username + ":" + this.password);
    };
    DomoticzService.prototype.getVersion = function () {
        //http://nas.tomreinartz.com:81/json.htm?type=command&param=getversion
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=command&param=getversion' + this.jsonpCb, { headers: this.getAuthHeader() });
    };
    DomoticzService.prototype.getAllDevices = function () {
        console.log('getting devices');
        console.log(this.getAuthorizationHeader());
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=devices&filter=all&used=true&order=Name' + this.jsonpCb, { headers: this.getAuthHeader() });
    };
    DomoticzService.prototype.getAllScenes = function () {
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=scenes' + this.jsonpCb, { headers: this.getAuthHeader() });
    };
    DomoticzService.prototype.getAllPlans = function () {
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=plans' + this.jsonpCb, { headers: this.getAuthHeader() });
    };
    DomoticzService.prototype.getDevicesByPlan = function (planId) {
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=devices&filter=all&used=true&order=Name&plan=' + planId + this.jsonpCb, { headers: this.getAuthHeader() });
    };
    /*
     ** switchToState
     * @param switchId:string idx of switch
     * @param command:string 'On' or 'Off'
     */
    DomoticzService.prototype.switchToState = function (switchId, command) {
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=command&param=switchlight&idx=' + switchId +
            '&switchcmd=' + command + this.jsonpCb, { headers: this.headers });
    };
    /*
     ** switchToState
     * @param sceneId:string idx of scene
     * @param command:string 'On' or 'Off'
     */
    DomoticzService.prototype.switchSceneToState = function (sceneId, command) {
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=command&param=switchscene&idx=' + sceneId +
            '&switchcmd=' + command + this.jsonpCb, { headers: this.headers });
    };
    /*
     ** dimLightToLevel
     * @param switchId:string idx of switch
     * @param command:string 'On' or 'Off'
     */
    DomoticzService.prototype.dimLightToLevel = function (switchId, level) {
        return this.jsonp.get(this.domoticzAdress + '/json.htm?type=command&param=switchlight&idx=' + switchId +
            '&switchcmd=Set%20Level&level=' + level + this.jsonpCb, { headers: this.headers });
    };
    DomoticzService = __decorate([
        core_1.Component({
            providers: [http_1.Jsonp]
        }), 
        __metadata('design:paramtypes', [http_1.Jsonp])
    ], DomoticzService);
    return DomoticzService;
})();
exports.DomoticzService = DomoticzService;

//# sourceMappingURL=domoticzService.js.map
