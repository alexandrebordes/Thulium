import styles from "./App.module.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Note } from "./Components/Note/Note";
import { Authentification } from './Components/User/Authentification/Authentification';
import axios from 'axios';
import { UserProvider } from './Context/UserContext';


axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/Note" element={<Note />} />
            <Route path="/" element={<div className={styles.authContainer}><Authentification mode="login" /></div>} />
            <Route path="/Register" element={<div className={styles.authContainer}><Authentification mode="register" /></div>} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App
