import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class SubEnableAction extends SoapRequestBase {
    action = SOAP_ACTIONS.SetEQ;

    private readonly subEnabled: boolean;

    constructor(subEnabled: boolean) {
        super();
        this.subEnabled = subEnabled;
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:SetEQ': {
                InstanceID: 0,
                EQType: 'SubEnable',
                DesiredValue: this.subEnabled ? 1 : 0,
            }
        }));
    }

}