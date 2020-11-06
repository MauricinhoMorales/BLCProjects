import React from 'react';
import { FlexboxGrid } from 'rsuite';
import TaskListHeader from '../components/TaskListHeader';
import NewTask from '../components/newTask';
import ProjectTaskItem from '../components/projectTaskItem';

export default function ProjectSection(props) {
  return (
    <>
      <FlexboxGrid fluid>
        <TaskListHeader section={props.nombre} />
        <ProjectTaskItem />
        <NewTask />
      </FlexboxGrid>
    </>
  );
}
