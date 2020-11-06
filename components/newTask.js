import React from 'react';
import { FlexboxGrid, Input } from 'rsuite';

import '../styles/my-tasks.less';

export default function NewTask(props) {
  return (
    <>
      <FlexboxGrid.Item colspan={24}>
        <Input className="new-task-input" placeholder="+ Crear Tarea" />
      </FlexboxGrid.Item>
    </>
  );
}
