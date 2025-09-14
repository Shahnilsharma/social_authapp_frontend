
"use client";

import { useEffect, useState } from "react";

export default function DashboardInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/auth/me`, {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data.user || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [baseUrl]);

  const handleLogout = async () => {
    try {
      await fetch(`${baseUrl}/api/auth/logout`, {
        credentials: "include",
      });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
          <p className="text-gray-600">Loading your information...</p>
        </div>
      </div>
    );
  }

  return (
   

      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <img
                  src={user.picture}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="ml-4 px-3 py-1 bg-red-600 text-white rounded-md text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Profile Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Profile Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and information.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.email}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Profile picture</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="h-16 w-16 rounded-full"
                      />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Quick Actions
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Manage your account and settings.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-4">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Edit Profile
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Account Settings
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      View Activity
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Message Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden shadow rounded-lg md:col-span-2">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-blue-400 flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">
                      Welcome back, {user.name.split(' ')[0]}!
                    </h3>
                    <p className="mt-1 text-blue-100">
                      You've successfully signed in with your Google account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Not signed in</h3>
                <p className="mt-1 text-sm text-gray-500">Please sign in to access your dashboard.</p>
                <div className="mt-6">
                  <a
                    href="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}