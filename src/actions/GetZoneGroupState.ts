import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class GetZoneGroupStateAction extends SoapRequestBase {
    action = SOAP_ACTIONS.GetZoneGroupState;

    constructor() {
        super();
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:GetZoneGroupState': {
                InstanceID: 0,
            }
        }));
    }

}