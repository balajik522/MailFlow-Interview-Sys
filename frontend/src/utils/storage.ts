export interface Campaign {
  subject: string;
  content: string;
  date: string;
}

export const getCampaigns = (): Campaign[] => {
  return JSON.parse(localStorage.getItem("campaigns") || "[]");
};

export const saveCampaign = (campaign: Campaign): void => {
  const campaigns = getCampaigns();
  campaigns.push(campaign);
  localStorage.setItem("campaigns", JSON.stringify(campaigns));
};
