import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from './pages/Landing.jsx'; // Import your landing page component
import Result from './pages/Result.jsx'; // Import your code page component


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/redirect/:code" element={<Result />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/" element={<Landing />} /> {/* Optional default route */}
            </Routes>
        </BrowserRouter>
    );
}
