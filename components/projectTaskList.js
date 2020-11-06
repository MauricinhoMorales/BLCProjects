import React from 'react';
import { FlexboxGrid, Input } from 'rsuite';
import ProjectSection from './projectSection';

export default function ProjectTaskList(props) {
  return (
    <>
      <div>
        <ProjectSection />
      </div>
      <FlexboxGrid fluid>
        <FlexboxGrid.Item colspan={24}>
          <Input style={{ width: '100%' }} placeholder="Nueva Sección..." />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
