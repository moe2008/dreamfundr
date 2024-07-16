import React from "react";
import "./GoalCard.css";

const GoalCard = (props) => {
  return (
    <div class="nft">
      <div class="main">
        <h2 className="cardID">{props.id}</h2>
        <div className="creatorAddress">
          <h2>Creator</h2>
          <p className="description">{props.creator}</p>
        </div>
        <p class="description">{props.msg}</p>
        <div class="tokenInfo">
          <div class="price">
            <ins>◘</ins>
            <p>{props.goal + " Ether"}</p>
          </div>
          <div class="duration">
            <ins>◷</ins>
            <p>{props.deadline}</p>
          </div>
        </div>
        <div className="tokenInfo">
          <div class="price">
            <ins>◘</ins>
            <p>{props.raised + " Ether"}</p>
          </div>
          <div class="duration">
            <ins>◷</ins>
            <p>{props.funded}</p>
          </div>
        </div>

        <hr />
      </div>
    </div>
  );
};

export default GoalCard;
