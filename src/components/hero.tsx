import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "./button";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <section id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Video background */}
        <video
          src="/videos/HeroVideo.mp4"
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        {/* Dark overlay to reduce brightness */}
        <div className="absolute left-0 top-0 z-10 size-full bg-black/40" />

        {/* Bottom-right CTA text */}
        <h1
          className="special-font hero-heading absolute bottom-5 right-5 z-40"
          style={{ color: "#F2F2F2" }}
        >
          R<b>a</b>ce Now!
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            {/* Karting Redefined headings with tighter line height */}
            <div className="leading-[0.9]">
              <h1
                className="special-font hero-heading"
                style={{ color: "#8B49FF" }}
              >
                Karti<b>n</b>g
              </h1>
              <h1
                className="special-font hero-heading -mt-4" // pull closer; tweak -mt-3/-mt-5 as needed
                style={{ color: "#C8FF32" }}
              >
                Redefi<b>n</b>ed
              </h1>
            </div>

            <p className="mb-5 max-w-92 font-robert-regular text-blue-100">
              The track is only the beginning. Purple Sector is where innovation,
              adrenaline,<br /> and play collide — creating a racing experience that
              belongs as much to <br /> tomorrow as it does to today.
            </p>

            <Button
              id="watch-trailer"
              leftIcon={TiLocationArrow}
              containerClass="bg-[#C8FF32] text-black flex-center gap-1 hover:brightness-95"
            >
              Download the App
            </Button>
          </div>
        </div>
      </div>

      {/* Background black Race Now text */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        R<b>a</b>ce now
      </h1>
    </section>
  );
};
