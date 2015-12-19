import { DomoticzService } from "../../services/domoticzService/domoticzService";
export declare class DevicesRoute {
    private domoticzSerivice;
    plans: any;
    devices: any;
    constructor(domserv: DomoticzService);
    getDevices(): void;
    getPlans(): void;
    getDevicesForPlan(): void;
}
