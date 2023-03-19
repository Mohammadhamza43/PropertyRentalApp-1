import React , {lazy , Suspense} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from "./shared/Loading/Loading";

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./ProtectedRoutes";

const Home = lazy(() => import('./pages/PublicPages/home/Home'))
const About = lazy(() => import('./pages/PublicPages/About/About'))
const Agent = lazy(() => import('./pages/PublicPages/Agent/Agent'))
const Contact = lazy(() => import('./pages/PublicPages/Contact/Contact'))
const Error = lazy(() => import('./pages/PublicPages/Error/Error'))
const Services = lazy(() => import('./pages/PublicPages/Services/Services'))
const Properties = lazy(() => import('./pages/PublicPages/Properties/Properties/Properties'))
const PropertiesDetails = lazy(() => import('./pages/PublicPages/Properties/PropertiesDetails/PropertiesDetails'))
const Blog = lazy(() => import('./pages/PublicPages/Blog/Blog/Blog'))
const BlogDetails = lazy(() => import('./pages/PublicPages/Blog/BlogDetails/BlogDetails'))
const Login = lazy(() => import('./pages/PublicPages/sign-in/Login'))
const Signup = lazy(() => import('./pages/PublicPages/sign-up/Signup'))
const ResetPassword = lazy(() => import('./pages/PublicPages/ResetPassword/ResetPassword'))
const Reset = lazy(() => import('./pages/PublicPages/Reset/Reset'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard/Dashboard'))
const Profile = lazy(() => import('./pages/dashboard/Profile/Profile'))
const Verify = lazy(() => import('./pages/Verify/Verify'))



function App() {
   let user = localStorage.getItem('user')
  return (
    <>
      <Router>
        <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/services" element={<Services />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertiesDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/dashboard" element={<ProtectedRoutes Component={Dashboard}/>}/>
          <Route path="/profile" element={<ProtectedRoutes Component={Profile}/>}/>
          <Route path="/verify" element={<Verify />} />
          <Route path="*" element={<Home />} />
        </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
