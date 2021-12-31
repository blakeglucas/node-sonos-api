import { XMLBuilder } from "fast-xml-parser";
import { SOAP_ACTIONS, SOAP_URLs } from "../types/soap";

export abstract class SoapRequestBase implements ISoapRequest {
    abstract action: SOAP_ACTIONS;
    abstract createRequestPayload(): string;

    protected xmlBuilder = new XMLBuilder({
        attributeNamePrefix: '@_', ignoreAttributes: false,
    })

    getUrl() {
        return SOAP_URLs[this.action];
    }

    // @ts-ignore
    protected wrapBodyObj(body: object): object {
        const bodyRootKey = Object.keys(body)[0]
        return {
            's:Envelope': {
                '@_xmlns:s': "http://schemas.xmlsoap.org/soap/envelope/",
                '@_s:encodingStyle': "http://schemas.xmlsoap.org/soap/encoding/",
                's:Body': {
                    ...body,
                    [bodyRootKey]: {
                        '@_xmlns:u': this.action.split('#')[0],
                        //@ts-ignore
                        ...body[bodyRootKey],
                    }
                },
            }
        }
    }
}

export interface ISoapRequest {
    action: SOAP_ACTIONS;

    createRequestPayload(...args: any[]): string;
}