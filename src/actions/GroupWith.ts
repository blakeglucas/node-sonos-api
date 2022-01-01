import { SonosDevice } from "../SonosDevice";
import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class GroupWithAction extends SoapRequestBase {
    action = SOAP_ACTIONS.SetAVTransportURI;

    private readonly parentUUID: string;

    constructor(parent: SonosDevice | string) {
        super();
        if (typeof parent === 'string') {
            this.parentUUID = parent
        } else if (parent instanceof SonosDevice) {
            this.parentUUID = parent.uuid;
        } else {
            throw new Error('Invalid <parent> object');
        }
    }

    createRequestPayload(): string {
        const p = this.xmlBuilder.build(this.wrapBodyObj({
            'u:SetAVTransportURI': {
                InstanceID: 0,
                CurrentURI: `x-rincon:${this.parentUUID}`,
                CurrentURIMetaData: '',
            }
        }));
        console.log(p)
        return p
    }

}