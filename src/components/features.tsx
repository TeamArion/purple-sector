import { TiLocationArrow } from "react-icons/ti";
import { PropsWithChildren, useRef, useState } from "react";
import { VIDEO_LINKS } from "@/constants";

// Tilt wrapper
interface BentoTiltProps {
  className?: string;
}

const BentoTilt = ({
  children,
  className = "",
}: PropsWithChildren<BentoTiltProps>) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// BentoCard supports video or image
interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description?: string;
  mediaType?: "video" | "image";
  textColor?: string;
  darken?: boolean; // ✅ brightness overlay
}

const isVideoExt = (s: string) => /\.(mp4|webm|ogg)$/i.test(s);

const BentoCard = ({
  src,
  title,
  description,
  mediaType,
  textColor,
  darken,
}: BentoCardProps) => {
  const useVideo = mediaType ? mediaType === "video" : isVideoExt(src);

  return (
    <article className="relative size-full overflow-hidden rounded-md">
      {useVideo ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          alt="feature media"
          className="absolute left-0 top-0 size-full object-cover object-center"
          loading="lazy"
          crossOrigin="anonymous"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.background = "#111";
          }}
        />
      )}

      {/* ✅ subtle dark overlay */}
      {darken && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      )}

      <div
        className={`relative z-10 flex size-full flex-col justify-between p-5 ${
          textColor ?? "text-blue-50"
        }`}
      >
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="text-xl mt-3 max-w-64 md:text-base">{description}</p>
          )}
        </div>
      </div>
    </article>
  );
};

// Features Section
export const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Step Into Purple Sector
          </p>

          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            From live leaderboards and dynamic events to community-driven play
            and digital rewards, Purple Sector brings every part of racing into
            one seamless experience.
          </p>
        </div>

        {/* First large card */}
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src={VIDEO_LINKS.feature4}
            title={
              <>
                I<b>n</b>to the purple <b>v</b>erse
              </>
            }
            description="From friendly races to wild leagues. Every lap adds a new story to the Purple Verse. It&apos;s where the game never really ends."
            mediaType="video"
            darken
          />
        </BentoTilt>

        {/* Grid cards */}
        <div id="nexus" className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          {/* ✅ Zigma card with black text */}
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src={VIDEO_LINKS.feature2}
              title={
                <>
                  GET. SET. R<b>A</b>CE.
                </>
              }
              description="Where speed meets community, compete, connect, and climb the leaderboard in the ultimate karting experience"
              mediaType="image"
              textColor="text-black"
            />
          </BentoTilt>

          {/* ✅ Nexus card with dark overlay + white text */}
          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src={VIDEO_LINKS.feature3}
              title={
                <>
                  Liv<b>e</b> Le<b>a</b>derbo<b>a</b>rds
                </>
              }
              description="Watch the board light up as races unfold. Every lap, every overtake, every bragging right counted as it happens."
              mediaType="image"
              textColor="text-white"
              darken
            />
          </BentoTilt>

          {/* ✅ Azul card with dark overlay + white text */}
          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="/img/FeaturesImage3.png"
              title={
                <>
                  C<b>a</b>ught i<b>n</b> <b>4</b>K
                </>
              }
              description="Built-in trackside cameras catch you mid-race. High-speed shots and videos, ready to save or share."
              mediaType="image"
              textColor="text-white"
              darken
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                M<b>o</b>re co<b>m</b>ing so<b>o</b>n!
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          {/* ✅ replaced video with darkened image + heading/desc */}
          <BentoTilt className="bento-tilt_2">
            <BentoCard
              src="/img/FeaturesImage4.png"
              title={
                <>
                  Purp<b>l</b>e S<b>e</b>ctor Exper<b>i</b>ence
                </>
              }
              description="Your all-access pass to racing’s future — blending competition, community, and rewards into one seamless karting journey."
              mediaType="image"
              textColor="text-white"
              darken
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};
