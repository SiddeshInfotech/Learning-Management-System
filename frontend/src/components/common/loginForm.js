import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { validateLoginForm } from "../../utils/validation";
import logo from "../../assets/siddesh_logo.png";

export default function LoginForm() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const { handleLogin, loading, error } = useLogin();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateLoginForm(form.username, form.password);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        await handleLogin(form);
    };

    return (
        _jsxs("div", {
            className: "w-full max-w-sm",
            children: [
                // LOGO
                _jsxs("div", {
                    className: "mb-8 text-center",
                    children: [
                        _jsx("img", {
                            src: logo,
                            alt: "Logo",
                            className: "mx-auto h-22 w-auto object-contain"
                        }),
                        _jsx("p", {
                            className: "mt-2 text-lg font-medium",
                            children: "Welcome"
                        })
                    ]
                }),

                // FORM
                _jsxs("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-5",
                    children: [

                        // USERNAME
                        _jsxs("div", {
                            children: [
                                _jsx("label", {
                                    className: "block text-left text-sm font-semibold text-gray-700 mb-1",
                                    children: "Username"
                                }),
                                _jsx("input", {
                                    type: "text",
                                    name: "username",
                                    placeholder: "Enter your username",
                                    value: form.username,
                                    onChange: handleChange,
                                    className: `w-full border px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? "border-red-500" : ""}`
                                }),
                                errors.username && _jsx("p", {
                                    className: "text-red-500 text-sm mt-1",
                                    children: errors.username
                                })
                            ]
                        }),

                        // PASSWORD
                        _jsxs("div", {
                            children: [
                                _jsx("label", {
                                    className: "block text-sm text-left font-semibold text-gray-700 mb-1",
                                    children: "Password"
                                }),
                                _jsx("input", {
                                    type: "password",
                                    name: "password",
                                    placeholder: "Enter your password",
                                    value: form.password,
                                    onChange: handleChange,
                                    className: `w-full border px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : ""}`
                                }),
                                errors.password && _jsx("p", {
                                    className: "text-red-500 text-sm mt-1",
                                    children: errors.password
                                })
                            ]
                        }),

                        // ERROR MESSAGE
                        error && _jsx("p", {
                            className: "text-red-500 text-sm",
                            children: error
                        }),

                        // BUTTON
                        _jsx("button", {
                            type: "submit",
                            disabled: loading,
                            className: "w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 rounded-md font-semibold transition duration-200",
                            children: loading ? "Logging in..." : "Login"
                        })
                    ]
                })
            ]
        })
    );
}