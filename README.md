# Node Sonos API

This is a library for integrating NodeJS applications with Sonos in a convenient manner. It is also intended to be easily usable with react-native thanks to rn-nodeify and react-native-ssdp.

## Usage

```javascript
import { SonosAPI } from 'node-sonos-api'

const sonosApi = new SonosAPI()
await sonosApi.discoverDevices()
console.log(sonosApi.getDevices())
```

To control a particular device's attributes:

```javascript
const device = sonosApi.getDeviceByUUID('...')
device.setVolume(15)
device.setMute(true)
device.setSubEnable(false)
...
```

## Methods

### SonosAPI Class

`async discoverDevices(): void`

Discovers Sonos devices on the current WiFi network.

`getDevices(): SonosDevice[]`

Returns the *visible* Sonos devices previously discovered.

`getAllDevices(): SonosDevice[]`

Returns all devices previously discovered.

`getDeviceByUUID(uuid: string): SonosDevice | undefined`

Returns a device by Sonos UUID, usually of the form "RINCON_XXXXXXXXXXX"

`getDevice(findFn: (dev: SonosDevice) => boolean): SonosDevice | undefined`

Allows the user to implement a custom find function (`findFn`) to locate a device.

### SonosDevice Class

`async play(): void`

Sends the Play command to the device.

`async pause(): void`

Sends the Pause command to the device.

`async stop(): void`

Sends the Stop command to the device.

`async next(): void`

Sends the Next Track command to the device.

`async previous(): void`

Send the Previous Track command to the device.

`async setVolume(volume: number, /*relative = false*/): void`

Sends the Set Volume command to the device. Relative volumes are planned for a future version.

`async setMute(mute: boolean): void`

Sets the mute status of the device.

`async addToGroup(parent: SonosDevice | string): void`

Adds the device to the group (AVTransport) associated with the parent device, which can be specified by either SonosDevice instance or UUID string.

`async removeFromGroup(): void`

Removes the device from a current connected group.

`async setGroupVolume(volume: number, /*relative = false*/): void`

Sets the volume for the group (AVTransport) associated with the device. Relative volumes are planned for a future version.

`async setGroupMute(mute: boolean): void`

Sets the mute status of the group (AVTransport) associated with the device.

`async setSubEnable(subEnabled: boolean): void`

Sets the Subwoofer Enable for the device. Not applicable for invisible devices.

`async getZoneGroupState(): ZoneGroupStateData`

Returns the ZoneGroupState associated with the current ZoneGroup. While attached to a device, it returns the same value for every device in the ZoneGroup.

`async getZoneGroupAttributes(): ZoneGroupAttributeData`

Returns the ZoneGroupAttributes for the device.

## Acknowledgments

While not a direct fork of either, this library is based **heavily** off of the following:

- [node-sonos-http-api](https://github.com/jishi/node-sonos-http-api) by @Jishi
- [node-sonos-discovery](https://github.com/jishi/node-sonos-discovery) by @Jishi

## TODO

- Unit tests
- More robust error handling
- Event subscriptions/device state updating
- Relative volume setting
- More subwoofer controls