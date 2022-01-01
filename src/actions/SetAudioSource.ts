import { SonosDevice } from "..";
import { SOAP_ACTIONS } from "../types/soap";
import { SoapRequestBase } from "../utils/SoapRequest";

export enum SOURCE_PREFIX {
    DEVICE_IN = 'x-rincon-stream',
    HDMI_IN = 'x-sonos-htastream',
}

export class SetAudioSourceAction extends SoapRequestBase {
    action = SOAP_ACTIONS.SetAVTransportURI;

    source: string;
    sourcePrefix: SOURCE_PREFIX

    constructor(source: SonosDevice | string, sourcePrefix: SOURCE_PREFIX) {
        super();
        this.source = (source instanceof SonosDevice) ? source.uuid : source;
        this.sourcePrefix = sourcePrefix
    }

    createURI() {
        const postfix = this.sourcePrefix === SOURCE_PREFIX.HDMI_IN ? ':spdif' : ''
        return `${this.sourcePrefix}:${this.source}${postfix}`
    }

    createRequestPayload(): string {
        return this.xmlBuilder.build(this.wrapBodyObj({
            'u:SetAVTransportURI': {
                InstanceID: 0,
                CurrentURI: this.createURI(),
                CurrentURIMetaData: '',
            }
        }));
    }

}