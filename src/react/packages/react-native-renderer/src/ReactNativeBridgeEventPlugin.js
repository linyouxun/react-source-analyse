/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { AnyNativeEvent } from "react-events/PluginModuleType";
import {
  accumulateTwoPhaseDispatches,
  accumulateDirectDispatches,
} from "react-events/EventPropagators";
import type { TopLevelType } from "react-events/TopLevelEventTypes";
import {
  customBubblingEventTypes,
  customDirectEventTypes,
  eventTypes,
} from "ReactNativeViewConfigRegistry";
import SyntheticEvent from "react-events/SyntheticEvent";
import invariant from "shared/invariant";

const ReactNativeBridgeEventPlugin = {
  eventTypes: eventTypes,

  /**
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function (
    topLevelType: TopLevelType,
    targetInst: null | Object,
    nativeEvent: AnyNativeEvent,
    nativeEventTarget: Object
  ): ?Object {
    if (targetInst == null) {
      // Probably a node belonging to another renderer's tree.
      return null;
    }
    const bubbleDispatchConfig = customBubblingEventTypes[topLevelType];
    const directDispatchConfig = customDirectEventTypes[topLevelType];
    invariant(
      bubbleDispatchConfig || directDispatchConfig,
      'Unsupported top level event type "%s" dispatched',
      topLevelType
    );
    const event = SyntheticEvent.getPooled(
      bubbleDispatchConfig || directDispatchConfig,
      targetInst,
      nativeEvent,
      nativeEventTarget
    );
    if (bubbleDispatchConfig) {
      accumulateTwoPhaseDispatches(event);
    } else if (directDispatchConfig) {
      accumulateDirectDispatches(event);
    } else {
      return null;
    }
    return event;
  },
};

export default ReactNativeBridgeEventPlugin;
