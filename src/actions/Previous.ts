import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class PreviousAction extends SoapRequestBase {
    action = SOAP_ACTIONS.Previous;

    constructor() {
        super();
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:Previous': {
                InstanceID: 0,
            }
        }));
    }

}