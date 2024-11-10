import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CAvatar,
} from '@coreui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from './../../../backend/firebase'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import avatar1 from 'src/assets/images/avatars/6.jpg';

const Profile = () => {
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
    <CRow className="justify-content-center">
      <CCol xs={12} md={8}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>My Profile</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Profile Picture */}
              <CRow className="mb-3">
                <CFormLabel htmlFor="profilePicture" className="col-sm-2 col-form-label">
                  Profile Picture
                </CFormLabel>
                <CCol sm={10}>
                  <div className="mb-3">
                    <CAvatar src={avatar1} size="lg" />
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
                    onChange={handleChange}
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
                  Update Profile
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Profile;
