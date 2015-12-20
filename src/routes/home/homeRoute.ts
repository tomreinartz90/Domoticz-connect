import {Component, View} from 'angular2/core';
import {DomoticzService} from "../../services/domoticzService/domoticzService";
import {DeviceList} from "../../components/deviceList/deviceList";

@Component({
  selector: 'home-route'
})
@View({
  templateUrl: 'homeRoute.tpl.html',
  directives: [DeviceList]
})
export class HomeRoute {
  private domoticzSerivice:DomoticzService;
  public plans:any = [];
  public devicesByPlan:any = [];
  public devices:any = [];
  public activePlan:any = {meta: null};

  constructor(domserv:DomoticzService) {
    this.domoticzSerivice = domserv;
    this.getPlans();
  }

  getDevices () {
    var _this = this;
    this.domoticzSerivice.getAllDevices().subscribe(function(res){
      _this.devices = res.json().result;
    })
  }

  getPlans () {
    var _this = this;
    //get devices for the default plan
    this.getDevicesForPlan({
      idx: 0,
      Name: 'all'
    });
    this.domoticzSerivice.getAllPlans().subscribe(function(res){
      if(res.json().status == "OK"){
        _this.plans = res.json().result;
        _this.plans.forEach(function(plan:any){
          _this.getDevicesForPlan(plan);
        });

      } else {
        _this.getPlans();
      }

    })
  }

  setActivePlan (idx) {
    var activePlan = [];
    var _this = this;
    this.devicesByPlan.forEach(function(plan:any){
      if(plan.meta.idx == idx)
        _this.activePlan = plan;
    });
    return activePlan;
  }

  getDevicesForPlan (plan) {
    var _this = this;
    this.domoticzSerivice.getDevicesByPlan(plan.idx).subscribe(function(res){
      var mergedPlan = {
        meta: {},
        result: {}
      };
      if(res.json().status == "OK") {
        mergedPlan.meta = plan;
        mergedPlan.result = res.json().result;
        _this.devicesByPlan.push(mergedPlan);
        if(_this.activePlan.meta == null)
          _this.setActivePlan(plan.idx);

      }
    })
  }
}