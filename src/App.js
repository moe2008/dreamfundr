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

gsap.registerPlugin();

const App = () => {
  const splineRef = useRef();

  const navigation = useNavigate();

  function onLoad(spline) {
    const obj = spline.findObjectById("2ec53e6f-d327-4a11-81ab-9eff1dca64e1");

    splineRef.current = obj;

    if (splineRef.current) {
      gsap.from(splineRef.current.position, {
        y: 400,
        duration: 2,
        ease: "back.in",
      });
      appAnimation();
    }
  }

  const handleWhitePaperDownload = () => {
    const link = document.createElement("a");
    link.href = whitePaperPDF;
    link.setAttribute("download", "whitepaper.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="AppWrapper">
        <div className="svgBgc"></div>
        <div className="brand">
          <h1>DreamFundr</h1>
          <img src={logo} alt="logo" />
        </div>
        <div className="whitePaper" onClick={handleWhitePaperDownload}>
          <h2>White Paper</h2>
        </div>
        <Spline
          scene="https://prod.spline.design/3t0FvkraGDpuP4ZT/scene.splinecode"
          onLoad={onLoad}
          className="SplineScene"
        />
        <div className="BtnWrapper">
          <Button
            onClick={() => navigation("/create")}
            text="Create Donation"
          />
          <Button onClick={() => navigation("/donate")} text="Donate" />
        </div>
      </div>
      <div className="MissionWrapper">
        <div className="MissionContent">
          <h1 style={{ color: "#008A00", fontSize: "2.5rem" }}>Our Mission</h1>
          <p style={{ color: "white ", fontSize: "1.4rem" }}>
            Our web app revolutionizes crowdfunding by utilizing Ethereum. Users
            can directly finance projects without intermediaries, thanks to
            transparent and secure blockchain technology. Browse projects,
            invest with a few clicks, and leverage smart contracts for
            trustworthy fund transfers. Project initiators can present their
            ideas globally and raise necessary funds. Our platform also offers
            real-time updates on project progress and fund usage. Experience the
            future of crowdfunding with our P2P platform!
          </p>
        </div>
        <div className="MissionContent">
          <img src={missionSVG} alt="svg" />
        </div>
      </div>
      <div className="howItWorksHeader">
        <h1>How it works</h1>
      </div>
      <div className="howItWorksWrapper">
        <div className="howItWorksContent">
          <img src={workSVG} alt="work" />
        </div>
        <div className="howItWorksContent">
          <h1 style={{ color: "white" }}>
            <span className="numeration">1.</span> Install Metamask
          </h1>
          <h1 style={{ color: "white" }}>
            <span className="numeration">2.</span> Create an ETH Wallet
          </h1>
          <h1 style={{ color: "white" }}>
            <span className="numeration">3.</span> Connect Wallet to the Site
          </h1>
          <h1 style={{ color: "white" }}>
            <span className="numeration">4.</span> Create Goal or Donate
          </h1>
        </div>
      </div>
      <div className="footerWrapper">
        <h2>Copyright DreamFundr 2024</h2>
        <h2>All Rights reserved</h2>
      </div>
    </div>
  );
};

export default App;
