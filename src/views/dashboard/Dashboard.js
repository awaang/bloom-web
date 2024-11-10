import React, { useState } from 'react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilCloudDownload,
  cilPeople,
  cilChartPie,
  cilNotes,
  cilSpeedometer,
} from '@coreui/icons'
import {
  CChartLine,
  CChartDoughnut,
  CChartBar,
} from '@coreui/react-chartjs'

const Dashboard = () => {
  const [showAllRewards, setShowAllRewards] = useState(false)
  
  // Mock data - replace with actual data fetching
  const dashboardData = {
    overview: {
      totalProjects: 12,
      activeParticipants: 3566,
      totalRewards: 192.5,
      dataCompleteness: 87
    },
    projectMetrics: [
      { name: 'Cardiovascular Study', participants: 856, completeness: 92, rewards: 45.5 },
      { name: 'Athletic Performance', participants: 1243, completeness: 88, rewards: 62.8 },
      { name: 'Sleep Analysis', participants: 752, completeness: 79, rewards: 37.2 },
      { name: 'Nutrition Impact', participants: 715, completeness: 85, rewards: 47.0 }
    ],
    participantDemographics: {
      ageGroups: [
        { group: '18-25', count: 1200 },
        { group: '26-35', count: 1500 },
        { group: '36-45', count: 600 },
        { group: '46+', count: 266 }
      ],
      dataTypes: {
        labels: ['Heart Rate', 'Blood Pressure', 'Steps', 'Sleep', 'Blood Glucose', 'BMI'],
        datasets: [65, 85, 90, 75, 60, 88]
      }
    },
    recentRewards: [
      {
        walletAddress: '8xJ4...',
        projectId: 'CV-123',
        amount: 2.5,
        timestamp: '10 min ago',
        status: 'success'
      },
      {
        walletAddress: '9pK5...',
        projectId: 'AP-456',
        amount: 1.8,
        timestamp: '25 min ago',
        status: 'success'
      },
      {
        walletAddress: '7mN3...',
        projectId: 'SA-789',
        amount: 2.0,
        timestamp: '1 hour ago',
        status: 'pending'
      },
      // Add more reward entries as needed
    ]
  }

  const getStatusColor = (status) => {
    return status === 'success' ? 'success' : 
           status === 'pending' ? 'warning' : 
           'danger'
  }

  return (
    <>
      {/* Overview Statistics */}
      <CRow>
        <CCol sm={6} lg={3}>
          <CCard className="mb-4 text-white bg-primary">
            <CCardBody className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  {dashboardData.overview.totalProjects} Projects
                </div>
                <div>Active Research Projects</div>
              </div>
              <CIcon icon={cilNotes} size="xl" />
            </CCardBody>
            <CCardFooter className="bg-primary-dark">
              <CProgress thin className="mt-3" value={100} color="light" />
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol sm={6} lg={3}>
          <CCard className="mb-4 text-white bg-info">
            <CCardBody className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  {dashboardData.overview.activeParticipants}
                </div>
                <div>Active Participants</div>
              </div>
              <CIcon icon={cilPeople} size="xl" />
            </CCardBody>
            <CCardFooter className="bg-info-dark">
              <CProgress thin className="mt-3" value={75} color="light" />
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol sm={6} lg={3}>
          <CCard className="mb-4 text-white bg-success">
            <CCardBody className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  {dashboardData.overview.totalRewards} SOL
                </div>
                <div>Total Rewards Distributed</div>
              </div>
              <CIcon icon={cilChartPie} size="xl" />
            </CCardBody>
            <CCardFooter className="bg-success-dark">
              <CProgress thin className="mt-3" value={90} color="light" />
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol sm={6} lg={3}>
          <CCard className="mb-4 text-white bg-warning">
            <CCardBody className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  {dashboardData.overview.dataCompleteness}%
                </div>
                <div>Average Data Completeness</div>
              </div>
              <CIcon icon={cilSpeedometer} size="xl" />
            </CCardBody>
            <CCardFooter className="bg-warning-dark">
              <CProgress thin className="mt-3" value={87} color="light" />
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>

      {/* Charts Row */}
      <CRow>
        <CCol xs={12} lg={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="mb-0">Project Activity</h4>
                  <div className="small text-body-secondary">Participant engagement over time</div>
                </div>
                <CButtonGroup>
                  {['Week', 'Month', 'Quarter'].map((value) => (
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
              </div>
            </CCardHeader>
            <CCardBody>
              <CChartLine
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                  datasets: [
                    {
                      label: 'Active Participants',
                      backgroundColor: 'rgba(0, 123, 255, 0.1)',
                      borderColor: 'rgba(0, 123, 255, 1)',
                      pointBackgroundColor: 'rgba(0, 123, 255, 1)',
                      pointBorderColor: '#fff',
                      data: [2100, 2400, 2800, 3200, 3400, 3566],
                    },
                    {
                      label: 'Data Submissions',
                      backgroundColor: 'rgba(40, 167, 69, 0.1)',
                      borderColor: 'rgba(40, 167, 69, 1)',
                      pointBackgroundColor: 'rgba(40, 167, 69, 1)',
                      pointBorderColor: '#fff',
                      data: [1900, 2200, 2600, 3000, 3200, 3400],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} lg={4}>
          <CCard className="mb-4">
            <CCardHeader>
              <h4 className="mb-0">Data Type Coverage</h4>
            </CCardHeader>
            <CCardBody>
              <CChartDoughnut
                data={{
                  labels: dashboardData.participantDemographics.dataTypes.labels,
                  datasets: [
                    {
                      backgroundColor: [
                        '#321fdb',
                        '#3399ff',
                        '#2eb85c',
                        '#f9b115',
                        '#e55353',
                        '#768192',
                      ],
                      data: dashboardData.participantDemographics.dataTypes.datasets,
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Projects and Demographics */}
      <CRow>
        <CCol xs={12} lg={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <h4 className="mb-0">Project Overview</h4>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Project Name</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Participants</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Completeness</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Rewards (SOL)</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dashboardData.projectMetrics.map((project, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <div className="fw-semibold">{project.name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{project.participants}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="text-body-secondary me-2">{project.completeness}%</div>
                          <CProgress thin className="flex-grow-1" value={project.completeness} />
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{project.rewards}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} lg={4}>
          <CCard className="mb-4">
            <CCardHeader>
              <h4 className="mb-0">Participant Demographics</h4>
            </CCardHeader>
            <CCardBody>
              <CChartBar
                data={{
                  labels: dashboardData.participantDemographics.ageGroups.map(item => item.group),
                  datasets: [
                    {
                      label: 'Participants',
                      backgroundColor: '#321fdb',
                      data: dashboardData.participantDemographics.ageGroups.map(item => item.count),
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Recent Rewards */}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Recent Rewards</h4>
              <CButton 
                color="primary" 
                size="sm"
                onClick={() => setShowAllRewards(!showAllRewards)}
              >
                {showAllRewards ? 'Show Less' : 'Show More'}
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Wallet Address</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Project ID</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Amount (SOL)</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Timestamp</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(showAllRewards ? dashboardData.recentRewards : dashboardData.recentRewards.slice(0, 3)).map((reward, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <div className="fw-semibold">{reward.walletAddress}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{reward.projectId}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{reward.amount}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary">{reward.timestamp}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CBadge color={getStatusColor(reward.status)}>
                          {reward.status}
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCardFooter>
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} className="me-2" />
                Export Rewards History
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard