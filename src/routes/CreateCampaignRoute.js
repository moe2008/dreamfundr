import React, { useState, useEffect } from "react";
import useWeb3 from "../hooks/useLoadWeb3";
import Web3 from "web3";
import crowdfunding from "../crowdfunding";
import Button from "../components/Button";
import { createCampaignAnimation } from "../animations/createCampaignAnimation";

import {
  ArrowLeft,
  Target,
  Clock,
  FileText,
  Wallet,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
} from "lucide-react";

const CreateCampaignRoute = () => {
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { accounts, loadWeb3 } = useWeb3();
  useEffect(() => {
    loadWeb3();
    createCampaignAnimation();
  }, []);

  const createCampaign = async () => {
    if (accounts.length === 0) {
      console.error("No accounts available");
      setMessage("Try Again");
      return;
    }

    if (!goal || !duration || !description) {
      setMessage("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const goalInWei = Web3.utils.toWei(goal, "ether");
      const durationInDays = duration;

      await crowdfunding.methods
        .createCampaign(goalInWei, durationInDays, description)
        .send({
          from: accounts[0],
          gas: 3000000,
          gasPrice: Web3.utils.toWei("20", "gwei"),
        });

      setMessage("Created");
    } catch (error) {
      setMessage("Error. Make sure everything is set up correctly.");
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageIcon = () => {
    if (message === "Created") {
      return (
        <CheckCircle
          style={{ width: "18px", height: "18px", color: "#22c55e" }}
        />
      );
    } else if (message.includes("Error") || message === "Try Again") {
      return (
        <XCircle style={{ width: "18px", height: "18px", color: "#ef4444" }} />
      );
    } else {
      return (
        <AlertCircle
          style={{ width: "18px", height: "18px", color: "#f59e0b" }}
        />
      );
    }
  };

  const getMessageColor = () => {
    if (message === "Created") return "#22c55e";
    if (message.includes("Error") || message === "Try Again") return "#ef4444";
    return "#f59e0b";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)",
        color: "white",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slide-up {
          animation: slideInUp 0.6s ease-out;
        }
        .loading-spinner {
          animation: spin 1s linear infinite;
        }
        .input-focus:focus {
          border-color: #22c55e !important;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1) !important;
        }
        @media (max-width: 640px) {
          .form-container {
            margin: 10px !important;
            padding: 24px !important;
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
            top: "-100px",
            right: "-100px",
            width: "200px",
            height: "200px",
            background: "rgba(168, 85, 247, 0.2)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "200px",
            height: "200px",
            background: "rgba(59, 130, 246, 0.2)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "pulse 4s ease-in-out infinite 1s",
          }}
        ></div>
      </div>

      {/* Back Button */}
      <button
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          color: "white",
          zIndex: 10,
        }}
        onClick={() => window.history.back()}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)";
          e.target.style.transform = "translateX(-4px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.1)";
          e.target.style.transform = "translateX(0)";
        }}
      >
        <ArrowLeft style={{ width: "18px", height: "18px" }} />
      </button>

      {/* Main Form Container */}
      <div
        className="form-container animate-slide-up"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          padding: "40px",
          maxWidth: "480px",
          width: "100%",
          margin: "20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #22c55e, #3b82f6)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "black",
            }}
          >
            <Target style={{ width: "32px", height: "32px" }} />
          </div>

          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              margin: "0 0 8px 0",
              background: "linear-gradient(135deg, #22c55e, #3b82f6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Create Donation Goal
          </h2>

          <p
            style={{
              color: "#9ca3af",
              margin: 0,
              fontSize: "16px",
            }}
          >
            Start your decentralized crowdfunding campaign
          </p>
        </div>

        {/* Form Fields */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          {/* Goal Input */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#d1d5db",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <Target
                style={{
                  width: "14px",
                  height: "14px",
                  display: "inline",
                  marginRight: "6px",
                }}
              />
              Amount in Ether
            </label>
            <input
              className="input-focus"
              type="number"
              step="0.01"
              placeholder="e.g. 5.0"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                color: "white",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Duration Input */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#d1d5db",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <Clock
                style={{
                  width: "14px",
                  height: "14px",
                  display: "inline",
                  marginRight: "6px",
                }}
              />
              Duration in Days
            </label>
            <input
              className="input-focus"
              type="number"
              placeholder="e.g. 30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                color: "white",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#d1d5db",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <FileText
                style={{
                  width: "14px",
                  height: "14px",
                  display: "inline",
                  marginRight: "6px",
                }}
              />
              Description of your goal
            </label>
            <textarea
              className="input-focus"
              rows={4}
              placeholder="Describe your project and how the funds will be used..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                color: "white",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s ease",
                resize: "vertical",
                minHeight: "100px",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={createCampaign}
          disabled={isLoading || !goal || !duration || !description}
          style={{
            width: "100%",
            padding: "16px",
            background:
              isLoading || !goal || !duration || !description
                ? "rgba(255, 255, 255, 0.1)"
                : "linear-gradient(135deg, #22c55e, #3b82f6)",
            borderRadius: "12px",
            color:
              isLoading || !goal || !duration || !description
                ? "#9ca3af"
                : "black",
            fontWeight: "600",
            border: "none",
            cursor:
              isLoading || !goal || !duration || !description
                ? "not-allowed"
                : "pointer",
            transition: "all 0.3s ease",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
          onMouseEnter={(e) => {
            if (!isLoading && goal && duration && description) {
              e.target.style.transform = "scale(1.02)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading && goal && duration && description) {
              e.target.style.transform = "scale(1)";
            }
          }}
        >
          {isLoading ? (
            <>
              <div
                className="loading-spinner"
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid transparent",
                  borderTop: "2px solid currentColor",
                  borderRadius: "50%",
                }}
              ></div>
              Creating...
            </>
          ) : (
            <>
              <Zap style={{ width: "16px", height: "16px" }} />
              Create Campaign
            </>
          )}
        </button>

        {/* Message Display */}
        {message && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 16px",
              background:
                message === "Created"
                  ? "rgba(34, 197, 94, 0.1)"
                  : message.includes("Error") || message === "Try Again"
                  ? "rgba(239, 68, 68, 0.1)"
                  : "rgba(245, 158, 11, 0.1)",
              border: `1px solid ${
                message === "Created"
                  ? "rgba(34, 197, 94, 0.3)"
                  : message.includes("Error") || message === "Try Again"
                  ? "rgba(239, 68, 68, 0.3)"
                  : "rgba(245, 158, 11, 0.3)"
              }`,
              borderRadius: "12px",
              color: getMessageColor(),
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {getMessageIcon()}
            <span>{message}</span>
          </div>
        )}

        {/* Connection Status */}
        <div
          style={{
            marginTop: "20px",
            padding: "12px 16px",
            background:
              accounts.length > 0
                ? "rgba(34, 197, 94, 0.1)"
                : "rgba(245, 158, 11, 0.1)",
            border: `1px solid ${
              accounts.length > 0
                ? "rgba(34, 197, 94, 0.3)"
                : "rgba(245, 158, 11, 0.3)"
            }`,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
          }}
        >
          <Wallet
            style={{
              width: "16px",
              height: "16px",
              color: accounts.length > 0 ? "#22c55e" : "#f59e0b",
            }}
          />
          <span
            style={{
              color: accounts.length > 0 ? "#22c55e" : "#f59e0b",
            }}
          >
            {accounts.length > 0
              ? `Connected: ${accounts[0].substring(
                  0,
                  6
                )}...${accounts[0].substring(accounts[0].length - 4)}`
              : "No wallet connected"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignRoute;
