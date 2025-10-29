import React, { useState, ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./pages/Home";
import News from "./components/News";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";

// Import topic pages
import Water from "./pages/news/Water";
import Roads from "./pages/news/Roads";
import Electricity from "./pages/news/Electricity";
import Air from "./pages/news/Air";
import Cleanliness from "./pages/news/Cleanliness";

// No need to import assets/logo.png if not used


//import Nature from "./assets/logo.png"; // Import your background image

type UserRole = "admin" | "user" | null;

function App() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleLoginSuccess = (username: string, role?: string) => {
    setLoggedInUser(username);
    setUserRole((role === "admin" || role === "user") ? role as UserRole : null);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setUserRole(null);
  };

  const ProtectedRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
    if (!loggedInUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url("https://th.bing.com/th/id/OIP.NmGOsMf9DkJODI9loh4JsQHaEJ?w=288&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Router>
        <Header loggedInUser={loggedInUser} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={loggedInUser ? <Navigate to="/dashboard" replace /> : <Home />}
          />
          <Route
            path="/login"
            element={loggedInUser ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/news" element={<News />} />
          
          {/* News topic pages */}
          <Route path="/news/water" element={<Water />} />
          <Route path="/news/roads" element={<Roads />} />
          <Route path="/news/electricity" element={<Electricity />} />
          <Route path="/news/air" element={<Air />} />
          <Route path="/news/cleanliness" element={<Cleanliness />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard username={loggedInUser || ""} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile username={loggedInUser || ""} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          {/* Correct wildcard to catch unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
