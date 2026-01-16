import { LogIn } from "lucide-react";
import { SquareChevronRight } from 'lucide-react';

const Button = ({ btnName="Log in" }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        className={`group relative flex items-center gap-3  px-4 lg:px-8 py-2 lg:py-4 font-bold tracking-widest uppercase transition-all duration-300 border-2 rounded-lg bg-transparent ${btnName=="Log in"?"border-cyan-400 text-cyan-400 hover:text-black hover:bg-cyan-400":"border-green-400 text-green-400 hover:text-black hover:bg-green-400"}`}
        style={{
          // Custom inline shadow for the neon "bloom" effect
          boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)",
        }}
      >
        <span className="relative z-10">{btnName}</span>

        {/* Animated Icon */}
       {btnName=="Log in" ? ( <LogIn className="relative z-10 w-5 h-5 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110" />):(<SquareChevronRight className="relative z-10 w-5 h-5 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110" />)}

        {/* Inner scanline animation effect */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden rounded-md">
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        </div>
      </button>
    </div>
  );
};

export default Button;
