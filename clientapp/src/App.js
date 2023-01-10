import './App.css';

import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from './components/home';
import NotFound from './components/notFound';
import MyFiles from './components/myfiles';


function App() {
  return (
    <div>

      <div className="banner">
          <h1>File Share</h1>
      </div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={ <Home/> } />
            <Route exact path="file/:id" element={ <MyFiles/> } />
            <Route path="not_found" element={ <NotFound/> } />
            <Route path="*" element={ <Home/> } />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;

