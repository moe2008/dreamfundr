import React, { useState, useEffect } from "react";
import useWeb3 from "../hooks/useLoadWeb3";
import crowdfunding from "../crowdfunding";
import "./DonateCampaignRoute.css";
import GoalCard from "../components/GoalCard";
import Button from "../components/Button";
import { getActualDate } from "../helpers/DateFormatter";
import { donateCampaignAnimation } from "../animations/donateCampaignAnimation";

const DonateCampaign = () => {
  const { web3, accounts, loadWeb3, initializeWeb3, errorMsg } = useWeb3();
  const [campaigns, setCampaigns] = useState([]);
  const [campaignId, setCampaignId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="DonateCampaignWrapper">
      <div className="bg"></div>
      <div className="svgBG"></div>
      <div className="DonateCampaignHeaderWrapper">
        <h2>Donate</h2>
      </div>
      <div className="DonateCampaignContentWrapper">
        <div className="InputDiv">
          <input
            className="inputAnimation"
            type="text"
            placeholder="Donation ID"
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
          />
          <input
            className="inputAnimation"
            type="text"
            placeholder="Amount in Ether"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button onClick={donate} text="Donate" />
          <p className="inputAnimation">
            Please make sure that your ETH Wallet is connected.
          </p>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
      <div className="AllCampaignSection">
        <h2>All Donation Goals</h2>
        <div className="DonateCampaignAllCampaignWrapper">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="goalAnim">
              <GoalCard
                id={campaign.id}
                creator={campaign.creator}
                goal={campaign.goal}
                raised={campaign.raisedAmount}
                deadline={campaign.deadline}
                funded={campaign.isFunded ? "Funded" : "Not Funded"}
                msg={campaign.msg}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonateCampaign;
