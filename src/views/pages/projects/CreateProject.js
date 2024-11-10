// CreateProject.js

import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CFormSelect,
} from '@coreui/react'

import { collection, addDoc } from 'firebase/firestore'

import { db } from './../../../backend/firebase';

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    dataRequirements: '',
    startDate: '',
    endDate: '',
    rewardAmount: '',
    studyType: '',
    researcherName: '',
    researcherEmail: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProjectData({
      ...projectData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Add a new document with a generated ID
      const docRef = await addDoc(collection(db, 'projects'), projectData);
      console.log('Document written with ID: ', docRef.id);
      // Optionally reset the form or redirect the user
      setProjectData({
        title: '',
        description: '',
        dataRequirements: '',
        startDate: '',
        endDate: '',
        rewardAmount: '',
        studyType: '',
        researcherName: '',
        researcherEmail: '',
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={8}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create New Research Project</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Project Title */}
              <div className="mb-3">
                <CFormLabel htmlFor="title">Project Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="title"
                  name="title"
                  value={projectData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  required
                />
              </div>

              {/* Project Description */}
              <div className="mb-3">
                <CFormLabel htmlFor="description">Project Description</CFormLabel>
                <CFormTextarea
                  id="description"
                  name="description"
                  value={projectData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe your project"
                  required
                ></CFormTextarea>
              </div>

              {/* Data Requirements */}
              <div className="mb-3">
                <CFormLabel htmlFor="dataRequirements">Data Requirements</CFormLabel>
                <CFormTextarea
                  id="dataRequirements"
                  name="dataRequirements"
                  value={projectData.dataRequirements}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Specify the data you need"
                  required
                ></CFormTextarea>
              </div>

              {/* Study Type */}
              <div className="mb-3">
                <CFormLabel htmlFor="studyType">Study Type</CFormLabel>
                <CFormSelect
                  id="studyType"
                  name="studyType"
                  value={projectData.studyType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select study type</option>
                  <option value="epidemiological">Epidemiological Study</option>
                  <option value="genetic">Genetic Research</option>
                  <option value="clinical">Clinical Trial</option>
                  <option value="behavioral">Behavioral Study</option>
                  <option value="other">Other</option>
                </CFormSelect>
              </div>

              {/* Start Date */}
              <div className="mb-3">
                <CFormLabel htmlFor="startDate">Start Date</CFormLabel>
                <CFormInput
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={projectData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* End Date */}
              <div className="mb-3">
                <CFormLabel htmlFor="endDate">End Date</CFormLabel>
                <CFormInput
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={projectData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Reward Amount */}
              <div className="mb-3">
                <CFormLabel htmlFor="rewardAmount">Reward Amount</CFormLabel>
                <CFormInput
                  type="number"
                  id="rewardAmount"
                  name="rewardAmount"
                  value={projectData.rewardAmount}
                  onChange={handleChange}
                  placeholder="Enter reward amount"
                  required
                />
              </div>

              {/* Researcher Name */}
              <div className="mb-3">
                <CFormLabel htmlFor="researcherName">Researcher Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="researcherName"
                  name="researcherName"
                  value={projectData.researcherName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Researcher Email */}
              <div className="mb-3">
                <CFormLabel htmlFor="researcherEmail">Researcher Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="researcherEmail"
                  name="researcherEmail"
                  value={projectData.researcherEmail}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="d-grid gap-2">
                <CButton color="primary" type="submit">
                  Create Project
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CreateProject
