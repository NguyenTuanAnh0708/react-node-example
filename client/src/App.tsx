import {Route, Routes} from 'react-router-dom';
import './App.css';

import FileUpload from './components/FileUpload';
import SendObj from './components/SendObj';
import Blob from './components/Bolb';
import Layout1 from './layout/layout1';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout1 />}>
        <Route path='/file' element={<FileUpload />} />
        <Route path='/send-obj' element={<SendObj />} />
        <Route path='/blob' element={<Blob />} />
      </Route>
    </Routes>
  );
}

export default App;
