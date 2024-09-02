import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormData from './components/FormData/FormData';
import Users from './components/UserData/User';
import UserDetail from './components/UserData/UserDetails';

const App: React.FC = () => {
  return (
    // <FormData/>
    <Router>
    <Routes>
        <Route  path="/" element={<Users/>} />
        <Route path="/users/:id" element={<UserDetail/>} />
    </Routes>
</Router>
  );
};

export default App;
