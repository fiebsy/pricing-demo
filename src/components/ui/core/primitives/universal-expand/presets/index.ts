/**
 * Universal Expand - Preset Exports
 */

// Bottom-only (floating search bar, command menu)
export {
  BOTTOM_ONLY_PRESET,
  getBottomOnlyConfig,
} from './bottom-only'

// Vertical bidirectional (chat interface, question flow)
export {
  VERTICAL_BIDIRECTIONAL_PRESET,
  getVerticalBidirectionalConfig,
  CHAT_INTERFACE_PRESET,
  getChatInterfaceConfig,
} from './vertical-bidirectional'

// Side panels (left/right expansion)
export {
  RIGHT_PANEL_PRESET,
  getRightPanelConfig,
  LEFT_PANEL_PRESET,
  getLeftPanelConfig,
  HORIZONTAL_BIDIRECTIONAL_PRESET,
  getHorizontalBidirectionalConfig,
} from './side-panel'

// Multi-directional (L-shaped, T-shaped, quad)
export {
  L_SHAPED_TOP_RIGHT_PRESET,
  getLShapedTopRightConfig,
  L_SHAPED_BOTTOM_LEFT_PRESET,
  getLShapedBottomLeftConfig,
  T_SHAPED_PRESET,
  getTShapedConfig,
  QUAD_EXPANSION_PRESET,
  getQuadExpansionConfig,
} from './multi-directional'
