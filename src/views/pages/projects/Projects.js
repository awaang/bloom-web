// Projects.js

import React from 'react';
import { Link } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CButton,
} from '@coreui/react';

// Mock data (you can replace this with your fetched data later)
const projects = [
  {
    id: 1,
    title: 'Injury Prevention and Recovery Optimization',
    description: 'Identifying patterns and risk factors for sports injuries across different athlete profiles, allowing for tailored prevention and recovery protocols',
    image: 'https://via.placeholder.com/600x400',
  },
  {
    id: 2,
    title: 'Sleep and Athletic Performance Correlation',
    description: 'Analyzing the effects of sleep patterns on performance, recovery, and injury rates, helping to develop sleep guidelines for athletes.',
    image: 'https://via.placeholder.com/600x400',
  },
  {
    id: 3,
    title: 'Gender Differences in Athletic Performance',
    description: 'Understanding the impact of biological sex on various health and performance metrics to optimize training and competition practices for men and women.',
    image: 'https://via.placeholder.com/600x400',
  },
  // Add more projects as needed
];

const Projects = () => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {projects.map((project) => (
        <CCard key={project.id} style={{ width: '18rem', margin: '1rem' }}>
          {project.image && (
            <CCardImage orientation="top" src={project.image} alt={project.title} />
          )}
          <CCardBody>
            <CCardTitle>{project.title}</CCardTitle>
            <CCardText>{project.description}</CCardText>
            <Link to={`/projects/${project.id}`}>
              <CButton color="primary">View Project</CButton>
            </Link>
          </CCardBody>
        </CCard>
      ))}
    </div>
  );
};

export default Projects;
