import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class StopAction extends SoapRequestBase {
    action = SOAP_ACTIONS.Stop;

    constructor() {
        super();
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:Stop': {
                InstanceID: 0,
            }
        }));
    }

}