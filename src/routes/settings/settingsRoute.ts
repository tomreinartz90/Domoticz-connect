import {Component, View} from 'angular2/core';
import {DomoticzService} from "../../services/domoticzService/domoticzService";

@Component({
  selector: 'settings-route'
})
@View({
  templateUrl: 'settingsRoute.tpl.html'
})
export class SettingsRoute{
  url: string;
  username: string;
  password: string;
  model:any;
  status:any = {};

  constructor (private domsoticzService:DomoticzService) {
    this.model = {
      url: null,
      username: null,
      password: null
    };

    if(this.getSettings() !== null)
      this.model = this.getSettings();
  }

  getSettings() {
    return JSON.parse( localStorage.getItem('settings') );
  }

  storeSettings() {
    console.log(this.model);
    this.status.update = 'Checking connection....';
    var _this = this;
    //update username and password
    this.domsoticzService.setUserNameAndPassword(this.model.url, this.model.username, this.model.password);

    //test connection
    this.domsoticzService.getVersion().subscribe(function(response){
      //if connection is good then store settings
      if(response.json().Status = "OK") {
        _this.status = response;
        _this.status.update = 'Connected to Domoticz version: ' + response.json().version;
        localStorage.setItem('settings', JSON.stringify(_this.model));
      }
    }, function(error){
      _this.status.update = 'Could not connect, please check credentials';
    });
  }
}