import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class NextAction extends SoapRequestBase {
    action = SOAP_ACTIONS.Next;

    constructor() {
        super();
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:Next': {
                InstanceID: 0,
            }
        }));
    }

}