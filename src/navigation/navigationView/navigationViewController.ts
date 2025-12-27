/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import type { HostComponent } from 'react-native';
import { Commands, type NativeProps } from '../../NavViewNativeComponent';
import type { CameraPerspective, NavigationViewController } from './types';

type NavViewRef = React.ElementRef<HostComponent<NativeProps>>;

export const getNavigationViewController = (
  viewRef: NavViewRef
): NavigationViewController => {
  return {
    setNavigationUIEnabled: (isOn: boolean) => {
      Commands.setNavigationUIEnabled(viewRef, isOn);
    },

    setTripProgressBarEnabled: (isOn: boolean) => {
      Commands.setTripProgressBarEnabled(viewRef, isOn);
    },

    setReportIncidentButtonEnabled: (isOn: boolean) => {
      Commands.setReportIncidentButtonEnabled(viewRef, isOn);
    },

    setSpeedometerEnabled: (isOn: boolean) => {
      Commands.setSpeedometerEnabled(viewRef, isOn);
    },

    setSpeedLimitIconEnabled: (isOn: boolean) => {
      Commands.setSpeedLimitIconEnabled(viewRef, isOn);
    },

    setTrafficIncidentCardsEnabled: (isOn: boolean) => {
      Commands.setTrafficIncidentCardsEnabled(viewRef, isOn);
    },

    setHeaderEnabled: (isOn: boolean) => {
      Commands.setHeaderEnabled(viewRef, isOn);
    },

    setFooterEnabled: (isOn: boolean) => {
      Commands.setFooterEnabled(viewRef, isOn);
    },

    showRouteOverview: () => {
      Commands.showRouteOverview(viewRef);
    },

    /**
     * @deprecated Prefer the `navigationNightMode` prop on `NavigationView`.
     */
    setNightMode: (index: number) => {
      Commands.setNightMode(viewRef, index);
    },

    setRecenterButtonEnabled(isEnabled: boolean) {
      Commands.setRecenterButtonEnabled(viewRef, isEnabled);
    },

    setFollowingPerspective: (perspective: CameraPerspective) => {
      Commands.setFollowingPerspective(viewRef, perspective);
    },
  };
};
