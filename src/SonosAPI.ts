import axios from 'axios'
import { Client } from 'node-ssdp';
import { XMLParser } from 'fast-xml-parser'
import { SonosDevice } from './SonosDevice';

const xmlFetch = axios.create({})

export interface SonosAPIOptions {
  discoverTimeoutMs?: number
  sonosSearchURN?: string
}

export class SonosAPI {
  static defaultOptions: Required<SonosAPIOptions> = {
    discoverTimeoutMs: 5000,
    sonosSearchURN: 'urn:schemas-upnp-org:device:ZonePlayer:1'
  }

  zoneGroupTopology: any;

  private readonly client: Client;
  private devices: SonosDevice[] = []
  private options: Required<SonosAPIOptions>;
  parser = new XMLParser();

  constructor(options?: SonosAPIOptions) {
    this.options = {
      ...SonosAPI.defaultOptions,
      ...(options || {}),
    }
    this.client = new Client;
  }

  async discoverDevices() {
    this.client.on('response', async (headers, _, rinfo) => {
      if (!headers.LOCATION) {
        return;
      }
      const response = await xmlFetch.get(headers.LOCATION)
      const data = this.parser.parse(response.data)
      const uuid = (headers.USN?.match(/(?:uuid:)(RINCON_\w+)(?::)/) || ['', ''])[1]
      this.devices.push(new SonosDevice(
        uuid,
        rinfo.address,
        headers.LOCATION,
        data.root.device.displayName,
        data.root.device,
      ))
    })
    this.client.search(this.options.sonosSearchURN)
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), this.options.discoverTimeoutMs)
    })
    this.client.stop()
  }

  getDevices() {
    return this.devices.filter(dev => dev.invisible === false);
  }

  getAllDevices() {
    return this.devices
  }

  getDeviceByUUID(uuid: string) {
    return this.devices.find(dev => dev.uuid === uuid)
  }

  getDevice(findFn: (dev: SonosDevice) => boolean) {
    return this.devices.find(findFn)
  }
}