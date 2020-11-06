import React from 'react';
import {
  ThemeProvider,
  FixedWrapper,
  Avatar,
  Message,
  MessageButtons,
  MessageButton,
  MessageGroup,
  MessageList,
  MessageMedia,
  MessageText,
  MessageTitle,
  MessageListItem,
  TextComposer,
  Row,
  Column,
  IconButton,
  AddIcon,
  TextInput,
  SendIcon,
  SendButton,
  EmojiIcon,
  TitleBar,
  CloseIcon,
} from '@livechat/ui-kit';

const theme = {
  vars: {
    'primary-color': '#427fe1',
    'secondary-color': '#fbfbfb',
    'tertiary-color': '#fff',
    'avatar-border-color': 'blue',
  },
  AgentBar: {
    Avatar: {
      size: '42px',
    },
    css: {
      backgroundColor: 'var(--secondary-color)',
      borderColor: 'var(--avatar-border-color)',
    },
  },
  Message: {
    css: {
      fontWeight: 'bold',
    },
  },
};

export default function ChatRoom(props) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <FixedWrapper.Root>
          <FixedWrapper.Maximized>
            <TitleBar
              title="Chat with us!"
              rightIcons={[
                <IconButton key="close">
                  <CloseIcon />
                </IconButton>,
              ]}
            />
            <MessageList active>
              <MessageGroup
                avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
                onlyFirstWithMeta>
                <Message authorName="Jon Smith" date="21:37" showMetaOnClick>
                  <MessageMedia>
                    <img src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png" />
                  </MessageMedia>
                </Message>
                <Message authorName="Jon Smith" date="21:37">
                  <MessageTitle title="Message title" subtitle="24h" />
                  <MessageMedia>
                    <img src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png" />
                  </MessageMedia>
                  <MessageText>
                    The fastest way to help your customers - start chatting with
                    visitors
                  </MessageText>
                  <MessageButtons>
                    <MessageButton label="View more" primary />
                    <MessageButton label="Cancel" />
                  </MessageButtons>
                  <MessageText>
                    The fastest way to help your customers - start chatting with
                    visitors who need your help using a free 30-day trial.
                  </MessageText>
                  <MessageButtons>
                    <MessageButton label="View more" primary />
                    <MessageButton label="Cancel" />
                  </MessageButtons>
                </Message>
                <Message date="21:38" authorName="Jon Smith">
                  <MessageText>Hi! I would like to buy those shoes</MessageText>
                </Message>
              </MessageGroup>
              <MessageGroup onlyFirstWithMeta>
                <Message date="21:38" isOwn={true} authorName="Visitor">
                  <MessageText>
                    I love them
                    sooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                    much!
                  </MessageText>
                </Message>
                <Message date="21:38" isOwn={true} authorName="Visitor">
                  <MessageText>This helps me a lot</MessageText>
                </Message>
              </MessageGroup>
              <MessageGroup
                avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
                onlyFirstWithMeta>
                <Message authorName="Jon Smith" date="21:37">
                  <MessageText>No problem!</MessageText>
                </Message>
                <Message
                  authorName="Jon Smith"
                  imageUrl="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"
                  date="21:39">
                  <MessageText>
                    The fastest way to help your customers - start chatting with
                    visitors who need your help using a free 30-day trial.
                  </MessageText>
                </Message>
                <Message authorName="Jon Smith" date="21:39">
                  <MessageMedia>
                    <img src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png" />
                  </MessageMedia>
                </Message>
              </MessageGroup>
            </MessageList>
            <TextComposer defaultValue="Hello, can you help me?">
              <Row align="center">
                <IconButton fit>
                  <AddIcon />
                </IconButton>
                <TextInput fill />
                <SendButton fit />
              </Row>

              <Row verticalAlign="center" justify="right">
                <IconButton fit>
                  <EmojiIcon />
                </IconButton>
              </Row>
            </TextComposer>
          </FixedWrapper.Maximized>
        </FixedWrapper.Root>
      </ThemeProvider>
    </>
  );
}
