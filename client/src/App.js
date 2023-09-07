import './App.css';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import HomePage from './components/Pages/HomePage';
import Post from './components/Post/Post';
import {Route, Routes} from "react-router-dom";
import Register from './components/Register/Register';
import UserContextProvider from './UserContext';
import CreatePost from './components/Pages/CreatePost';
import PostPage from './components/Pages/PostPage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element = { <HomePage />} />
          <Route path="/login" element = { <Login /> } />
          <Route path="/register" element = { <Register /> } />
          <Route path="/create" element = { <CreatePost /> } />
          <Route path="/posts/:id" element = {<PostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;
