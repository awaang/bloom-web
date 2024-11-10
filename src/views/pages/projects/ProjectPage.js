// ProjectPage.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
} from '@coreui/react';

// Mock data (same as in Projects.js)
const projects = [
  {
    id: 1,
    title: 'Project One',
    fullDescription: 'This is a detailed description of Project One.',
    image: 'https://via.placeholder.com/600x400',
  },
  {
    id: 2,
    title: 'Project Two',
    fullDescription: 'This is a detailed description of Project Two.',
    image: 'https://via.placeholder.com/600x400',
  },
  {
    id: 3,
    title: 'Project Three',
    fullDescription: 'This is a detailed description of Project Three.',
    image: 'https://via.placeholder.com/600x400',
  },
  // Add more mock projects as needed
];

const ProjectPage = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <CCard className="mb-4">
      {project.image && (
        <CCardImage orientation="top" src={project.image} alt={project.title} />
      )}
      <CCardBody>
        <CCardTitle>{project.title}</CCardTitle>
        <CCardText>{project.fullDescription}</CCardText>
        <Link to="/projects/all">
          <CButton color="secondary">Back to Projects</CButton>
        </Link>
      </CCardBody>
    </CCard>
  );
};

export default ProjectPage;