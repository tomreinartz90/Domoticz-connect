import {Component, View} from 'angular2/core';

@Component({
  selector: 'settings-route'
})
@View({
  templateUrl: 'settingsRoute.tpl.html'
})
export class SettingsRoute{
  text: string = "Peter";
}