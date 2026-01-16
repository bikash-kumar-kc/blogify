import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { Box } from "@chakra-ui/react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef();

  useGSAP(
    () => {
      gsap.from(".footer-content", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "expo.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <Box
      as="footer"
      pt="16"
      pb="8"
      ref={footerRef}
      className="bg-slate-950 border-t border-white/5  overflow-hidden"
    >
      <Box as="div" className="footer-content max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center pb-12">
          {/* Column 1: Brand/Image */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-12 h-12  rounded-lg flex items-center justify-center ">
              {/* Replace with your logo/image */}
              <img src="/images/image1.jpg" alt="Logo" className="rounded" />
            </div>
            <p className="text-slate-400 text-sm max-w-xs text-center md:text-left">
              Share and Explore to value.
            </p>
          </div>

          {/* Column 2: Social Links */}
          <div className="flex flex-col items-center gap-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">
              Follow the Pulse
            </h4>
            <div className="flex gap-6">
              <SocialIcon Icon={Github} link="#" />
              <SocialIcon Icon={Twitter} link="#" />
              <SocialIcon Icon={Linkedin} link="#" />
              <SocialIcon Icon={Instagram} link="#" />
            </div>
          </div>

          {/* Column 3: Newsletter/Action */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <button className="px-6 py-2 border border-cyan-500 text-cyan-500 rounded-full hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              Contact Us
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()}{" "}
            <span className="text-cyan-500/80 font-semibold"></span>. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </Box>
    </Box>
  );
};

// Helper Social Component
const SocialIcon = ({ Icon, link }) => (
  <a
    href={link}
    className="text-slate-400 hover:text-cyan-400 hover:scale-125 transition-all duration-300 transform"
  >
    <Icon size={24} />
  </a>
);

export default Footer;
