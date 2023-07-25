import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ChannelDetail,
  Feed,
  Navbar,
  SearchFeed,
  VideoDetail,
} from './components';
import { MyContextProvider } from './store/context';
import AboutPage from './components/updates/AboutPage';
import Footer from './components/Footer';

function App() {
  return (
    <MyContextProvider>
      <div className='home'>
        <BrowserRouter>
          <section style={{ backgroundColor: '#212529', minHeight: '100vh' }}>
            <Navbar />
            <Routes>
              <Route path='/' exact element={<Feed />} />
              <Route path='/about' exact element={<AboutPage />} />
              <Route path='/video/:id' element={<VideoDetail />} />
              <Route path='/channel/:id' element={<ChannelDetail />} />
              <Route path='/search/:searchTerm' element={<SearchFeed />} />
            </Routes>
            <Footer />
          </section>
        </BrowserRouter>
      </div>
    </MyContextProvider>
  );
}

export default App;
