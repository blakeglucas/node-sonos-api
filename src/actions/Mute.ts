import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class MuteAction extends SoapRequestBase {
    action = SOAP_ACTIONS.Mute;

    private readonly mute: boolean;

    constructor(mute: boolean) {
        super();
        this.mute = mute;
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:SetMute': {
                InstanceID: 0,
                Channel: 'Master',
                DesiredMute: this.mute,
            }
        }));
    }

}