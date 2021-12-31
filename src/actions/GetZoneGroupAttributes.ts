import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class GetZoneGroupAttributesAction extends SoapRequestBase {
    action = SOAP_ACTIONS.GetZoneGroupAttributes;

    constructor() {
        super();
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:GetZoneGroupAttribtues': {
                InstanceID: 0,
            }
        }));
    }

}