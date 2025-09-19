import { Button } from "./button";

export const Contact = () => {
  return (
    <section id="contact" className="my-20 w-full px-4">
      <div className="relative mx-auto max-w-screen-2xl rounded-xl bg-[#D0D5D4] py-20 text-black overflow-hidden">
        {/* Left mockup */}
        <img
          src="/img/MockupImg1.png"
          alt="Mockup 1"
          className="absolute bottom-0 left-6 sm:left-12 lg:left-20 
                     h-auto w-[200px] sm:w-[260px] md:w-[320px] lg:w-[360px] xl:w-[400px] object-contain"
        />

        {/* Right mockup */}
        <img
          src="/img/MockupImg2.png"
          alt="Mockup 2"
          className="absolute bottom-0 right-6 sm:right-12 lg:right-20 
                     h-auto w-[200px] sm:w-[260px] md:w-[320px] lg:w-[360px] xl:w-[400px] object-contain"
        />

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <p className="font-general text-[10px] uppercase tracking-widest">
            Now Available on Android and iOS
          </p>

          <p className="special-font mt-8 max-w-4xl font-zentry leading-[0.9]
                         text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Let&apos;s b<b>u</b>ild the
            <br /> new er<b>a</b> of <br /> k<b>a</b>rting t<b>o</b>gether
          </p>

          <Button containerClass="mt-10 cursor-pointer">Download Now</Button>
        </div>
      </div>
    </section>
  );
};
