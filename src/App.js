import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChangePassword from "./Pages/ChangePassword";
import EmailVerification from "./Pages/EmailVerification";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import ResetPasswordConfirm from "./Pages/ResetPasswordConfirm";
import Signup from "./Pages/Signup";
import Layout from "./High Order Function/Layout";
import "./css/main.css";
import { Provider } from "react-redux";
import Store from "./Store";
import About from './Pages/About'
import Blogs from './Pages/Blogs'
import Contact from './Pages/Contact'
import SingleBlog from "./Pages/SingleBlog";
import Codes from './code/Codes';
import CodeTopics from './code/CodeTopics';
import Shorts from './Pages/Shorts';
import McqQuiz from './Pages/McqQuiz';
import McqTopics from './Pages/McqTopics.js';
import TutorialTopics from './tutorials/TutorialTopics';
import Profile from "./Pages/Profile";
import Topics from "./code/Topics.js";
import HtmlEditor from "./Component/HtmlEditor.js";
import CodeEditor from "./Component/CodeEditor.js";

const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" Component={Home}></Route>
            <Route path="login/" Component={Login}></Route>
            <Route path="signup/" Component={Signup}></Route>
            <Route path="change/password/" Component={ChangePassword}></Route>
            <Route path="reset/password/" Component={ResetPassword}></Route>
            <Route path="dj-rest-auth/registration/account-confirm-email/:key/" Component={EmailVerification}></Route>
            <Route path="reset/password/confirm/:uid/:token" Component={ResetPasswordConfirm}></Route>
            <Route path="about/" Component={About} />
            <Route path="contact/" Component={Contact} />
            <Route path="blogs/" Component={Blogs} />
            <Route path="shorts/" Component={Shorts} />
            <Route path="blogs/:url/" Component={SingleBlog} />
            <Route element={<TutorialTopics />} path='tutorials/:url' />
            <Route element={<CodeTopics />} path="languages/:url/codes" />
            <Route element={<Codes />} path="languages/codes/:url/" />
            <Route element={<Shorts />} path="shorts" />
            <Route element={<McqTopics />} path='test/:url' />
            <Route element={<McqQuiz />} path='/topics/:topicId/questions' />
            <Route element={<Profile/>} path='/profile' />
            <Route element={<Topics />} path="/topics/:url" />
            <Route element={<HtmlEditor/>} path="/editor" />
            <Route element={<CodeEditor/>} path="/edit" />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App