
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import { Routes } from 'react-router-dom'
import Publish from './pages/Publish'
import Blogs from './pages/Blogs'
import Home from './pages/Home'
function App() {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path="/signup" element = {<Signup/>} />
     <Route path="/signin" element = {<Signin/>} />
     <Route path="/blog/:id" element = {<Blog/>} />
     <Route path="/blogs" element = {<Blogs/>} />
     <Route path="/publish" element = {<Publish/>} />
     <Route path="/" element = {<Home/>} />

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
