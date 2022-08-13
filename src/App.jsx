import { Route, Routes } from 'react-router-dom';

import './App.css'

import Layout from './components/Layout/Layout';
import Gallery from './components/Gallery/Gallery';

function App() {
  return (
    <div className="App">
      <Layout>
        <main>
          <Routes>
            <Route path="/" element={<Gallery />} />
          </Routes>
        </main>
      </Layout>
      {/* <div className="container">
        <SearchBar />
        <Gallery />\
      </div> */}
    </div>
  )
}

export default App
