import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButtonGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload, cilPeople } from '@coreui/icons'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
} from '@coreui/react-chartjs'

const ProjectPage = () => {
  const { id } = useParams()

  // Mock project data - replace with actual data fetching
  const projectData = {
    id: 1,
    title: "Impact of Exercise on Mental Health",
    description: "A study examining the correlation between regular physical activity and mental well-being in adults aged 25-40.",
    participantCount: 150,
    metrics: {
      aggregateStats: [
        { title: 'Average Heart Rate', value: '72 bpm', percent: 72, color: 'success' },
        { title: 'Average Blood Pressure', value: '120/80', percent: 80, color: 'info' },
        { title: 'Average BMI', value: '24.5', percent: 75, color: 'warning' },
        { title: 'Data Completion', value: '95%', percent: 95, color: 'primary' },
      ],
      demographics: {
        bloodTypes: [
          { type: 'A+', count: 45 },
          { type: 'O+', count: 55 },
          { type: 'B+', count: 30 },
          { type: 'AB+', count: 20 },
        ],
        ageGroups: [
          { group: '18-25', count: 40 },
          { group: '26-35', count: 60 },
          { group: '36-45', count: 35 },
          { group: '46+', count: 15 },
        ],
      },
      timeSeriesData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        heartRate: [72, 74, 71, 73, 72, 75],
        steps: [8000, 8500, 9000, 8800, 9200, 9500],
      }
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>{projectData.title}</h2>
              <div className="text-body-secondary">{projectData.description}</div>
            </div>
            <Link to="/projects/all">
              <CButton color="secondary">Back to Projects</CButton>
            </Link>
          </div>
        </CCol>
      </CRow>

      {/* Key Metrics Cards */}
      <CRow>
        {projectData.metrics.aggregateStats.map((metric, index) => (
          <CCol sm={6} lg={3} key={index}>
            <CCard className="mb-4">
              <CCardBody>
                <div className="fs-4 fw-semibold">{metric.value}</div>
                <div>{metric.title}</div>
                <CProgress 
                  thin 
                  className="mt-2" 
                  color={metric.color}
                  value={metric.percent}
                />
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      {/* Charts Row */}
      <CRow>
        {/* Time Series Chart */}
        <CCol xs={12} lg={8}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Health Metrics Over Time</h4>
                <div className="small text-body-secondary">6 months tracking</div>
              </div>
              <CButtonGroup>
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCardHeader>
            <CCardBody>
              <CChartLine
                data={{
                  labels: projectData.metrics.timeSeriesData.labels,
                  datasets: [
                    {
                      label: 'Average Heart Rate',
                      backgroundColor: 'rgba(220, 220, 220, 0.2)',
                      borderColor: 'rgba(220, 220, 220, 1)',
                      data: projectData.metrics.timeSeriesData.heartRate,
                    },
                    {
                      label: 'Average Steps (hundreds)',
                      backgroundColor: 'rgba(151, 187, 205, 0.2)',
                      borderColor: 'rgba(151, 187, 205, 1)',
                      data: projectData.metrics.timeSeriesData.steps.map(steps => steps/100),
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        {/* Demographics Charts */}
        <CCol xs={12} lg={4}>
          <CCard className="mb-4">
            <CCardHeader>
              <h4 className="mb-0">Participant Demographics</h4>
            </CCardHeader>
            <CCardBody>
              <h5 className="mb-3">Blood Type Distribution</h5>
              <CChartDoughnut
                data={{
                  labels: projectData.metrics.demographics.bloodTypes.map(item => item.type),
                  datasets: [
                    {
                      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                      data: projectData.metrics.demographics.bloodTypes.map(item => item.count),
                    },
                  ],
                }}
              />
              
              <h5 className="mt-4 mb-3">Age Distribution</h5>
              <CChartBar
                data={{
                  labels: projectData.metrics.demographics.ageGroups.map(item => item.group),
                  datasets: [
                    {
                      label: 'Participants',
                      backgroundColor: '#f87979',
                      data: projectData.metrics.demographics.ageGroups.map(item => item.count),
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Participant Table */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <h4 className="mb-0">Recent Data Submissions</h4>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">
                      <CIcon icon={cilPeople} className="me-2" />
                      Participant ID
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Age Group</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Blood Type</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Last Update</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Completion</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {[...Array(5)].map((_, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <div className="fw-semibold">A{1000 + index}</div>
                      </CTableDataCell>
                      <CTableDataCell>26-35</CTableDataCell>
                      <CTableDataCell>O+</CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary">3 days ago</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CProgress thin color="success" value={85} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCardFooter>
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} className="me-2" />
                Export Data
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ProjectPage