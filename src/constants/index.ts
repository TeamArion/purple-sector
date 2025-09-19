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
  feature4:"/videos/FeatureVideo1.mp4"
};
