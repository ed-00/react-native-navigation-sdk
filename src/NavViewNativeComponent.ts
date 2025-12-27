import type { ViewProps, CodegenTypes } from 'react-native';

// Removed deep import
// Using CodegenTypes from 'react-native' (below)
import type { HostComponent } from 'react-native';
import { codegenNativeCommands, codegenNativeComponent } from 'react-native';
// Explicitly defined types for Codegen compatibility
// We inline everything to avoid "Unable to determine event type" errors from Codegen parsers.

export interface NativeProps extends ViewProps {
    flex?: CodegenTypes.WithDefault<CodegenTypes.Double, 1.0>;

    mapOptions?: Readonly<{
        mapViewType?: CodegenTypes.Int32;
        mapId?: string;
        navigationStylingOptions?: Readonly<{}>;
        mapColorScheme?: CodegenTypes.Int32;
        navigationNightMode?: CodegenTypes.Int32;
    }>;

    onMapReady?: CodegenTypes.DirectEventHandler<null>;
    onMapClick?: CodegenTypes.DirectEventHandler<Readonly<{
        latitude: CodegenTypes.Double;
        longitude: CodegenTypes.Double;
    }>>;
    onMarkerClick?: CodegenTypes.DirectEventHandler<Readonly<{
        id?: string;
        position?: Readonly<{
            latitude: CodegenTypes.Double;
            longitude: CodegenTypes.Double;
        }>;
        title?: string;
        snippet?: string;
    }>>;
    onPolylineClick?: CodegenTypes.DirectEventHandler<Readonly<{ id?: string }>>;
    onPolygonClick?: CodegenTypes.DirectEventHandler<Readonly<{ id?: string }>>;
    onCircleClick?: CodegenTypes.DirectEventHandler<Readonly<{ id?: string }>>;
    onGroundOverlayClick?: CodegenTypes.DirectEventHandler<Readonly<{ id?: string }>>;
    onMarkerInfoWindowTapped?: CodegenTypes.DirectEventHandler<Readonly<{
        id?: string;
        position?: Readonly<{
            latitude: CodegenTypes.Double;
            longitude: CodegenTypes.Double;
        }>;
        title?: string;
        snippet?: string;
    }>>;
    onRecenterButtonClick?: CodegenTypes.DirectEventHandler<null>;
    onPromptVisibilityChanged?: CodegenTypes.DirectEventHandler<Readonly<{ visible: boolean }>>;
}

export interface NativeCommands {
    setNavigationUIEnabled: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>,
        enabled: boolean
    ) => void;
    setTripProgressBarEnabled: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>,
        enabled: boolean
    ) => void;
    setReportIncidentButtonEnabled: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>,
        enabled: boolean
    ) => void;
    setSpeedometerEnabled: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>,
        enabled: boolean
    ) => void;
    setSpeedLimitIconEnabled: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>,
        enabled: boolean
    ) => void;
    setTrafficIncidentCardsEnabled: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>,
        enabled: boolean
    ) => void;
    setHeaderEnabled: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>,
        enabled: boolean
    ) => void;
    setFooterEnabled: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>,
        enabled: boolean
    ) => void;
    showRouteOverview: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>
    ) => void;
    setNightMode: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>,
        index: CodegenTypes.Int32
    ) => void;
    setRecenterButtonEnabled: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>,
        enabled: boolean
    ) => void;
    setFollowingPerspective: (
        viewRef: React.ElementRef<HostComponent<NativeProps>>,
        perspective: CodegenTypes.Int32
    ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
    supportedCommands: [
        'setNavigationUIEnabled',
        'setTripProgressBarEnabled',
        'setReportIncidentButtonEnabled',
        'setSpeedometerEnabled',
        'setSpeedLimitIconEnabled',
        'setTrafficIncidentCardsEnabled',
        'setHeaderEnabled',
        'setFooterEnabled',
        'showRouteOverview',
        'setNightMode',
        'setRecenterButtonEnabled',
        'setFollowingPerspective',
    ],
});

import { requireNativeComponent } from 'react-native';
// export default codegenNativeComponent<NativeProps>('NavViewManager');
export default requireNativeComponent<NativeProps>('NavViewManager');

