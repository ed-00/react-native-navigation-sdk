#ifdef RCT_NEW_ARCH_ENABLED
#import "RCTNavViewManagerComponentView.h"

#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <react/renderer/components/RNNavigationSdkSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNNavigationSdkSpec/EventEmitters.h>
#import <react/renderer/components/RNNavigationSdkSpec/Props.h>
#import <react/renderer/components/RNNavigationSdkSpec/RCTComponentViewHelpers.h>

#import "NavView.h"
#import "NavViewModule.h"
#import "NavViewController.h"

using namespace facebook::react;

@interface RCTNavViewManagerComponentView () <RCTNavViewManagerViewProtocol>
@end

@implementation RCTNavViewManagerComponentView {
    NavView *_view;
    BOOL _isInitialized;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<NavViewManagerComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const NavViewManagerProps>();
    _props = defaultProps;

    _view = [[NavView alloc] init];
    _isInitialized = NO;
    
    self.contentView = _view;
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps {
    const auto &newViewProps = *std::static_pointer_cast<NavViewManagerProps const>(props);

    if (!_isInitialized) {
        // Basic initialization
        int32_t mapViewTypeInt = newViewProps.mapOptions.mapViewType;
        MapViewType mapViewType = (MapViewType)mapViewTypeInt;
        
        NSString *mapId = nil;
        if (!newViewProps.mapOptions.mapId.empty()) {
            mapId = [NSString stringWithUTF8String:newViewProps.mapOptions.mapId.c_str()];
        }
        
        // Note: For now, we are skipping complex styling options conversion to ensure build stability.
        // If specific styling is needed, we will need to implement specific conversion logic.
        NSDictionary *stylingOptions = nil;
        NSNumber *colorScheme = nil;
        NSNumber *nightMode = nil;
        
        NavViewController *controller = [_view initializeViewControllerWithMapViewType:mapViewType
                                                                                 mapId:mapId
                                                                        stylingOptions:stylingOptions
                                                                        mapColorScheme:colorScheme
                                                                             nightMode:nightMode];
        
        if (controller) {
            _isInitialized = YES;
            
            // Register with NavViewModule for Legacy Commands Interop
            NavViewModule *module = [NavViewModule sharedInstance];
            if (module) {
                // Fabric views use NSInteger tag, but module uses NSNumber
                // We use self.tag (from UIView) which corresponds to the reactTag
                if (!module.viewControllers) {
                    module.viewControllers = [NSMapTable mapTableWithKeyOptions:NSPointerFunctionsStrongMemory
                                                                   valueOptions:NSPointerFunctionsWeakMemory];
                }
                [module.viewControllers setObject:controller forKey:@(self.tag)];
            }
        }
    } else {
        // Handle updates requiring re-initialization or property setting
        // For mapOptions updates that don't need re-init, implemented here
        
        // Example: Update Night Mode
        // We'd need to check changed props and call _view methods
    }

    [super updateProps:props oldProps:oldProps];
}

#pragma mark - RCTNavViewManagerViewProtocol

- (void)handleCommand:(nonnull NSString *)commandName args:(nonnull NSArray *)args
{
    // Forward commands to the legacy NavViewModule system
    // This implements the protocol requirement and maintains backward compatibility
    RCTNavViewManagerHandleCommand(self, commandName, args);
}

#pragma mark - Event Emitters

// Implement event forwarding if NavView exposes block properties. 
// Fabric handles events slightly differently, but we can hook into NavView's callbacks here if needed.
// For example:
// - (void)handleMapClick:(NSDictionary *)latLngMap {
//     if (_eventEmitter) {
//         std::static_pointer_cast<NavViewEventEmitter const>(_eventEmitter)->onMapClick(...);
//     }
// }

@end

Class<RCTComponentViewProtocol> RCTNavViewManagerCls(void)
{
  return RCTNavViewManagerComponentView.class;
}

#endif
