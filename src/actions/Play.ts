import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export class PlayAction extends SoapRequestBase {
    action = SOAP_ACTIONS.Play;

    private readonly speed: number;

    constructor(speed = 1) {
        super();
        this.speed = speed;
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:Play': {
                InstanceID: 0,
                Speed: this.speed,
            }
        }));
    }

}