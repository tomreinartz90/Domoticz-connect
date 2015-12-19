import {Component, View} from 'angular2/core';

@Component({
  selector: 'my-component'
})
@View({
  templateUrl: 'mycomponent.tpl.html'
})
export class MyComponent{
  text: string = "Peter";
}