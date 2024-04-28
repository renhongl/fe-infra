import { Link, Routes, Route } from "react-router-dom";

import React, { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";

const Home = lazy(() => import(/* webpackChunkName: 'home'*/ "./pages/Home"));
const About = lazy(() =>
  import(/* webpackChunkName: 'about'*/ "./pages/About")
);

// @ts-ignore  
const Demo1 = React.lazy(() => import(/* webpackChunkName: 'Demo1'*/ "demo1/App"));

export default function App() {
  return (
    <BrowserRouter>
    <div>
    <p>Main App Routes</p>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/demo1/home">Demo1(micro-app)</Link>
        </li>
      </ul>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/demo1/*" element={<Demo1/>}></Route>
        </Routes>
      </Suspense>
    </div>
    </BrowserRouter>
  );
}
