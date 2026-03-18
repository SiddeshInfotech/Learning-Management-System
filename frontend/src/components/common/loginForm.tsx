import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { validateLoginForm } from "../../utils/validation";
import logo from "../../assets/siddesh_logo.png";

export default function LoginForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { handleLogin, loading, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLoginForm(form.username, form.password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    await handleLogin(form);
  };

  return (
    <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      {/* Logo */}
      <div className="mb-8 text-center">
        <img
          src={logo}
          alt="Logo"
          className="mx-auto h-32 w-auto object-contain"
        />
        <p className="mt-2 text-lg">Welcome</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className={`w-full border px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.username ? "border-red-500" : ""
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full border px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}