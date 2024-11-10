import React from 'react'
import classNames from 'classnames'

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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
  const healthMetrics = [
    { title: 'Average Heart Rate', value: '72 bpm', percent: 40, color: 'success' },
    { title: 'Average Step Count', value: '10,000 Steps', percent: 60, color: 'info' },
    { title: 'Average BMI', value: '24.5', percent: 70, color: 'warning' },
    { title: 'Total Athletes', value: '150', percent: 100, color: 'danger' },
  ]

  const projectMetrics = [
    { title: 'Project 1', athletes: 34, rewards: 78 },
    { title: 'Project 2', athletes: 56, rewards: 94 },
    { title: 'Project 3', athletes: 12, rewards: 67 },
    { title: 'Project 4', athletes: 43, rewards: 91 },
  ]

  const projectRewards = [
    { title: 'Project 1', icon: cilUser, value: 53 },
    { title: 'Project 2', icon: cilUserFemale, value: 43 },
    { title: 'Project 3', icon: cilUser, value: 83 },
    { title: 'Project 4', icon: cilUserFemale, value: 13 },
  ]

  const rewardsTable = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: { name: 'Yiorgos Avraamu', registered: 'Jan 1, 2023' },
      amount: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      date: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: { name: 'Avram Tarasios', registered: 'Jan 1, 2023' },
      amount: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      date: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', registered: 'Jan 1, 2023' },
      amount: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      date: '1 hour ago',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: { name: 'Agapetus Tadeáš', registered: 'Jan 1, 2023' },
      amount: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      date: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: { name: 'Friderik Dávid', registered: 'Jan 1, 2023' },
      amount: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      date: 'Last week',
    },
  ]

  return (
    <>
      <CCol sm={5}>
        <h4 id="recent-rewards" className="card-title mb-3">
          Your Data at a Glance
        </h4>
      </CCol>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="aggregate-health-data" className="card-title mb-0">
                Aggregate Health Data
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
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
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {healthMetrics.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Rewards</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">New Athletes</div>
                        <div className="fs-5 fw-semibold">923</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Recurring Athletes
                        </div>
                        <div className="fs-5 fw-semibold">2,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {projectMetrics.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.athletes} />
                        <CProgress thin color="danger" value={item.rewards} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Total Rewarded</div>
                        <div className="fs-5 fw-semibold">3,566</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Total Rewards</div>
                        <div className="fs-5 fw-semibold">192 SOL</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {projectRewards.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value} SOL</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>
                </CCol>
                <CCol sm={5}>
                  <h4 id="recent-rewards" className="card-title mb-0">
                    Recent Rewards
                  </h4>
                  <div className="small text-body-secondary">Latest 5 Rewards</div>
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Athlete</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Amount</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {rewardsTable.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          Registered: {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{item.amount.value} SOL</div>
                          <div className="ms-3">
                            <small className="text-body-secondary">{item.amount.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.amount.color} value={item.amount.value} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">{item.date}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
