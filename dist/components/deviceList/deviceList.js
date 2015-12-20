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
var deviceNameToMDIcon_1 = require("../../filters/deviceNameToMDIcon");
var domoticzService_1 = require("../../services/domoticzService/domoticzService");
var DeviceList = (function () {
    function DeviceList(domoticzService) {
        this.domoticzService = domoticzService;
        this.devices = [];
        console.log('list is ready');
    }
    DeviceList.prototype.ngOnChanges = function (changes) {
        if (typeof this.list == 'object')
            this.updateDeviceList(this.list);
    };
    DeviceList.prototype.updateDeviceList = function (devices) {
        var list = [];
        devices.forEach(function (device) {
            if (device.Type == "Scene") {
                device.Image = "Scene";
                device.Status = "Off";
            }
            if (device.Type == "General") {
                device.Protected = true;
            }
            if (device.Type == "Temp") {
                device.Protected = true;
                device.Image = "Temp";
            }
            list.push(device);
        });
        this.devices = list;
    };
    DeviceList.prototype.changeDeviceState = function (device) {
        if (device.Protected)
            return;
        var switchTo = "On";
        if (device.Status == "On")
            switchTo = "Off";
        console.log(device);
        //if device is a Scene
        if (device.Type == "Scene") {
        }
        else {
            //if device if something else
            this.domoticzService.switchToState(device.idx, switchTo).subscribe(function (response) {
                console.log(response.json());
                if (response.json().status == "OK")
                    device.Status = switchTo;
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DeviceList.prototype, "list", void 0);
    DeviceList = __decorate([
        core_1.Component({
            selector: 'device-list'
        }),
        core_1.View({
            template:'<div class=\"row\">\r\n    <!--<h4>Scenes</h4>-->\r\n    <div *ngFor=\"#scene of devices\" class=\"small-6 medium-6 large-4 columns device {{scene.Type}} protection-{{scene.Protected}}\"  (click)=\"changeDeviceState(scene)\" [hidden]=\"scene.Type != \'Scene\'\">\r\n        <div class=\"shadow row\">\r\n            <div class=\"small-4 columns md-icons icon status-{{scene.Status}} \" [hidden]=\"\">{{scene.Image | deviceNameToMDIcon}}</div>\r\n            <div class=\"small-8 columns\">\r\n                <h4 class=\"name\">{{scene.Name}}</h4>\r\n                <!--<h6 class=\"last-changed text-right\"><small>{{scene.LastUpdate}}</small></h6>-->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <!--<h4>Devices</h4>-->\r\n    <div *ngFor=\"#device of devices\" class=\"small-6 medium-4 large-3 columns device {{device.Type}} protection-{{device.Protected}}\"  (click)=\"changeDeviceState(device)\" [hidden]=\"device.Type == \'Scene\'\">\r\n        <div class=\"shadow\">\r\n            <div class=\"small-12 md-icons icon status-{{device.Status}} \" [hidden]=\"\">{{device.Image | deviceNameToMDIcon}}</div>\r\n            <h4 class=\"data text-center\">{{device.Name}}</h4>\r\n            <h5 class=\"name  text-center\"> {{device.Data}} </h5>\r\n            <h6 class=\"last-changed text-right\"><small>{{device.LastUpdate}}</small></h6>\r\n        </div>\r\n    </div>\r\n</div>\r\n',
            pipes: [deviceNameToMDIcon_1.DeviceNameToMDIcon]
        }), 
        __metadata('design:paramtypes', [domoticzService_1.DomoticzService])
    ], DeviceList);
    return DeviceList;
})();
exports.DeviceList = DeviceList;

//# sourceMappingURL=deviceList.js.map
