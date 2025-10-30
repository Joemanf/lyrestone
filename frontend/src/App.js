import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Splash from "./components/Splash"
import MainPage from "./components/MainPage";
import Story from "./components/Story";
import Scene from "./components/Story/Scene/Scene";
import CreateStory from "./components/CreateStory";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Make sure the user is logged in between pages, then load the page
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <div className='son_of_root'>
          <div className='page_transition'>
            <Routes>
              <Route path='/' element={<Splash />} />
              <Route path="/login" element={<LoginFormPage />} />
              <Route path="/signup" element={<SignupFormPage />} />
              <Route path="/home" element={<MainPage />} />
              <Route path="/stories/:storyId" element={<Story />} />
              <Route path="/stories/:storyId/:sceneId" element={<Scene />} />
              <Route path="/create/:storyId" element={<CreateStory />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;