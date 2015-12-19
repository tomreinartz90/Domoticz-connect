import {Component, View} from 'angular2/core';
import {DomoticzService} from "../../services/domoticzService/domoticzService";
import {DeviceList} from "../../components/deviceList/deviceList";

@Component({
  selector: 'home-route'
})
@View({
  templateUrl: 'devicesRoute.tpl.html',
  directives: [DeviceList]
})
export class DevicesRoute {
  private domoticzSerivice:DomoticzService;
  public plans:any = [];
  public devices:any = [];

  constructor(domserv:DomoticzService) {
    this.domoticzSerivice = domserv;
    this.getDevices();
  }

  getDevices () {
    var _this = this;
    this.domoticzSerivice.getAllDevices().subscribe(function(res){
      _this.devices = res.json().result;
      console.log(res.json().result);
    })
  }

  getPlans () {
    this.domoticzSerivice.getAllPlans().subscribe(function(res){
      this.plans = res.json();
    })
  }

  getDevicesForPlan () {

  }
}