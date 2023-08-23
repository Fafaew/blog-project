import './App.css';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import HomePage from './components/Pages/HomePage';
import Post from './components/Post/Post';
import {Route, Routes} from "react-router-dom";
import Register from './components/Register/Register';
import UserContextProvider from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element = { <HomePage />} />
          <Route path="/login" element = { <Login /> } />
          <Route path="/register" element = { <Register /> } />
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;
