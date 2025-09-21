import React, { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Download,
  Wallet,
  Target,
  Users,
  Shield,
  ArrowRight,
  Check,
  Zap,
  Globe,
  Coins,
} from "lucide-react";
import whitePaperPDF from "../WhitePaper.pdf";
import { appAnimation } from "../animations/appAnimation";

const DreamFundrLanding = () => {
  const splineRef = useRef();
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

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

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Spline load handler
  function onLoad(spline) {
    const obj = spline.findObjectById("2ec53e6f-d327-4a11-81ab-9eff1dca64e1");
    splineRef.current = obj;

    if (splineRef.current) {
      console.log("Spline object loaded");
    }
  }

  const features = [
    {
      icon: <Shield style={{ width: "32px", height: "32px" }} />,
      title: "Secure & Transparent",
      description:
        "Smart contracts on Ethereum guarantee full transparency and security",
    },
    {
      icon: <Users style={{ width: "32px", height: "32px" }} />,
      title: "Peer-to-Peer",
      description: "Direct financing without intermediaries or hidden fees",
    },
    {
      icon: <Globe style={{ width: "32px", height: "32px" }} />,
      title: "Globally Accessible",
      description:
        "Worldwide reach for projects and investors without geographical boundaries",
    },
    {
      icon: <Zap style={{ width: "32px", height: "32px" }} />,
      title: "Instant Settlement",
      description:
        "Fast and efficient transactions powered by blockchain technology",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Install MetaMask",
      description: "Download and install the MetaMask browser extension",
      icon: <Wallet style={{ width: "48px", height: "48px" }} />,
    },
    {
      number: "02",
      title: "Create ETH Wallet",
      description: "Set up your secure Ethereum wallet with MetaMask",
      icon: <Coins style={{ width: "48px", height: "48px" }} />,
    },
    {
      number: "03",
      title: "Connect Wallet",
      description: "Securely connect your wallet to the DreamFundr platform",
      icon: <Shield style={{ width: "48px", height: "48px" }} />,
    },
    {
      number: "04",
      title: "Launch Project",
      description: "Create your crowdfunding project or support others",
      icon: <Target style={{ width: "48px", height: "48px" }} />,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)",
        color: "white",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
      }}
    >
      {/* CSS Keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
          40%, 43% { transform: translate3d(0, -30px, 0); }
          70% { transform: translate3d(0, -15px, 0); }
          90% { transform: translate3d(0, -4px, 0); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-title {
            font-size: 48px !important;
          }
          .hero-small-text {
            font-size: 32px !important;
          }
          .mission-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .steps-container {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-buttons {
            flex-direction: column !important;
          }
          .cta-buttons {
            flex-direction: column !important;
          }
          .footer-content {
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* Animated Background Elements */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-160px",
            right: "-160px",
            width: "320px",
            height: "320px",
            background: "rgba(168, 85, 247, 0.2)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            left: "-160px",
            width: "320px",
            height: "320px",
            background: "rgba(59, 130, 246, 0.2)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite 1s",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "384px",
            height: "384px",
            background: "rgba(34, 197, 94, 0.1)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite 2s",
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <div
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
        }}
      >
        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px",
            position: "relative",
            zIndex: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              DF
            </div>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                margin: 0,
              }}
            >
              DreamFundr
            </h1>
          </div>

          <button
            onClick={handleWhitePaperDownload}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textDecoration: "none",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <Download style={{ width: "16px", height: "16px" }} />
            <span>Whitepaper</span>
            <ArrowRight style={{ width: "16px", height: "16px" }} />
          </button>
        </nav>

        {/* Hero Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            className="hero-grid"
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                opacity: isVisible.hero ? 1 : 0,
                transform: isVisible.hero
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "all 0.8s ease-out",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  background:
                    "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))",
                  borderRadius: "50px",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  fontSize: "14px",
                  width: "fit-content",
                }}
              >
                <Zap
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "8px",
                    color: "#22c55e",
                  }}
                />
                <span>Die Zukunft des Crowdfundings</span>
              </div>

              <h1
                className="hero-title"
                style={{
                  fontSize: "72px",
                  fontWeight: "bold",
                  lineHeight: "1.1",
                  margin: 0,
                }}
              >
                Web3
                <span
                  style={{
                    display: "block",
                    background:
                      "linear-gradient(135deg, #22c55e, #3b82f6, #a855f7)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Crowdfunding
                </span>
                <span
                  className="hero-small-text"
                  style={{
                    display: "block",
                    fontSize: "48px",
                    color: "#d1d5db",
                  }}
                >
                  revolutioniert
                </span>
              </h1>

              <p
                style={{
                  fontSize: "20px",
                  color: "#d1d5db",
                  lineHeight: "1.6",
                  maxWidth: "500px",
                }}
              >
                Decentralized project financing on the Ethereum blockchain.
                Transparent, secure, and without intermediaries.
              </p>

              <div
                className="hero-buttons"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                }}
              >
                <button
                  style={{
                    padding: "16px 32px",
                    background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                    borderRadius: "50px",
                    color: "black",
                    fontWeight: "600",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px",
                  }}
                  onClick={() => navigate("/create")}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Create Project
                  <ArrowRight style={{ width: "20px", height: "20px" }} />
                </button>
                <button
                  style={{
                    padding: "16px 32px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "50px",
                    color: "white",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "16px",
                  }}
                  onClick={() => navigate("/donate")}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  Discover projects
                </button>
              </div>
            </div>

            {/* Spline Container */}
            <div
              style={{
                position: "relative",
                height: "600px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))",
                  borderRadius: "24px",
                  backdropFilter: "blur(10px)",
                  overflow: "hidden",
                }}
              >
                <Spline
                  scene="https://prod.spline.design/3t0FvkraGDpuP4ZT/scene.splinecode"
                  onLoad={onLoad}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "24px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            animation: "bounce 2s infinite",
          }}
        >
          <ChevronDown
            style={{ width: "24px", height: "24px", color: "#9ca3af" }}
          />
        </div>
      </div>

      {/* Features Section */}
      <section
        id="features"
        style={{
          padding: "128px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            opacity: isVisible.features ? 1 : 0,
            transform: isVisible.features
              ? "translateY(0)"
              : "translateY(30px)",
            transition: "all 0.8s ease-out",
          }}
        >
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Why{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              DreamFundr?
            </span>
          </h2>
          <p
            style={{
              fontSize: "20px",
              color: "#d1d5db",
              maxWidth: "768px",
              margin: "0 auto 80px",
              textAlign: "center",
            }}
          >
            Experience the next generation of crowdfunding with cutting-edge
            blockchain technology.
          </p>
        </div>

        <div
          className="features-grid"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                padding: "32px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                transition: "all 0.5s ease",
                cursor: "pointer",
                opacity: isVisible.features ? 1 : 0,
                transform: isVisible.features
                  ? "translateY(0)"
                  : "translateY(30px)",
                transitionDelay: `${index * 200}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                  marginBottom: "24px",
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  lineHeight: "1.6",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        style={{
          padding: "128px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="mission-grid"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              opacity: isVisible.mission ? 1 : 0,
              transform: isVisible.mission
                ? "translateX(0)"
                : "translateX(-30px)",
              transition: "all 0.8s ease-out",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 16px",
                background:
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))",
                borderRadius: "50px",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                fontSize: "14px",
                width: "fit-content",
              }}
            >
              <Target
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "8px",
                  color: "#22c55e",
                }}
              />
              <span>Unsere Vision</span>
            </div>

            <h2
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              The{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Mission
              </span>
            </h2>

            <p
              style={{
                fontSize: "20px",
                color: "#d1d5db",
                lineHeight: "1.6",
              }}
            >
              We are revolutionizing crowdfunding through the Ethereum
              blockchain. Users can directly fund projects—without
              intermediaries, thanks to transparent and secure blockchain
              technology.
            </p>

            <div>
              {[
                {
                  title: "Transparency through Smart Contracts",
                  description: "Full traceability of all transactions",
                },
                {
                  title: "Global Reach",
                  description: "Project presentation and funding worldwide",
                },
                {
                  title: "Real-Time Updates",
                  description:
                    "Live tracking of project progress and fund usage",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      background: "#22c55e",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  >
                    <Check
                      style={{ width: "12px", height: "12px", color: "black" }}
                    />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "white",
                        margin: "0 0 4px 0",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        color: "#d1d5db",
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              position: "relative",
              opacity: isVisible.mission ? 1 : 0,
              transform: isVisible.mission
                ? "translateX(0)"
                : "translateX(30px)",
              transition: "all 0.8s ease-out",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "400px",
                background:
                  "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))",
                borderRadius: "24px",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "96px",
                    height: "96px",
                    background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                    borderRadius: "16px",
                    margin: "0 auto 16px",
                    animation: "pulse 2s infinite",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        style={{
          padding: "128px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "80px",
            opacity: isVisible["how-it-works"] ? 1 : 0,
            transform: isVisible["how-it-works"]
              ? "translateY(0)"
              : "translateY(30px)",
            transition: "all 0.8s ease-out",
          }}
        >
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            How{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              it works
            </span>
          </h2>
          <p
            style={{
              fontSize: "20px",
              color: "#d1d5db",
              maxWidth: "768px",
              margin: "0 auto",
            }}
          >
            Decentralized crowdfunding in four simple steps
          </p>
        </div>

        <div
          className="steps-container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "24px",
                  padding: "24px",
                  borderRadius: "16px",
                  transition: "all 0.5s ease",
                  cursor: "pointer",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background:
                    activeStep === index
                      ? "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))"
                      : "rgba(255, 255, 255, 0.05)",
                  borderColor:
                    activeStep === index
                      ? "rgba(34, 197, 94, 0.3)"
                      : "rgba(255, 255, 255, 0.1)",
                  opacity: isVisible["how-it-works"] ? 1 : 0,
                  transform: isVisible["how-it-works"]
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transitionDelay: `${index * 200}ms`,
                }}
                onClick={() => setActiveStep(index)}
                onMouseEnter={(e) => {
                  if (activeStep !== index) {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeStep !== index) {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.05)";
                  }
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    flexShrink: 0,
                    background:
                      activeStep === index
                        ? "linear-gradient(135deg, #22c55e, #3b82f6)"
                        : "rgba(255, 255, 255, 0.1)",
                    color: activeStep === index ? "black" : "white",
                  }}
                >
                  {step.icon}
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "monospace",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        background:
                          activeStep === index
                            ? "#22c55e"
                            : "rgba(255, 255, 255, 0.1)",
                        color: activeStep === index ? "black" : "#9ca3af",
                      }}
                    >
                      {step.number}
                    </span>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      color: "#d1d5db",
                      margin: 0,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              position: "relative",
              opacity: isVisible["how-it-works"] ? 1 : 0,
              transform: isVisible["how-it-works"]
                ? "translateX(0)"
                : "translateX(30px)",
              transition: "all 0.8s ease-out",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "400px",
                background:
                  "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))",
                borderRadius: "24px",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "96px",
                    height: "96px",
                    background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                    borderRadius: "16px",
                    margin: "0 auto 16px",
                    animation: "pulse 2s infinite",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "128px 24px",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "32px",
            }}
          >
            Ready for the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Future?
            </span>
          </h2>
          <p
            style={{
              fontSize: "20px",
              color: "#d1d5db",
              marginBottom: "48px",
              maxWidth: "600px",
              margin: "0 auto 48px",
            }}
          >
            Start your first decentralized crowdfunding project today or support
            innovative ideas worldwide.
          </p>

          <div
            className="cta-buttons"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "24px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                padding: "20px 40px",
                background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                borderRadius: "50px",
                color: "black",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                fontSize: "18px",
              }}
              onClick={() => navigate("/create")}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              Start Project
              <ArrowRight style={{ width: "20px", height: "20px" }} />
            </button>
            <button
              style={{
                padding: "20px 40px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50px",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "18px",
              }}
              onClick={() => navigate("/donate")}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
              }}
            >
              Discover Projects
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "48px 24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="footer-content"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              DF
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              DreamFundr
            </span>
          </div>

          <div
            style={{
              textAlign: "center",
              color: "#9ca3af",
            }}
          >
            <p style={{ margin: 0 }}>
              &copy; 2025 DreamFundr. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DreamFundrLanding;
