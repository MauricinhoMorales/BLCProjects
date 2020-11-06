import React from 'react';
import {
  ThemeProvider,
  ChatList,
  ChatListItem,
  Avatar,
  Column,
  Row,
  Title,
  Subtitle,
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

export default function IndividualChatList(props) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ChatList style={{ width: '100%' }}>
          <ChatListItem active style={{ width: '100%' }}>
            <Avatar letter="J" />
            <Column fill>
              <Row justify>
                <Title ellipsis>{'Andrew'}</Title>
                <Subtitle nowrap>{'14:31 PM'}</Subtitle>
              </Row>
              <Subtitle ellipsis>{'actually I just emailed you back'}</Subtitle>
            </Column>
          </ChatListItem>
        </ChatList>
      </ThemeProvider>
    </>
  );
}
