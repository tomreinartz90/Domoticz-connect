import { OnChanges } from "angular2/core";
import { DomoticzService } from "../../services/domoticzService/domoticzService";
export declare class DeviceList implements OnChanges {
    private domoticzService;
    list: any[];
    devices: any[];
    constructor(domoticzService: DomoticzService);
    ngOnChanges(changes: {}): any;
    private updateDeviceList(devices);
    changeDeviceState(device: any): void;
}
