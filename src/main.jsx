import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chart from './components/Chart';
import Convert from './components/Convert';
import './mainDesign.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/">
          <Route path="" element={<Chart />} />
          <Route path="chart" element={<Chart />} />
          <Route path="convert" element={<Convert />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);