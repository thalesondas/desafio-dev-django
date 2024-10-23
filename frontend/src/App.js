import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import GlobalAlert from './components/GlobalAlert';
import PostForm from './components/PostForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalAlert />
        <PostForm />
      </Provider>
    </>
  );
}

export default App;
