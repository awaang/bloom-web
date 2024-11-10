import React, { useState, useEffect } from 'react';
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CListGroup,
  CListGroupItem,
  CRow,
  CTabContent,
  CTabPane,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from './../../../backend/firebase';
import { useNavigate } from 'react-router-dom';
import avatar6 from 'src/assets/images/avatars/4.jpg';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [researcherData, setResearcherData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    position: '',
    researchArea: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get the current user's UID
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    if (!userId) {
      // If user is not logged in, redirect to login page
      navigate('/login');
      return;
    }

    const fetchResearcherData = async () => {
      try {
        const docRef = doc(db, 'researchers', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setResearcherData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching researcher data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResearcherData();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResearcherData({
      ...researcherData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, 'researchers', userId);
      await updateDoc(docRef, researcherData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CContainer className="mt-4">
      <CRow className="justify-content-center">
        <CCol xs={12} md={10}>
          <CCard>
            <CCardHeader>
              <CNav variant="tabs" role="tablist">
                <CNavItem>
                  <CNavLink
                    // href="#"
                    active={activeTab === 0}
                    onClick={() => setActiveTab(0)}
                  >
                    Profile
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    // href="#"
                    active={activeTab === 1}
                    onClick={() => setActiveTab(1)}
                  >
                    Edit Profile
                  </CNavLink>
                </CNavItem>
              </CNav>
            </CCardHeader>
            <CCardBody>
              <CTabContent>
                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeTab === 0}>
                  <CRow>
                    <CCol md={4} className="text-center">
                      {/* <CAvatar src={avatar6} size="xxl" /> */}
                      <CAvatar src={avatar6} style={{ width: '100px', height: '100px' }} />
                      <h3 className="mt-3">
                        Dr. {researcherData.firstName} {researcherData.lastName}
                      </h3>
                      <p className="text-muted">{researcherData.position}</p>
                    </CCol>
                    <CCol md={8}>
                      <CListGroup flush>
                        <CListGroupItem>
                          <strong>Email:</strong> {researcherData.email}
                        </CListGroupItem>
                        <CListGroupItem>
                          <strong>Institution:</strong> {researcherData.institution}
                        </CListGroupItem>
                        <CListGroupItem>
                          <strong>Research Area:</strong> {researcherData.researchArea}
                        </CListGroupItem>
                      </CListGroup>
                    </CCol>
                  </CRow>
                </CTabPane>
                <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeTab === 1}>
                  <CForm onSubmit={handleSubmit}>
                    {/* Profile Picture */}
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="profilePicture" className="col-sm-2 col-form-label">
                        Profile Picture
                      </CFormLabel>
                      <CCol sm={10}>
                        <div className="mb-3">
                          <CAvatar src={avatar6} size="lg" />
                        </div>
                        <CFormInput
                          type="file"
                          id="profilePicture"
                          name="profilePicture"
                          accept="image/*"
                          onChange={(e) => console.log('File selected:', e.target.files[0])}
                        />
                      </CCol>
                    </CRow>

                    {/* First Name */}
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="firstName" className="col-sm-2 col-form-label">
                        First Name
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={researcherData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </CCol>
                    </CRow>

                    {/* Last Name */}
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="lastName" className="col-sm-2 col-form-label">
                        Last Name
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={researcherData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </CCol>
                    </CRow>

                    {/* Email (read-only) */}
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                        Email
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="email"
                          id="email"
                          name="email"
                          value={researcherData.email}
                          readOnly
                        />
                      </CCol>
                    </CRow>

                    {/* Institution */}
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="institution" className="col-sm-2 col-form-label">
                        Institution
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="institution"
                          name="institution"
                          value={researcherData.institution}
                          onChange={handleChange}
                          required
                        />
                      </CCol>
                    </CRow>

                    {/* Position */}
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="position" className="col-sm-2 col-form-label">
                        Position
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="position"
                          name="position"
                          value={researcherData.position}
                          onChange={handleChange}
                          required
                        />
                      </CCol>
                    </CRow>

                    {/* Research Area */}
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="researchArea" className="col-sm-2 col-form-label">
                        Research Area
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="text"
                          id="researchArea"
                          name="researchArea"
                          value={researcherData.researchArea}
                          onChange={handleChange}
                          required
                        />
                      </CCol>
                    </CRow>

                    {/* Submit Button */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton color="primary" type="submit">
                        Save Changes
                      </CButton>
                    </div>
                  </CForm>
                </CTabPane>
              </CTabContent>
            </CCardBody>
            <CCardFooter className="text-center">
              <small className="text-muted">Last updated just now</small>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Profile;
