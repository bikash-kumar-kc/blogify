import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Features,
  PopularPost,
  Footer,
  GradientTextHeader,
  Hero,
} from "../../components";
import { toast } from "sonner";

const LandingPage = () => {
  // states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const container = useRef();
  const isWarned = useRef(false);

  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
  ];

  // rotating image in background
  useEffect(() => {
    if (!isWarned.current) {
      toast.warning(
        "The cold start of server is 50s or more. Service may be interrupted.",
      );
      isWarned.current = true;
    }
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".animate-item", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  return (
    <div>
      <div>
        {/* Hero section */}
        <Hero />

        {/* Features Section  */}
        <section className="min-h-screen flex flex-col items-center  text-center bg-[#1e293b]">
          <GradientTextHeader />
          <Features
            image="/images/createPost.jpg"
            title="Create Post"
            description="Write effortlessly with our modern rich text editor, featuring real-time formatting, media embedding, and a clean, distraction-free interface that helps your content look polished and professional every time."
            imageLeft={true}
          />
          <Features
            // delay="2"
            image="/images/readingPost.jpg"
            title="Explore Post"
            description="Seamlessly read published posts with optimized layout and readability."
            imageLeft={false}
          />
          <Features
            // delay="2.5"
            image="/images/comment.jpg"
            title="Comment"
            description="Engage with posts through an interactive commenting system."
            imageLeft={true}
          />
          <Features
            // delay="3"
            image="/images/follow.jpg"
            title="Follow"
            description="Stay connected by following authors and their content."
            imageLeft={false}
          />
          <Features
            // delay="3.5"
            image="/images/notification.jpg"
            title="Notification"
            description="Receive real-time notifications to never miss important updates."
            imageLeft={true}
          />
        </section>

        {/* Popular Section */}
        <section className="min-h-screen flex gap-4 flex-col wrap items-center justify-center w-full text-center bg-[#0f172a] overflow-x-hidden">
          <GradientTextHeader text="Popular Posts" />
          <div className="grid grid-cols-1 mb-7 md:grid-cols-2 gap-8 px-4 w-full place-items-center  mx-auto">
            <PopularPost direction="left" />
            <PopularPost direction="right" />
            <PopularPost direction="left" />
            <PopularPost direction="right" />
          </div>
        </section>

        <section className=" flex gap-4 flex-col wrap items-center w-full text-center bg-[#020617] overflow-x-hidden">
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
