
import { RouterProvider } from 'react-router-dom';
import './App.css';
import LoginUser from './components/LoginUser';
import Register from './components/Register';
import router from './Routes/Router';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}>
      <Register></Register>
      <LoginUser></LoginUser>
      </RouterProvider>
     
    </div>
  );
}

export default App;
