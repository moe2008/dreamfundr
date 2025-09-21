import React, { useState, useEffect } from "react";
import useWeb3 from "../hooks/useLoadWeb3";
import crowdfunding from "../crowdfunding";
import "./DonateCampaignRoute.css";
import GoalCard from "../components/GoalCard";
import Button from "../components/Button";
import { getActualDate } from "../helpers/DateFormatter";
import { donateCampaignAnimation } from "../animations/donateCampaignAnimation";

import {
  ArrowLeft,
  Heart,
  Coins,
  Users,
  Calendar,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wallet,
  ExternalLink,
} from "lucide-react";

const DonateCampaign = () => {
  const { web3, accounts, loadWeb3, initializeWeb3, errorMsg } = useWeb3();
  const [campaigns, setCampaigns] = useState([]);
  const [campaignId, setCampaignId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isDonating, setIsDonating] = useState(false);

  // Mock date helper - replace with your actual implementation
  const getActualDate = () => new Date().toISOString();

  const donate = async () => {
    if (accounts.length === 0) {
      await loadWeb3();
    }

    if (accounts.length === 0) {
      console.error("No accounts available");
      setError(errorMsg);
      return;
    }

    try {
      await crowdfunding.methods.donate(campaignId).send({
        from: accounts[0],
        value: web3.utils.toWei(amount, "ether"),
        gas: 3000000,
      });
      loadCampaigns();
      setError("Thanks for your Donation");
    } catch (error) {
      setError("Campaign already funded or an error occurred");
      console.error(error);
    }
  };

  const loadCampaigns = async () => {
    const web3Instance = await initializeWeb3();
    if (!web3Instance) return;

    try {
      const campaignCount = await crowdfunding.methods.campaignCount().call();
      const campaignsArray = [];
      for (let i = 1; i <= campaignCount; i++) {
        const campaignData = await crowdfunding.methods
          .getCampaignDetails(i)
          .call();
        const goal = web3Instance.utils.fromWei(
          campaignData[1].toString(),
          "ether"
        );
        const raisedAmount = web3Instance.utils.fromWei(
          campaignData[2].toString(),
          "ether"
        );

        const campaign = {
          id: i,
          creator: campaignData[0],
          goal: goal,
          raisedAmount: raisedAmount,
          deadline: new Date(Number(campaignData[3]) * 1000).toLocaleString(),
          isFunded: campaignData[4],
          msg: campaignData[5],
        };

        console.log(campaignData[0]);

        if (campaign.deadline >= getActualDate() && !campaign.isFunded) {
          campaignsArray.push(campaign);
        }
      }
      setCampaigns(campaignsArray);
    } catch (error) {
      console.error("Error loading campaigns:", error);
    }
  };

  useEffect(() => {
    loadCampaigns();
    donateCampaignAnimation();
  }, []);

  const getMessageIcon = () => {
    if (error === "Thanks for your Donation") {
      return (
        <CheckCircle
          style={{ width: "18px", height: "18px", color: "#22c55e" }}
        />
      );
    } else if (
      error.includes("error") ||
      error.includes("Error") ||
      error.includes("funded")
    ) {
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
    if (error === "Thanks for your Donation") return "#22c55e";
    if (
      error.includes("error") ||
      error.includes("Error") ||
      error.includes("funded")
    )
      return "#ef4444";
    return "#f59e0b";
  };

  const formatAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const getProgressPercentage = (raised, goal) => {
    return Math.min((parseFloat(raised) / parseFloat(goal)) * 100, 100);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)",
        color: "white",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
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
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slide-up {
          animation: slideInUp 0.6s ease-out;
        }
        .animate-slide-left {
          animation: slideInLeft 0.6s ease-out;
        }
        .loading-spinner {
          animation: spin 1s linear infinite;
        }
        .input-focus:focus {
          border-color: #22c55e !important;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1) !important;
        }
        .campaign-card {
          transition: all 0.3s ease;
        }
        .campaign-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        @media (max-width: 768px) {
          .donate-container {
            margin: 10px !important;
            padding: 24px !important;
          }
          .campaigns-grid {
            grid-template-columns: 1fr !important;
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
          zIndex: 1000,
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

      {/* Main Content Container */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            paddingTop: "60px",
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
            <Heart style={{ width: "32px", height: "32px" }} />
          </div>

          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              margin: "0 0 8px 0",
              background: "linear-gradient(135deg, #22c55e, #3b82f6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Donate
          </h1>

          <p
            style={{
              color: "#9ca3af",
              margin: 0,
              fontSize: "18px",
            }}
          >
            Support innovative projects on the blockchain
          </p>
        </div>

        {/* Donation Form */}
        <div
          className="donate-container animate-slide-up"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            padding: "32px",
            maxWidth: "500px",
            margin: "0 auto 60px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "24px",
              textAlign: "center",
              color: "#d1d5db",
            }}
          >
            Make a Donation
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            {/* Campaign ID Input */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#9ca3af",
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
                Donation ID
              </label>
              <input
                className="input-focus"
                type="text"
                placeholder="Enter campaign ID (e.g. 1)"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Amount Input */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#9ca3af",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <Coins
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
                placeholder="e.g. 0.5"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Donate Button */}
          <button
            onClick={donate}
            disabled={isDonating || !campaignId || !amount}
            style={{
              width: "100%",
              padding: "14px",
              background:
                isDonating || !campaignId || !amount
                  ? "rgba(255, 255, 255, 0.1)"
                  : "linear-gradient(135deg, #22c55e, #3b82f6)",
              borderRadius: "10px",
              color: isDonating || !campaignId || !amount ? "#9ca3af" : "black",
              fontWeight: "600",
              border: "none",
              cursor:
                isDonating || !campaignId || !amount
                  ? "not-allowed"
                  : "pointer",
              transition: "all 0.3s ease",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
            onMouseEnter={(e) => {
              if (!isDonating && campaignId && amount) {
                e.target.style.transform = "scale(1.02)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isDonating && campaignId && amount) {
                e.target.style.transform = "scale(1)";
              }
            }}
          >
            {isDonating ? (
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
                Donating...
              </>
            ) : (
              <>
                <Heart style={{ width: "16px", height: "16px" }} />
                Donate
              </>
            )}
          </button>

          {/* Wallet Connection Notice */}
          <div
            style={{
              padding: "10px 14px",
              background:
                accounts.length > 0
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(245, 158, 11, 0.1)",
              border: `1px solid ${
                accounts.length > 0
                  ? "rgba(34, 197, 94, 0.3)"
                  : "rgba(245, 158, 11, 0.3)"
              }`,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            <Wallet
              style={{
                width: "14px",
                height: "14px",
                color: accounts.length > 0 ? "#22c55e" : "#f59e0b",
              }}
            />
            <span
              style={{
                color: accounts.length > 0 ? "#22c55e" : "#f59e0b",
              }}
            >
              {accounts.length > 0
                ? `Wallet connected: ${formatAddress(accounts[0])}`
                : "Please make sure that your ETH Wallet is connected."}
            </span>
          </div>

          {/* Message Display */}
          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 14px",
                background:
                  error === "Thanks for your Donation"
                    ? "rgba(34, 197, 94, 0.1)"
                    : error.includes("error") ||
                      error.includes("Error") ||
                      error.includes("funded")
                    ? "rgba(239, 68, 68, 0.1)"
                    : "rgba(245, 158, 11, 0.1)",
                border: `1px solid ${
                  error === "Thanks for your Donation"
                    ? "rgba(34, 197, 94, 0.3)"
                    : error.includes("error") ||
                      error.includes("Error") ||
                      error.includes("funded")
                    ? "rgba(239, 68, 68, 0.3)"
                    : "rgba(245, 158, 11, 0.3)"
                }`,
                borderRadius: "10px",
                color: getMessageColor(),
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {getMessageIcon()}
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* All Campaigns Section */}
        <div
          className="animate-slide-left"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            padding: "40px",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "8px",
              textAlign: "center",
              background: "linear-gradient(135deg, #22c55e, #3b82f6)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            All Donation Goals
          </h2>

          <p
            style={{
              color: "#9ca3af",
              textAlign: "center",
              marginBottom: "32px",
              fontSize: "16px",
            }}
          >
            Active campaigns looking for support
          </p>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "60px 0",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                className="loading-spinner"
                style={{
                  width: "32px",
                  height: "32px",
                  border: "3px solid rgba(255, 255, 255, 0.1)",
                  borderTop: "3px solid #22c55e",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#9ca3af" }}>Loading campaigns...</span>
            </div>
          ) : campaigns.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "#9ca3af",
              }}
            >
              <Users
                style={{
                  width: "48px",
                  height: "48px",
                  margin: "0 auto 16px",
                  opacity: 0.5,
                }}
              />
              <p style={{ fontSize: "18px", margin: 0 }}>
                No active campaigns found
              </p>
            </div>
          ) : (
            <div
              className="campaigns-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {campaigns.map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="campaign-card"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "16px",
                    padding: "24px",
                    animationDelay: `${index * 100}ms`,
                    animation: "slideInUp 0.6s ease-out forwards",
                    opacity: 0,
                  }}
                >
                  {/* Campaign Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                        color: "black",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      ID: {campaign.id}
                    </div>
                    <div
                      style={{
                        background: campaign.isFunded
                          ? "rgba(34, 197, 94, 0.2)"
                          : "rgba(245, 158, 11, 0.2)",
                        color: campaign.isFunded ? "#22c55e" : "#f59e0b",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {campaign.isFunded ? "Funded" : "Active"}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ fontSize: "14px", color: "#9ca3af" }}>
                        Progress
                      </span>
                      <span style={{ fontSize: "14px", fontWeight: "600" }}>
                        {getProgressPercentage(
                          campaign.raisedAmount,
                          campaign.goal
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "6px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${getProgressPercentage(
                            campaign.raisedAmount,
                            campaign.goal
                          )}%`,
                          height: "100%",
                          background:
                            "linear-gradient(135deg, #22c55e, #3b82f6)",
                          borderRadius: "3px",
                          transition: "width 0.5s ease",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Campaign Stats */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "#9ca3af",
                          fontSize: "12px",
                          display: "block",
                        }}
                      >
                        Goal
                      </span>
                      <span style={{ fontWeight: "600", color: "#22c55e" }}>
                        {campaign.goal} ETH
                      </span>
                    </div>
                    <div>
                      <span
                        style={{
                          color: "#9ca3af",
                          fontSize: "12px",
                          display: "block",
                        }}
                      >
                        Raised
                      </span>
                      <span style={{ fontWeight: "600" }}>
                        {campaign.raisedAmount} ETH
                      </span>
                    </div>
                  </div>

                  {/* Creator */}
                  <div style={{ marginBottom: "16px" }}>
                    <span
                      style={{
                        color: "#9ca3af",
                        fontSize: "12px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      Creator
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "14px",
                          color: "#3b82f6",
                        }}
                      >
                        {formatAddress(campaign.creator)}
                      </span>
                      <button
                        onClick={() =>
                          window.open(
                            `https://etherscan.io/address/${campaign.creator}`,
                            "_blank"
                          )
                        }
                        style={{
                          padding: "4px",
                          background: "transparent",
                          border: "none",
                          color: "#9ca3af",
                          cursor: "pointer",
                          transition: "color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#3b82f6";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#9ca3af";
                        }}
                      >
                        <ExternalLink
                          style={{ width: "12px", height: "12px" }}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div style={{ marginBottom: "16px" }}>
                    <span
                      style={{
                        color: "#9ca3af",
                        fontSize: "12px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      <Calendar
                        style={{
                          width: "12px",
                          height: "12px",
                          display: "inline",
                          marginRight: "4px",
                        }}
                      />
                      Deadline
                    </span>
                    <span style={{ fontSize: "14px" }}>
                      {campaign.deadline}
                    </span>
                  </div>

                  {/* Description */}
                  <div style={{ marginBottom: "20px" }}>
                    <span
                      style={{
                        color: "#9ca3af",
                        fontSize: "12px",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Description
                    </span>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        lineHeight: "1.5",
                        color: "#d1d5db",
                        background: "rgba(255, 255, 255, 0.05)",
                        padding: "12px",
                        borderRadius: "8px",
                      }}
                    >
                      {campaign.msg}
                    </p>
                  </div>

                  {/* Quick Donate Button */}
                  <button
                    onClick={() => {
                      setCampaignId(campaign.id.toString());
                      document
                        .querySelector(".donate-container")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "linear-gradient(135deg, #22c55e, #3b82f6)",
                      borderRadius: "10px",
                      color: "black",
                      fontWeight: "600",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    <Heart style={{ width: "16px", height: "16px" }} />
                    Support this Campaign
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #22c55e, #10b981)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                color: "white",
              }}
            >
              <Target style={{ width: "24px", height: "24px" }} />
            </div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 4px 0",
                color: "#22c55e",
              }}
            >
              {campaigns.length}
            </h3>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Active Campaigns
            </p>
          </div>

          <div
            style={{
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                color: "white",
              }}
            >
              <Coins style={{ width: "24px", height: "24px" }} />
            </div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 4px 0",
                color: "#3b82f6",
              }}
            >
              {campaigns
                .reduce(
                  (total, campaign) =>
                    total + parseFloat(campaign.raisedAmount),
                  0
                )
                .toFixed(2)}{" "}
              ETH
            </h3>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Total Raised
            </p>
          </div>

          <div
            style={{
              background: "rgba(168, 85, 247, 0.1)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #a855f7, #7c3aed)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                color: "white",
              }}
            >
              <Users style={{ width: "24px", height: "24px" }} />
            </div>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 4px 0",
                color: "#a855f7",
              }}
            >
              {new Set(campaigns.map((c) => c.creator)).size}
            </h3>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontSize: "14px",
              }}
            >
              Unique Creators
            </p>
          </div>
        </div>

        {/* How to Donate Guide */}
        <div
          style={{
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "24px",
            padding: "32px",
            marginBottom: "40px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "20px",
              textAlign: "center",
              color: "#3b82f6",
            }}
          >
            💡 How to Donate
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                step: "1",
                title: "Connect Wallet",
                description: "Make sure your MetaMask wallet is connected",
              },
              {
                step: "2",
                title: "Choose Campaign",
                description:
                  "Browse campaigns and find one you want to support",
              },
              {
                step: "3",
                title: "Enter Details",
                description: "Fill in the campaign ID and donation amount",
              },
              {
                step: "4",
                title: "Send Donation",
                description: "Click donate and confirm the transaction",
              },
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                    flexShrink: 0,
                  }}
                >
                  {step.step}
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      margin: "0 0 4px 0",
                      color: "white",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      color: "#9ca3af",
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: "1.4",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateCampaign;
