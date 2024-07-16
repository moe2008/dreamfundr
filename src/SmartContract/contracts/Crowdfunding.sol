// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Crowdfunding {
    struct Campaign {
        address payable creator;
        uint goal;
        uint raisedAmount;
        uint deadline;
        bool isFunded;
        string description;
    }

    mapping(uint => Campaign) public campaigns;
    uint public campaignCount;

    event CampaignCreated(
        uint campaignId,
        address creator,
        uint goal,
        uint deadline,
        string description
    );
    event DonationReceived(uint campaignId, address donor, uint amount);

    function createCampaign(uint _goal, uint _durationInDays, string memory _description) public {
        require(_goal > 0, "Goal must be greater than 0");
        require(_durationInDays > 0, "Duration must be greater than 0 days");
        require(bytes(_description).length > 0, "Description must not be empty");

        campaignCount++;
        campaigns[campaignCount] = Campaign({
            creator: payable(msg.sender),
            goal: _goal,
            raisedAmount: 0,
            deadline: block.timestamp + (_durationInDays * 1 days),
            isFunded: false,
            description: _description
        });

        emit CampaignCreated(
            campaignCount,
            msg.sender,
            _goal,
            block.timestamp + (_durationInDays * 1 days),
            _description
        );
    }

    function donate(uint _campaignId) public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(!campaign.isFunded, "Campaign is already funded");

        campaign.raisedAmount += msg.value;

        emit DonationReceived(_campaignId, msg.sender, msg.value);

        if (campaign.raisedAmount >= campaign.goal) {
            campaign.isFunded = true;
            campaign.creator.transfer(campaign.raisedAmount);
        }
    }

    function getCampaignDetails(
        uint _campaignId
    ) public view returns (address, uint, uint, uint, bool, string memory) {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.creator,
            campaign.goal,
            campaign.raisedAmount,
            campaign.deadline,
            campaign.isFunded,
            campaign.description
        );
    }

}

