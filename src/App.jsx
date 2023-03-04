import React , {lazy , Suspense} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Login from "./pages/PublicPages/sign-in/Login";
// import Home from './pages/PublicPages/home/Home'
// import About from './pages/PublicPages/About/About'
// import Agent from './pages/PublicPages/Agent/Agent'
// import Contact from './pages/PublicPages/Contact/Contact'
// import Error from './pages/PublicPages/Error/Error'
import Footer from "./shared/Footer/Footer";
import Header from "./shared/Header/Header";
import Loading from "./shared/Loading/Loading";
// import Services from "./pages/PublicPages/Services/Services";
// import Properties from "./pages/PublicPages/Properties/Properties/Properties";
// import PropertiesDetails from "./pages/PublicPages/Properties/PropertiesDetails/PropertiesDetails";
// import Blog from "./pages/PublicPages/Blog/Blog/Blog";
// import BlogDetails from "./pages/PublicPages/Blog/BlogDetails/BlogDetails";


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



function App() {
  return (
    <>
      <Header />
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
          <Route path="*" element={<Error />} />
        </Routes>
        </Suspense>
      </Router>
      <Footer />
    </>
  );
}

export default App;
