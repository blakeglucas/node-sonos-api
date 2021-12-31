import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class GroupVolumeAction extends SoapRequestBase {
    action = SOAP_ACTIONS.GroupVolume;

    private readonly volume: number;

    constructor(volume: number) {
        super();
        this.volume = volume;
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:SetGroupVolume': {
                InstanceID: 0,
                Channel: 'Master',
                DesiredVolume: this.volume,
            }
        }));
    }

}