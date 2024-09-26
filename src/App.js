import React from 'react';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import ColegioList from './components/lista_colegios/ColegiosList';


function App() {
  return (
    <div className="container mx-auto p-4">
    <Router>
      <Routes>
        <Route path='/' element={<ColegioList/>}/>

  
      </Routes>
    </Router>
    </div>
  );
}

export default App;
