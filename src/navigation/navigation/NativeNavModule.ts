import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { Double, Int32 } from 'react-native/Libraries/Types/CodegenTypesNamespace';

// Define types strictly for TurboModule
// Note: We might need to duplicate some types from other files if they aren't safe for Codegen import.

// Primitive aliases
type AudioGuidance = Int32;

// Structs
// For complex objects, we start with Object if the shape is dynamic or very deep,
// but ideally we detail them. For this pass, we will use Object for complex nested configs
// to ensure the TurboModule can be generated, and refine later.

export interface Spec extends TurboModule {
    initializeNavigator(
        termsAndConditionsDialogOptions: Object,
        taskRemovedBehavior: string // Enum as string in JS usually? Or int? Check usage. usage suggests enum, so likely Int32 or string.
    ): Promise<void>;

    cleanup(): Promise<void>;

    setDestination(
        waypoint: Object, // Waypoint struct
        routingOptions?: Object,
        displayOptions?: Object
    ): Promise<Object>; // Returns RouteStatus or similar

    setDestinations(
        waypoints: Object[],
        routingOptions?: Object,
        displayOptions?: Object
    ): Promise<Object>;

    continueToNextDestination(): Promise<Object>; // RouteStatus

    clearDestinations(): Promise<void>;

    startGuidance(): Promise<void>;
    stopGuidance(): Promise<void>;

    setSpeedAlertOptions(alertOptions: Object | null): Promise<void>;

    setAbnormalTerminatingReportingEnabled(enabled: boolean): void;

    setAudioGuidanceType(index: AudioGuidance): void;

    setBackgroundLocationUpdatesEnabled(isEnabled: boolean): void;

    setTurnByTurnLoggingEnabled(isEnabled: boolean): void;

    areTermsAccepted(): Promise<boolean>;

    getCurrentRouteSegment(): Promise<Object>; // RouteSegment

    getRouteSegments(): Promise<Object[]>; // RouteSegment[]

    getCurrentTimeAndDistance(): Promise<Object>; // TimeAndDistance

    getTraveledPath(): Promise<Object[]>; // LatLng[]

    getNavSDKVersion(): Promise<string>;

    stopUpdatingLocation(): void;
    startUpdatingLocation(): void;

    // Simulator methods
    simulateLocation(location: Object): void; // LatLng
    resumeLocationSimulation(): void;
    pauseLocationSimulation(): void;
    simulateLocationsAlongExistingRoute(speedMultiplier: Double): void;
    stopLocationSimulation(): void;
}

export default TurboModuleRegistry.get<Spec>('NavModule');
