import axios, { AxiosInstance } from 'axios';
import { XMLParser } from 'fast-xml-parser';
import * as actions from './actions'
import { SOURCE_PREFIX } from './actions/SetAudioSource';
import { SoapRequestBase } from './utils/SoapRequest';

export class SonosDevice {
    readonly uuid: string;
    readonly ipAddress: string;
    readonly locationURL: string;
    readonly displayName: string;
    readonly metadata?: object;
    private readonly api: AxiosInstance;
    public invisible = false;

    constructor(uuid: string, ipAddress: string, locationURL: string, displayName: string, metadata?: object) {
        this.uuid = uuid;
        this.ipAddress = ipAddress;
        this.locationURL = locationURL;
        this.displayName = displayName;
        this.metadata = metadata
        this.api = axios.create({
            baseURL: `http://${this.ipAddress}:1400`,
            headers: {
                'content-type': 'application/xml',
            }
        })
        // TODO Better invisible mechanic
        // this.getZoneGroupAttributes().then(data => {
        //     this.invisible = !data.CurrentZoneGroupName;
        // })
    }

    private async invokeSoapRequest(request: SoapRequestBase) {
        const body = request.createRequestPayload()
        try {
            const response = await this.api.post(request.getUrl(), body, {
                headers: {
                    'SOAPACTION': request.action,
                }
            })
            return [response.headers, new XMLParser().parse(response.data)]
        } catch (e) {
            throw new Error('Unable to complete SOAP request')
        }

    }

    async play() {
        const [headers, data] = await this.invokeSoapRequest(new actions.PlayAction());
        console.log(headers, data)
    }

    async pause() {
        const [headers, data] = await this.invokeSoapRequest(new actions.PauseAction());
        console.log(headers, data)
    }

    async stop() {
        const [headers, data] = await this.invokeSoapRequest(new actions.StopAction());
        console.log(headers, data)
    }

    async next() {
        const [headers, data] = await this.invokeSoapRequest(new actions.NextAction());
        console.log(headers, data)
    }

    async previous() {
        const [headers, data] = await this.invokeSoapRequest(new actions.PreviousAction());
        console.log(headers, data)
    }

    async setVolume(volume: number, /*relative = false*/) {
        const [headers, data] = await this.invokeSoapRequest(new actions.VolumeAction(volume));
        console.log(headers, data)
    }

    async setMute(mute: boolean) {
        const [headers, data] = await this.invokeSoapRequest(new actions.MuteAction(mute));
        console.log(headers, data)
    }

    async addToGroup(parent: SonosDevice | string) {
        const [headers, data] = await this.invokeSoapRequest(new actions.GroupWithAction(parent));
        console.log(headers, data)
    }

    async removeFromGroup() {
        const [headers, data] = await this.invokeSoapRequest(new actions.IsolateAction());
        console.log(headers, data)
    }

    async setGroupVolume(volume: number, /*relative = false*/) {
        const [headers, data] = await this.invokeSoapRequest(new actions.GroupVolumeAction(volume));
        console.log(headers, data)
    }

    async setGroupMute(mute: boolean) {
        const [headers, data] = await this.invokeSoapRequest(new actions.GroupMuteAction(mute));
        console.log(headers, data)
    }

    async setSubEnable(subEnabled: boolean) {
        const [headers, data] = await this.invokeSoapRequest(new actions.SubEnableAction(subEnabled));
        console.log(headers, data)
    }

    async getZoneGroupState() {
        // @ts-ignore
        const [_, data] = await this.invokeSoapRequest(new actions.GetZoneGroupStateAction());
        const payload = data['s:Envelope']['s:Body']['u:GetZoneGroupStateResponse']['ZoneGroupState']
        const zoneGroupStateData = new XMLParser({ ignoreAttributes: false }).parse(payload)
        return zoneGroupStateData;
    }

    async getZoneGroupAttributes() {
        // @ts-ignore
        const [_, data] = await this.invokeSoapRequest(new actions.GetZoneGroupAttributesAction());
        const payload = data['s:Envelope']['s:Body']['u:GetZoneGroupAttributesResponse']
        return payload;
    }

    async setAudioSource(source: SonosDevice | string, sourcePrefix: SOURCE_PREFIX) {
        try {
        /*const [headers, data] = */await this.invokeSoapRequest(new actions.SetAudioSourceAction(source, sourcePrefix))
            // console.log(headers, data)
        } catch (e) {
            throw new Error('Could not switch device source. Probably an invalid sourcePrefix was specified for the source device type')
        }
    }
}