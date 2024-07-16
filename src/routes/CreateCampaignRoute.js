import React, { useState, useEffect } from "react";
import useWeb3 from "../hooks/useLoadWeb3";
import Web3 from "web3";
import crowdfunding from "../crowdfunding";
import "./CreateCampaignRoute.css";
import Button from "../components/Button";
import { createCampaignAnimation } from "../animations/createCampaignAnimation";

const CreateCampaignRoute = () => {
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
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
    }
  };
  return (
    <div className="createCampaignWrapper">
      <div className="svgBgc"></div>
      <div className="createCampaignHeaderWrapper">
        <h2>Create Donation Goal</h2>
      </div>
      <div className="createCampaignContentWrapper">
        <input
          className="inputAnim"
          type="text"
          placeholder="Amount in Ether"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <input
          className="inputAnim"
          type="text"
          placeholder="Duration in Days"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <textarea
          rows={5}
          placeholder="Description of your goal"
          className="inputAnim"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={createCampaign} text="Create" />
        {message && <h1 style={{ color: "red" }}>{message}</h1>}
      </div>
    </div>
  );
};

export default CreateCampaignRoute;
