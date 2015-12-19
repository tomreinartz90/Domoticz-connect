import {Component, View, Input} from 'angular2/core';
import {OnChanges} from "angular2/core";
import {DeviceNameToMDIcon} from "../../filters/deviceNameToMDIcon";
import {DomoticzService} from "../../services/domoticzService/domoticzService";

@Component({
  selector: 'device-list'
})
@View({
  templateUrl: 'deviceList.tpl.html',
  pipes: [DeviceNameToMDIcon]
})
export class DeviceList implements OnChanges {
  @Input() list:any[];
  public devices:any[];

  constructor (private domoticzService:DomoticzService) {
    this.devices = [];
    console.log('list is ready')
  }

  ngOnChanges(changes:{}):any {
    if(typeof this.list == 'object')
      this.updateDeviceList(this.list);
  }

  private  updateDeviceList (devices) {
    var list:any[] = [];
    devices.forEach(function(device:any){

      if(device.Type == "Scene"){
        device.Image = "Scene";
        device.Status = "Off";
      }

      if(device.Type == "General") {
        device.Protected = true;
      }

      if(device.Type == "Temp") {
        device.Protected = true;
        device.Image = "Temp";
      }

      list.push(device);
    });
    this.devices = list;
  }


  public changeDeviceState (device) {
    if(device.Protected) //used to disable interaction via app
      return;
    var switchTo = "On";
    if(device.Status == "On")
      switchTo = "Off";

    console.log(device);
//if device is a Scene
    if(device.Type == "Scene"){


    } else {
      //if device if something else

      this.domoticzService.switchToState(device.idx, switchTo).subscribe(function(response){
        console.log(response.json());
        if(response.json().status == "OK")
          device.Status = switchTo;
      });
    }
  }
}