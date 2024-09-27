import React from 'react';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import ColegioList from './components/lista_colegios/ColegiosList';
import SearchFilterAdmin from './components/lista_colegios/SearchFilterAdmin';


function App() {
  return (
    <div className="container mx-auto p-4">
    <Router>
      <Routes>
        <Route path='/' element={<ColegioList/>}/>
        <Route path='/admin' element={<SearchFilterAdmin/>}/>
  
      </Routes>
    </Router>
    </div>
  );
}

export default App;
