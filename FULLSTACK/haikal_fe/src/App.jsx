import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Register from "./pages/RegisterPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import Profile from "./pages/ProfilePage.jsx";
import VideoKamu from "./pages/VideoKamu.jsx"
import RegisterAdmin from "./pages/RegisterPageAdmin.jsx";
import LoginAdmin from "./pages/LoginPageAdmin.jsx";
import HomeAdmin from "./pages/HomePageAdmin.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/film/:id" element={<DetailPage />} /> 
        <Route path="/film-kamu" element={<VideoKamu />} />
        <Route path="/RegisterAdmin" element={<RegisterAdmin />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/Admin" element={<HomeAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;