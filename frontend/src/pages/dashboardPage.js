import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "../context/AuthContext";
export default function DashboardPage() {
    const { user, logout } = useAuth();
    return (_jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Dashboard" }), _jsxs("p", { children: ["Welcome, ", user?.username, "!"] }), _jsx("button", { onClick: logout, className: "mt-4 bg-red-500 text-white px-4 py-2 rounded", children: "Logout" })] }));
}
