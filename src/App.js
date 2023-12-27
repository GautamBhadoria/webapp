import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VideoPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;