export enum SOAP_ACTIONS {
    Play = 'urn:schemas-upnp-org:service:AVTransport:1#Play',
    Pause = 'urn:schemas-upnp-org:service:AVTransport:1#Pause',
    Stop = 'urn:schemas-upnp-org:service:AVTransport:1#Stop',
    Next = 'urn:schemas-upnp-org:service:AVTransport:1#Next',
    Previous = 'urn:schemas-upnp-org:service:AVTransport:1#Previous',
    Mute = 'urn:schemas-upnp-org:service:RenderingControl:1#SetMute',
    GroupMute = 'urn:schemas-upnp-org:service:GroupRenderingControl:1#SetGroupMute',
    Volume = 'urn:schemas-upnp-org:service:RenderingControl:1#SetVolume',
    GroupVolume = 'urn:schemas-upnp-org:service:GroupRenderingControl:1#SetGroupVolume',
    SetAVTransportURI = 'urn:schemas-upnp-org:service:AVTransport:1#SetAVTransportURI',
    BecomeCoordinatorOfStandaloneGroup = 'urn:schemas-upnp-org:service:AVTransport:1#BecomeCoordinatorOfStandaloneGroup',
    SetEQ = 'urn:schemas-upnp-org:service:RenderingControl:1#SetEQ',
    GetZoneGroupState = 'urn:schemas-upnp-org:service:ZoneGroupTopology:1#GetZoneGroupState',
    GetZoneGroupAttributes = 'urn:schemas-upnp-org:service:ZoneGroupTopology:1#GetZoneGroupAttributes',
}

export const SOAP_URLs = {
    [SOAP_ACTIONS.Play]: '/MediaRenderer/AVTransport/Control',
    [SOAP_ACTIONS.Pause]: '/MediaRenderer/AVTransport/Control',
    [SOAP_ACTIONS.Stop]: '/MediaRenderer/AVTransport/Control',
    [SOAP_ACTIONS.Next]: '/MediaRenderer/AVTransport/Control',
    [SOAP_ACTIONS.Previous]: '/MediaRenderer/AVTransport/Control',
    [SOAP_ACTIONS.SetAVTransportURI]: '/MediaRenderer/AVTransport/Control',
    [SOAP_ACTIONS.BecomeCoordinatorOfStandaloneGroup]: '/MediaRenderer/AVTransport/Control',
    [SOAP_ACTIONS.Mute]: '/MediaRenderer/RenderingControl/Control',
    [SOAP_ACTIONS.Volume]: '/MediaRenderer/RenderingControl/Control',
    [SOAP_ACTIONS.SetEQ]: '/MediaRenderer/RenderingControl/Control',
    [SOAP_ACTIONS.GroupMute]: '/MediaRenderer/GroupRenderingControl/Control',
    [SOAP_ACTIONS.GroupVolume]: '/MediaRenderer/GroupRenderingControl/Control',
    [SOAP_ACTIONS.GetZoneGroupState]: '/ZoneGroupTopology/Control',
    [SOAP_ACTIONS.GetZoneGroupAttributes]: '/ZoneGroupTopology/Control',
}