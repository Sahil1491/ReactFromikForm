import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyForm from './components/MyForm/Myform';
import FormData from './components/FormData/FormData';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyForm />} />
        <Route path="/form-data" element={<FormData />} />
      </Routes>
    </Router>
  );
};

export default App;
