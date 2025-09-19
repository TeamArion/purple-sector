import { FaDiscord, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa";

export const NAV_ITEMS = [
  { label: "Download the app", href: "#hero" },
  { label: "PS.Community", href: "#about" },
  { label: "Experiences", href: "#nexus" },
  { label: "Our Story", href: "#story" },
  { label: "Join Us", href: "#contact" },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/sanidhyy/game-website",
} as const;

export const SOCIAL_LINKS = [
  {
    href: "https://discord.com",
    icon: FaDiscord,
  },
  {
    href: "https://twitter.com",
    icon: FaTwitter,
  },
  {
    href: "https://youtube.com",
    icon: FaYoutube,
  },
  {
    href: "https://twitch.com",
    icon: FaTwitch,
  },
] as const;

export const VIDEO_LINKS = {
  feature1:"/videos/HeroVideo.mp4",
  feature2:"/img/FeaturesImage1.png",
  feature3:"/img/FeaturesImage2.png",
  feature4:"/videos/FeatureVideo1.mp4",
  feature5:
    "https://93w95scdts.ufs.sh/f/AOfILeWJzqCc1qT68sSEu6tgkCBNP3FH45AUe70hrbTaxYDm",
  hero1:
    "https://93w95scdts.ufs.sh/f/AOfILeWJzqCc5wEKtxLYRyJDZsOPGdFTt0lQuHLkeqjKCao1",
  hero2:
    "https://93w95scdts.ufs.sh/f/AOfILeWJzqCcLjP2Y7QEQuN5THDwzeBx4OvmaFZjP6ysCKk3",
  hero3:
    "https://93w95scdts.ufs.sh/f/AOfILeWJzqCcpmpmzmuj1IHWSEokgRuN2hMcUpBq0xQery3i",
  hero4:
    "https://93w95scdts.ufs.sh/f/AOfILeWJzqCcpB0GHsouj1IHWSEokgRuN2hMcUpBq0xQery3",
};
