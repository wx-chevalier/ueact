

import { configure, setAddon } from '@storybook/react';

require('./decorator/stories.scss');

function loadStories() {
  require('../stories/showcase');
  // require('../stories/button');
  // require('../stories/menu');
  // require('../stories/card');
  // require('../stories/carousel');
  // require('../stories/chip');
  // require('../stories/dialog');
  // require('../stories/divider');
  // require('../stories/folder');
  // // require("../stories/form");
  // require('../stories/label');
  // // require("../stories/list");
  // require('../stories/pagination');
  // require('../stories/select');
  // require('../stories/shape');
  // require('../stories/tooltip');
  // require('../stories/tree');
  // require('../stories/upload');
}

configure(loadStories, module);
