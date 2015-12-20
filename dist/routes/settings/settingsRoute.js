var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var domoticzService_1 = require("../../services/domoticzService/domoticzService");
var SettingsRoute = (function () {
    function SettingsRoute(domsoticzService) {
        this.domsoticzService = domsoticzService;
        this.status = {};
        this.model = {
            url: null,
            username: null,
            password: null
        };
        if (this.getSettings() !== null)
            this.model = this.getSettings();
    }
    SettingsRoute.prototype.getSettings = function () {
        return JSON.parse(localStorage.getItem('settings'));
    };
    SettingsRoute.prototype.storeSettings = function () {
        console.log(this.model);
        this.status.update = 'Checking connection....';
        var _this = this;
        //update username and password
        this.domsoticzService.setUserNameAndPassword(this.model.url, this.model.username, this.model.password);
        //test connection
        this.domsoticzService.getVersion().subscribe(function (response) {
            //if connection is good then store settings
            if (response.json().Status = "OK") {
                _this.status = response;
                _this.status.update = 'Connected to Domoticz version: ' + response.json().version;
                localStorage.setItem('settings', JSON.stringify(_this.model));
            }
        }, function (error) {
            _this.status.update = 'Could not connect, please check credentials';
        });
    };
    SettingsRoute = __decorate([
        core_1.Component({
            selector: 'settings-route'
        }),
        core_1.View({
            template:'<div class=\"row\">\r\n    <form>\r\n        <div class=\"row\">\r\n            <div class=\"small-12 columns\">\r\n                <label>Domoticz Url\r\n                    <input type=\"url\" placeholder=\"http://192.168.1.192\" [(ngModel)]=\"model.url\"\r\n                           ngControl=\"url\">\r\n                </label>\r\n            </div>\r\n            <div class=\"small-12 columns\">\r\n                <label>User Name\r\n                    <input type=\"text\" placeholder=\"Username\" [(ngModel)]=\"model.username\"\r\n                           ngControl=\"username\">\r\n                </label>\r\n            </div>\r\n            <div class=\"small-12 columns\">\r\n                <label>Password\r\n                    <input type=\"password\" placeholder=\"Password\" [(ngModel)]=\"model.password\"\r\n                           ngControl=\"password\">\r\n                </label>\r\n            </div>\r\n        </div>\r\n        {{status.update}}\r\n        <div class=\"button expanded\" (click)=\"storeSettings()\">Test and save</div>\r\n    </form>\r\n</div>'
        }), 
        __metadata('design:paramtypes', [domoticzService_1.DomoticzService])
    ], SettingsRoute);
    return SettingsRoute;
})();
exports.SettingsRoute = SettingsRoute;

//# sourceMappingURL=settingsRoute.js.map
