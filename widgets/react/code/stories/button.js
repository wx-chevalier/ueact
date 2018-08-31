import React from 'react';
import { storiesOf } from '@storybook/react';
import BlueWhiteRaisedButton from '../src/picker/button/raised/blue_white_raised_button';
import BlueBorderRaisedButton from '../src/picker/button/raised/blue_border_raised_button';
import {
  StoryPanel,
  StoryTitle,
  Example
} from '../.storybook/decorator/stories';
import BlueLinkButton from '../src/picker/button/link/link_button';
import { DownloadIconLinkButton } from '../src/picker/button/link/download_icon_link_button';
import TipButton from '../src/picker/button/tip/tip_button';

storiesOf('Button', module)
  .add('Raised Button', () => {
    return (
      <StoryPanel>
        <StoryTitle label="Raised Button" description="用于显示主操作按钮" />
        <Example label="BlueWhiteRaisedButton">
          <BlueWhiteRaisedButton label="王下邀月熊" />

          <BlueWhiteRaisedButton label="王下邀月熊" reverse />
        </Example>

        <Example label="BlueBorderRaisedButton">
          <BlueBorderRaisedButton label="王下邀月熊" />
        </Example>
      </StoryPanel>
    );
  })
  .add('Link Button', () => {
    return (
      <StoryPanel>
        <StoryTitle label="Link Button" description="用于显示次级操作按钮" />
        <Example label="BlueLinkButton">
          <BlueLinkButton />
        </Example>
        <Example label="DownloadIconLinkButton">
          <DownloadIconLinkButton />
        </Example>
        <Example>
          <div>
            <TipButton />
          </div>
          <div>
            <TipButton tipPosition="top" tip="我在上面" />
          </div>
        </Example>
      </StoryPanel>
    );
  });
