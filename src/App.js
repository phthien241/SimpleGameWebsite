import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dialog from "./components/Dialog/Dialog";
import { DialogProvider } from "./Contexts/DialogProvider";

const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const SignIn = lazy(() => import("./components/Sign-In/SignIn"));
const SignUp = lazy(() => import("./components/Sign-up/Signup"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const Social = lazy(() => import("./components/Social/Social"));
const GameList = lazy(() => import("./components/GameList/GameList"));
const PhaserGame = lazy(() => import("./Game/PhaserGame"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route
            exact
            path="sign-in"
            element={
              <DialogProvider>
                <SignIn />
                <Dialog />
              </DialogProvider>
            }
          ></Route>

          <Route
            exact
            path="sign-up"
            element={
              <DialogProvider>
                <SignUp />
                <Dialog />
              </DialogProvider>
            }
          ></Route>
          <Route exact path="profile" element={<Profile />}></Route>
          <Route exact path="phaser" element={<PhaserGame />}></Route>
          <Route exact path="social" element={<Social />}></Route>
          <Route exact path="game-list" element={<GameList />}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
