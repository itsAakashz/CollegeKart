"use client";
import { useState, useEffect } from "react";
import ManageProducts from "../components/ManageProducts";
import Profile from "../components/Profile";
import IndexProduct from "../components/IndexProduct";
import { FaBox, FaUser, FaList, FaBars, FaTimes } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../auth/firebaseConfig";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Manage Products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to login if no user is authenticated
        router.push("/login");
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // Redirect to login page after signing out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Manage Products":
        return <ManageProducts />;
      case "Profile":
        return <Profile />;
      case "Index Product":
        return <IndexProduct />;
      default:
        return <ManageProducts />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-gray-800 text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center justify-between px-4 py-5 text-2xl font-bold border-b border-gray-700">
          CollageKart Dashboard
          <button
            className="text-gray-300 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col px-4 space-y-2 mt-5">
          <button
            onClick={() => {
              setActiveTab("Manage Products");
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-2 p-3 rounded-md ${
              activeTab === "Manage Products" ? "bg-gray-700" : ""
            }`}
          >
            <FaBox />
            Manage Products
          </button>
          <button
            onClick={() => {
              setActiveTab("Profile");
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-2 p-3 rounded-md ${
              activeTab === "Profile" ? "bg-gray-700" : ""
            }`}
          >
            <FaUser />
            Profile
          </button>
          <button
            onClick={() => {
              setActiveTab("Index Product");
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-2 p-3 rounded-md ${
              activeTab === "Index Product" ? "bg-gray-700" : ""
            }`}
          >
            <FaList />
            Index Product
          </button>
        </nav>
      </aside>

      {/* Overlay for sidebar on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto md:ml-64">
        <header className="flex justify-between items-center pb-3 border-b">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
            <FaBars size={24} />
          </button>
          <h1 className="text-2xl font-semibold">{activeTab}</h1>
          <button
            onClick={handleLogout}
            className="p-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Logout
          </button>
        </header>
        <section className="mt-6">{renderTabContent()}</section>
      </main>
    </div>
  );
};

export default Dashboard;
