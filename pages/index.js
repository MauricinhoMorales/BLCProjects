import React from 'react';
import TaskDataView from '../components/taskDataView';

export default function HomePage() {

return (
  <>
    <TaskDataView 
      nombreTarea="Descomposicion en Tablas" 
      nombreResponsable="Mauricio Morales"
      fechaEntrega="24 de Abril de 2020"
      nombreProyecto="Apollo 11"
      estadoProyecto="In Progress"
      descripcionTarea=" Esta es una mision para ir al espacio descomponiendo tablas, Gran idea no?"
      />
  </>
);
}
