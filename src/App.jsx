import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import './App.scss'

import Layout from './components/Layout/Layout';
import Gallery from './components/Gallery/Gallery';
import AddPhoto from './components/AddPhoto/AddPhoto';
import Photo from './components/Photo/Photo';

function App() {
  return (
    <div className="App">
      <Layout>
        <main>
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/add-photo" element={<AddPhoto />} />
            <Route path="/photos/:id" element={<Photo />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Layout>
    </div>
  )
}

export default App
