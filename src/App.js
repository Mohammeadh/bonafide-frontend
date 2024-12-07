import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Main = lazy(() => import('./Components/Main'));
const Edit = lazy(() => import('./Request_Managment/Edit'));
const LoginForm = lazy(() => import('./Components/Newlogin'));
const TechReset = lazy(() => import('./Request_Managment/TechReset'));
const History = lazy(() => import('./Request_Managment/History'));

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Suspense fallback={<div>Loading...</div>}><LoginForm /></Suspense>} exact></Route>
          <Route path='/main' element={<Suspense fallback={<div>Loading...</div>}><Main /></Suspense>} exact></Route>
          <Route path='/main/Edit' element={<Suspense fallback={<div>Loading...</div>}><Edit /></Suspense>} exact></Route>
          <Route path='psna/bonafide_history' element={<Suspense fallback={<div>Loading...</div>}><History /></Suspense>} exact></Route>
          <Route path='/newlogin' element={<Suspense fallback={<div>Loading...</div>}><LoginForm /></Suspense>} exact></Route>
          <Route path='/reset' element={<Suspense fallback={<div>Loading...</div>}><TechReset /></Suspense>} exact></Route>
          <Route path='*' element={<h2>Page Not Found !</h2>} exact></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
