import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class PauseAction extends SoapRequestBase {
    action = SOAP_ACTIONS.Pause;

    constructor() {
        super();
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:Pause': {
                InstanceID: 0,
            }
        }));
    }

}