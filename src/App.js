import React, { useRef } from "react";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Button from "./components/Button";
import logo from "./logoDream.svg";
import missionSVG from "./missionSvg.svg";
import workSVG from "./workSvg.svg";
import whitePaperPDF from "../src/WhitePaper.pdf";
import { appAnimation } from "./animations/appAnimation";
import DreamFundrLanding from "./components/LandingPage";

gsap.registerPlugin();

const App = () => {
  return <DreamFundrLanding />;
};

export default App;
