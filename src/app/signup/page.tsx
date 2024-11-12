"use client";
import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaEnvelope, FaLock, FaSchool } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { auth, firestore } from "../auth/firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional data in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        email,
        collegeName,
        city,
        createdAt: new Date()
      });

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="grid items-center justify-center min-h-screen bg-gray-100">
      <div className="lg:w-[476px] max-w-md p-8 space-y-10 bg-white rounded-[12px] h-[812px] lg:h-auto">
        <div>
          <h2 className="text-[32px] font-bold">Create account</h2>
          <p className="text-gray-400 py-2">
            CollegeKart: An Eco-Friendly Solution to High College Costs and Waste!
          </p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="email" className="text-[12px]">Email address</label>
            <div className="absolute left-3 inset-y-2.5 my-8 pointer-events-none">
              <FaEnvelope className="w-5 h-5 text-gray-500" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="e.g. alex@email.com"
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="clgname" className="text-[12px]">College Name</label>
            <div className="absolute left-3 inset-y-2.5 my-8 pointer-events-none">
              <FaSchool className="w-5 h-5 text-gray-500" />
            </div>
            <input
              id="clgname"
              type="text"
              placeholder="e.g. Greater Noida Institute of Technology"
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="city" className="text-[12px]">City</label>
            <div className="absolute left-3 inset-y-2.5 my-8 pointer-events-none">
              <FaLocationDot className="w-5 h-5 text-gray-500" />
            </div>
            <input
              id="city"
              type="text"
              placeholder="e.g. Greater Noida"
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-[12px]">Password</label>
            <div className="absolute left-3 inset-y-2.5 my-8 pointer-events-none">
              <FaLock className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="text-[12px]">Confirm password</label>
            <div className="absolute left-3 inset-y-2.5 my-8 pointer-events-none">
              <FaLock className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#633CFF] border border-transparent rounded-[8px] group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Create new account
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="text-purple-600 hover:underline p-1">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
