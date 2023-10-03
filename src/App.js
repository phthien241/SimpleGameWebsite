import React, {Suspense, lazy } from "react";
import { BrowserRouter as Router,  Routes,  Route } from "react-router-dom";

const HomePage = lazy(()=>import('./components/HomePage/HomePage'))
const SignIn = lazy(()=>import('./components/Sign-In/SignIn'))
const Profile = lazy(()=>import('./components/Profile/Profile'))
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element = {<HomePage/>}></Route>
          <Route exact path="sign-in" element = {<SignIn/>}></Route>
          <Route exact path="profile" element={<Profile/>}></Route>
        </Routes>
      </Suspense>
    </Router>

);
}

export default App;
