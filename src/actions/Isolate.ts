import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class IsolateAction extends SoapRequestBase {
    action = SOAP_ACTIONS.BecomeCoordinatorOfStandaloneGroup;

    constructor() {
        super();
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:BecomeCoordinatorOfStandaloneGroup': {
                InstanceID: 0,
            }
        }));
    }

}