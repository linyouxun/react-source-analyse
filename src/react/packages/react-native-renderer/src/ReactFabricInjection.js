/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import "./ReactNativeInjectionShared";

import {
  getFiberCurrentPropsFromNode,
  getInstanceFromNode,
  getNodeFromInstance,
} from "./ReactFabricComponentTree";
import { setComponentTree } from "react-events/EventPluginUtils";
import ReactFabricGlobalResponderHandler from "./ReactFabricGlobalResponderHandler";
import ResponderEventPlugin from "react-events/ResponderEventPlugin";

setComponentTree(
  getFiberCurrentPropsFromNode,
  getInstanceFromNode,
  getNodeFromInstance
);

ResponderEventPlugin.injection.injectGlobalResponderHandler(
  ReactFabricGlobalResponderHandler
);
