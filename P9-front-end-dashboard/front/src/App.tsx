import React from 'react';

import './App.css';

// components 
import { HorizontalNav } from './components/horizontalNav/HorizontalNav';
import { VerticalNav } from './components/verticalNav/VerticalNav';

import { Dashboard } from './components/dashboard/Dashboard';

// react router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { UserDashboard } from './pages/UserDashboard';

function Container() {
  return (
    <>
      <header>
        <HorizontalNav />
      </header>
      <div className="verticalAndOutlet">
        <VerticalNav />
        <Outlet />
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Container />}>
            <Route path='/userDashboard/:id' element={<UserDashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
