import aiLogo from "../assets/ai_mechatronics.jpeg";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-purple-200 to-pink-200">
      
      {/* LEFT → AI Logo */}
      <div className="w-1/2 flex items-center justify-end pr-8">
        <div className="w-full max-w-3xl flex items-center justify-center">
          <img
            src={aiLogo}
            alt="AI Lab Logo"
            className="w-full max-h-[450px] object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* RIGHT → LOGIN CARD */}
      <div className="w-1/2 flex items-center justify-start pl-8">
        <div className="w-full max-w-sm">
          
          {/* LOGIN CARD */}
          <div className="bg-white/80 backdrop-blur-md p-8 shadow-2xl border border-gray-200">
            {children}
          </div>

        </div>
      </div>

    </div>
  );
}