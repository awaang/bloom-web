// CreateProject.js

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
  CFormTextarea,
  CRow,
  CFormSelect,
} from '@coreui/react';
import { collection, addDoc } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from './../../../backend/firebase';
import { useNavigate } from 'react-router-dom';

import { Buffer } from 'buffer';
window.Buffer = Buffer;


// Import Solana Web3.js library
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
  SystemProgram,
} from '@solana/web3.js';

const CreateProject = () => {
  // State variables for project data
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    dataRequirements: '',
    startDate: '',
    endDate: '',
    rewardAmount: '',
    studyType: '',
  });

  const [researcherInfo, setResearcherInfo] = useState(null);
  const navigate = useNavigate();

  // Wallet integration state variables
  const [provider, setProvider] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState(null);

  // Replace with your actual platform wallet address
  const recipientAddress = '81xX2odC5GFf1NarKnvQWBe3SuD3YYgd6BPdFmoYooB6'; // Replace with your actual address

  // useEffect hook to fetch researcher info and detect wallet
  useEffect(() => {
    const fetchResearcherInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        try {
          const docRef = doc(db, 'researchers', userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setResearcherInfo(docSnap.data());
          } else {
            console.log('No such researcher document!');
          }
        } catch (error) {
          console.error('Error fetching researcher info:', error);
        }
      } else {
        // If user is not logged in, redirect to login page
        navigate('/login');
      }
    };

    fetchResearcherInfo();

    // Wallet provider detection
    const getProvider = () => {
      if ('solana' in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          return provider;
        }
      }
      return null;
    };

    const provider = getProvider();
    setProvider(provider);

    if (provider) {
      provider
        .connect({ onlyIfTrusted: true })
        .then((res) => {
          setPublicKey(res.publicKey.toString());
          setWalletConnected(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert('Please install Phantom Wallet to proceed.');
    }
  }, [navigate]);

  // Function to connect wallet
  const connectWallet = async () => {
    if (provider) {
      try {
        const res = await provider.connect();
        setPublicKey(res.publicKey.toString());
        setWalletConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Please install Phantom Wallet to proceed.');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!researcherInfo) {
      alert('Researcher information not loaded. Please try again.');
      return;
    }
  
    if (!walletConnected) {
      alert('Please connect your wallet to proceed.');
      return;
    }
  
    try {
      // Convert reward amount to lamports (1 SOL = 1,000,000,000 lamports)
      const lamports = parseFloat(projectData.rewardAmount) * 1e9;
  
      // Create a connection to the Solana devnet
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  
      // Create a transaction to send SOL
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(publicKey),
          toPubkey: new PublicKey(recipientAddress),
          lamports: lamports,
        })
      );
  
      // Set the transaction fee payer and recent blockhash
      transaction.feePayer = new PublicKey(publicKey);
      const latestBlockhash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = latestBlockhash.blockhash;
  
      // Request the wallet to sign the transaction
      const signedTransaction = await provider.signTransaction(transaction);
  
      // Send the signed transaction
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      console.log('Transaction signature', signature);
  
      // Use the new confirmation method with TransactionConfirmationStrategy
      await connection.confirmTransaction({
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      }, 'confirmed');
  
      // Proceed to save the project data to Firestore
      const completeProjectData = {
        ...projectData,
        researcher: {
          firstName: researcherInfo.firstName,
          lastName: researcherInfo.lastName,
          email: researcherInfo.email,
          institution: researcherInfo.institution,
          position: researcherInfo.position,
          researchArea: researcherInfo.researchArea,
        },
        researcherId: auth.currentUser.uid,
        transactionSignature: signature, // Optionally store the transaction signature
      };
  
      // Add a new document to Firestore
      const docRef = await addDoc(collection(db, 'projects'), completeProjectData);
      console.log('Document written with ID: ', docRef.id);
  
      // Reset the form
      setProjectData({
        title: '',
        description: '',
        dataRequirements: '',
        startDate: '',
        endDate: '',
        rewardAmount: '',
        studyType: '',
      });
      alert('Project created successfully!');
      // Redirect to the project list or detail page if needed
      navigate('/projects/all');
    } catch (error) {
      console.error('Error during transaction or adding document: ', error);
      alert('Failed to create project. Please try again.');
    }
  };
  

  // If researcherInfo is not loaded yet, show a loading indicator
  if (!researcherInfo) {
    return <div>Loading researcher information...</div>;
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} md={8}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create New Research Project</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              {/* Connect Wallet */}
              <div className="mb-3">
                {!walletConnected ? (
                  <CButton color="primary" onClick={connectWallet}>
                    Connect Wallet
                  </CButton>
                ) : (
                  <div>Wallet connected: {publicKey}</div>
                )}
              </div>

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
                <CFormLabel htmlFor="rewardAmount">Reward Amount (in SOL)</CFormLabel>
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
  );
};

export default CreateProject;
