import { DomoticzService } from "../../services/domoticzService/domoticzService";
export declare class HomeRoute {
    private domoticzSerivice;
    plans: any;
    devicesByPlan: any;
    devices: any;
    activePlan: any;
    constructor(domserv: DomoticzService);
    getDevices(): void;
    getPlans(): void;
    setActivePlan(idx: any): any[];
    getDevicesForPlan(plan: any): void;
}
