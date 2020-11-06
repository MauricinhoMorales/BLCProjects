import React, { useState } from 'react';
import { Nav, FlexboxGrid } from 'rsuite';
import IndividualChatList from '../../../components/individualChatList';
import TeamChatList from '../../../components/teamChatList';
import ChatRoom from '../../../components/chatRoom';

export default function ConversationPage(props) {
  const [active, setActive] = useState('individual');

  const handleActive = (activeKey) => {
    setActive(activeKey);
  };

  return (
    <>
      <h3>Conversaciones</h3>
      <Nav appearance="subtle" activeKey={active} onSelect={handleActive}>
        <Nav.Item eventKey="individual">Individual</Nav.Item>
        <Nav.Item eventKey="teams">Equipos</Nav.Item>
      </Nav>
      <FlexboxGrid fluid>
        <FlexboxGrid.Item colspan={12}>
          {active === 'individual' ? <IndividualChatList /> : <TeamChatList />}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
          <ChatRoom />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
