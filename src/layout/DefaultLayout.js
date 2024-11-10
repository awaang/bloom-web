import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout



// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { signOut } from '@firebase/auth';

// const DefaultLayout = ({ auth, user }) => {
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       // The onAuthStateChanged listener in App.js will update the user state
//     } catch (error) {
//       console.error('Logout error:', error.message);
//     }
//   };

//   return (
//     <div>
//       <header>
//         <h1>Dashboard</h1>
//         <button onClick={handleLogout}>Logout</button>
//       </header>
//       <main>
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default DefaultLayout;
