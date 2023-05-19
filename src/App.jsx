import React, {lazy, Suspense, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Loading from "./shared/Loading/Loading";

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./ProtectedRoutes";
import GoogleMapApi from "./GoogleMapApi";
import UserProperties from "./pages/dashboard/UserProperties/UserProperties";
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
const Verify = lazy(() => import('./pages/Verify/Verify'));
const UploadProperty = lazy(() => import('./pages/dashboard/UploadProperty/UploadProperty'))
const UserProperty = lazy(() => import('./pages/dashboard/UserProperty/UserProperty'))
const UpdateProperty = lazy(() => import('./pages/dashboard/UpdateProperty/UpdateProperty'))

const apiKey = process.env.REACT_APP_API_KEY;
const mapApiJs = process.env.REACT_APP_MAP_API_JS;
const geocodeJson = process.env.REACT_APP_GEOCODE_JSON;

function loadAsyncScript(src) {
    return new Promise(resolve => {
        const script = document.createElement('script');
        Object.assign(script, {
            type: 'text/javascript',
            async: true,
            src
        })
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}

function App() {
    let user = localStorage.getItem('user')

    // init gmap script
    const initMapScript = () => {
      // if script already loaded
      if(window.google) {
        return Promise.resolve();
      }
      const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
      return loadAsyncScript(src);
    }


    useEffect(() => {
        initMapScript().then()
    }, [])

    return (
        <>
            <Router>
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/agent" element={<Agent/>}/>
                        <Route path="/services" element={<Services/>}/>
                        <Route path="/properties" element={<Properties/>}/>
                        <Route path="/properties/:id" element={<PropertiesDetails/>}/>
                        <Route path="/blog" element={<Blog/>}/>
                        <Route path="/blog/:id" element={<BlogDetails/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/reset-password" element={<Reset/>}/>
                        <Route path="/reset" element={<ResetPassword/>}/>
                        <Route path="/dashboard" element={<ProtectedRoutes Component={Dashboard}/>}/>
                        <Route path="/profile" element={<ProtectedRoutes Component={Profile}/>}/>
                        <Route path="/upload-property" element={<ProtectedRoutes Component={UploadProperty}/>}/>
                        <Route path="/user-properties" element={<ProtectedRoutes Component={UserProperties}/>}/>
                        <Route path="/update-properties/" element={<ProtectedRoutes Component={UpdateProperty}/>}/>
                        <Route path="/verify" element={<Verify/>}/>
                        <Route path="*" element={<Home/>}/>
                    </Routes>
                </Suspense>
            </Router>
        </>
    );
}

export default App;
