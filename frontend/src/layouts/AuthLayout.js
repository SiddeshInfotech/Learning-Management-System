import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import aiLogo from "../assets/ai_mechatronics.jpeg";

export default function AuthLayout({ children }) {
    return (
        _jsx("div", {
            className: "min-h-screen w-full flex bg-purple-100",
            children: _jsxs("div", {
                className: "flex flex-1 items-center justify-center gap-8", 
                children: [
                    // LEFT → IMAGE
                    _jsx("div", {
                        className: "flex items-center justify-end",
                        children: _jsx("img", {
                            src: aiLogo,
                            alt: "AI Lab Logo",
                            className: "max-h-[450px] object-contain drop-shadow-xl"
                        })
                    }),

                    // RIGHT → LOGIN CARD
                    _jsx("div", {
                        className: "flex items-center justify-start",
                        children: _jsx("div", {
                            className: "w-full max-w-sm bg-white/80 backdrop-blur-md p-8 shadow-2xl border border-gray-200",
                            children: children
                        })
                    })
                ]
            })
        })
    );
}