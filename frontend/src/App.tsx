
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";
import Register from "./features/auth/Register";
import Landing from "./pages/Landing";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Quiz from "./features/quiz/Quiz";
import { useAppSelector } from "./app/hooks";
import CurrentQuiz from "./features/quiz/CurrentQuiz";

function App() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate replace to="/dashboard" /> : <Landing />
              }
            />
            <Route
              path="/dashboard"
              element={
                !user ? <Navigate replace to="/" /> : <Dashboard />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/:id" element={<CurrentQuiz />} />
          </Routes>
        </Container>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
