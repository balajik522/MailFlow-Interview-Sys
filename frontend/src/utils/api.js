export const getCampaigns = () => {
  return JSON.parse(localStorage.getItem("campaigns") || "[]");
};

export const saveCampaign = (campaign) => {
  const campaigns = getCampaigns();
  campaigns.push(campaign);
  localStorage.setItem("campaigns", JSON.stringify(campaigns));
};
