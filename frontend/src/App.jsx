import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import GlobalAlert from './components/GlobalAlert';
import Header from './components/Header';
import PostForm from './components/PostForm';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalAlert />
          <Header />
          <main className='d-flex flex-column align-items-center justify-content-start'>
            <Routes>
              <Route path="/" element={<PostForm />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
