var http_1 = require('angular2/http');
var DomoticzService = (function () {
    function DomoticzService(http) {
        this.username = 'admin';
        this.password = 'admin';
        this.domoticzAdress = 'http://192.168.1.3:8080';
        this.http = http;
        this.headers = new http_1.Headers();
        this.setAuthHeader();
        this.getAllDevices();
        console.log('starting service');
    }
    DomoticzService.prototype.setAuthHeader = function () {
        this.headers.append('Authorization', this.getAuthorizationHeader());
    };
    DomoticzService.prototype.getAuthorizationHeader = function () {
        return "Basic " + window.btoa(this.username + ":" + this.password);
    };
    DomoticzService.prototype.getAllDevices = function () {
        this.http.get(this.domoticzAdress + '/json.htm?type=devices&filter=all&used=true&order=Name', { headers: this.headers });
    };
    return DomoticzService;
})();
exports.DomoticzService = DomoticzService;

//# sourceMappingURL=domoticz.js.map
