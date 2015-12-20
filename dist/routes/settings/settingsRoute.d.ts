import { DomoticzService } from "../../services/domoticzService/domoticzService";
export declare class SettingsRoute {
    private domsoticzService;
    url: string;
    username: string;
    password: string;
    model: any;
    status: any;
    constructor(domsoticzService: DomoticzService);
    getSettings(): any;
    storeSettings(): void;
}
