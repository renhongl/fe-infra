import { Link, Routes, Route } from "react-router-dom";

import React, { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";

const Home = lazy(() => import(/* webpackChunkName: 'home'*/ "./pages/Home"));
const About = lazy(() =>
  import(/* webpackChunkName: 'about'*/ "./pages/About")
);

export default function App() {
  return (
    <BrowserRouter basename="/demo1">
    <div>
        <p>Demo1 App Routes</p>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Suspense fallback={<div>loading...</div>}>
        <Routes >
          <Route path="home" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
        </Routes>
      </Suspense>
    </div>
    </BrowserRouter>
  );
}
