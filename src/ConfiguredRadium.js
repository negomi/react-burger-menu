'use strict';

import Radium from 'radium';
import prefixAll from 'radium-plugin-prefix-all';

export default (component) => {
  return Radium({
    plugins: [
      Radium.Plugins.mergeStyleArray,
      Radium.Plugins.checkProps,
      Radium.Plugins.resolveMediaQueries,
      Radium.Plugins.resolveInteractionStyles,
      prefixAll,
      Radium.Plugins.checkProps
    ]
  })(component);
};
