import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from './pages/HomePage';
import Login from './pages/Login';
import { useAuth } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import NewReading from "./pages/NewReading";
import Result from "./pages/Result";


function App() {
  const { token } = useAuth();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Login />} />
          <Route path="/account" element={token ? <Account /> : <Login />} />
          <Route path="/new_reading" element={token ? <NewReading /> : <Login />} />
          <Route path="/result/:id" element={token ? <Result /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;