import Navbar from './components/navbar'
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import CreatePost from './pages/create-post'

// import Footer from "./components/footer"

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full md:w-1/2 m-auto flex flex-col gap-4 pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />     
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* <Footer/> */}
      </div>
    </>
  );
}

export default App;


