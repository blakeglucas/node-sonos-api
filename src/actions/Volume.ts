import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class VolumeAction extends SoapRequestBase {
    action = SOAP_ACTIONS.Volume;

    private readonly volume: number;

    constructor(volume: number) {
        super();
        this.volume = volume;
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:SetVolume': {
                InstanceID: 0,
                Channel: 'Master',
                DesiredVolume: this.volume,
            }
        }));
    }

}