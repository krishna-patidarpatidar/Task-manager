import HomePage from "./Screens/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Screens/AuthPage/Login";
import Registration from "./Screens/AuthPage/Registration";
type Props = {};

const App = (props: Props) => {
  return (
<>
<BrowserRouter>
   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Registration />} />
   </Routes>
   </BrowserRouter>
      <ToastContainer/>
</>
  );
};

export default App;
