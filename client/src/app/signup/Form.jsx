import Link from "next/link";
import { useState } from "react";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Perform signup logic using name, email, and password
    // ...
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="flex flex-col gap-4" onSubmit={handleSignupSubmit}>
        <div>
          <label htmlFor="name" className="block text-3xl text-black mb-1">
            name
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-md py-2 px-3 bg-[#DFE8FF] bg-opacity-50 text-2xl"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-3xl text-black mb-1">
            email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md py-2 px-3 bg-[#DFE8FF] bg-opacity-50 text-2xl"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-3xl text-black mb-1">
            password
          </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md py-2 px-3 bg-[#DFE8FF] bg-opacity-50 text-2xl"
          />
        </div>

        <button
          type="submit"
          className="bg-[#DFE8FF] bg-opacity-50 text-black text-xl rounded px-4 py-2 focus:outline-none">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupScreen;
