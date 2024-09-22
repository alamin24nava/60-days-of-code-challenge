import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Blogs from './pages/Blogs.jsx'
import About from './pages/About.jsx'
import NoPage from './pages/NoPage.jsx'
import Layout from './pages/Layout.jsx';   
import 'bootstrap/dist/css/bootstrap.min.css'; 
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
)