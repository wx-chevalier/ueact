

import React from "react";
import { storiesOf } from '@storybook/react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import FinishedChip from "../src/picker/button/chip/finished_chip";
import ToggleChip from "../src/picker/button/chip/toggle_chip";

//加载 Chip
storiesOf("Chip", module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .add("FinishedChip", () => (
    <section>
      <FinishedChip />
      <br />
      <FinishedChip finished={true} />
    </section>
  ))
  .add("ToggleChip", () => {
    return (
      <section>
        <ToggleChip value={1} />
      </section>
    );
  });
