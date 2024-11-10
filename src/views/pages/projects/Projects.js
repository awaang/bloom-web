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
    title: 'Impact of Exercise on Mental Health',
    description: 'A study examining the correlation between regular physical activity and mental well-being in adults aged 25-40.',
    image: 'https://transform.octanecdn.com/crop/1000x600/https://octanecdn.com/prolianceorthopedicassociatescom/run-or-walk-1-1.jpg',
  },
  {
    id: 2,
    title: 'Sleep and Athletic Performance Correlation',
    description: 'Analyzing the effects of sleep patterns on performance, recovery, and injury rates, helping to develop sleep guidelines for athletes.',
    image: 'https://images.ctfassets.net/pxcfulgsd9e2/articleImage193689/7f23b43315caadc99d698e9bfaf3b1b8/How-to-get-a-good-nights-sleep-HN2883-iStock-1319025775-Sized.jpg?f=top&fit=fill&fl=progressive&fm=jpg&h=786&q=85&w=1396',
  },
  {
    id: 3,
    title: 'Gender Differences in Athletic Performance',
    description: 'Understanding the impact of biological sex on various health and performance metrics to optimize training and competition practices for men and women.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Murray_and_Williams_Wimbledon_2019.jpg/640px-Murray_and_Williams_Wimbledon_2019.jpg',
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
