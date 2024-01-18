import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiBookmarkAlt, BiMovie } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";

const Dashboard = () => {
  const [dashboardSummary, setDashboardSummary] = useState({
    totalUsers: 0,
    totalReview: 0,
    totalWatchlist: 0,
  });

  useEffect(() => {
    // Fetch dashboard summary data when the component mounts
    const fetchDashboardSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/admin/dashboard-summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setDashboardSummary(response.data);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    fetchDashboardSummary();
  }, []); // Empty dependency array to ensure it runs only once on mount

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/admin/dashboard-summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setDashboardSummary(response.data);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    fetchDashboardSummary();
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // You may want to refresh the user data after deletion
      fetchUsers();

      // reload page
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5 py-5 p-20">
        <h2 className="text-3xl font-bold text-purple-lighter">Dashboard</h2>

        {/* <div>
          <div>
            <p>Total Users: {dashboardSummary.totalUsers}</p>
          </div>

          <div>
            <p>Total Books: {dashboardSummary.totalBooks}</p>
          </div>

          <div>
            <p>
              Total Exchange Requests: {dashboardSummary.totalExchangeRequests}
            </p>
          </div>
        </div> */}

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-[#305973] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#305973] dark:border-[#305973] text-[#305973] font-medium group">
            <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <FaUserFriends className="w-5 h-5" />
            </div>
            <div class="text-right">
              <p class="text-2xl">{dashboardSummary.totalUsers}</p>
              <p>Total Users</p>
            </div>
          </div>

          <div class="bg-white dark:bg-[#305973] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#305973] dark:border-[#305973] text-[#305973] font-medium group">
            <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <BiMovie className="w-5 h-5" />
            </div>
            <div class="text-right ">
              <p class="text-2xl">{dashboardSummary.totalReview}</p>
              <p>Total Reviews</p>
            </div>
          </div>

          <div class="bg-white dark:bg-[#305973] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#305973] dark:border-[#305973] text-[#305973] font-medium group">
            <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <BiBookmarkAlt className="w-5 h-5" />
            </div>
            <div class="text-right">
              <p class="text-2xl">{dashboardSummary.totalWatchlist}</p>
              <p>Total Movies Watchlisted</p>
            </div>
          </div>
        </div>

        {/* Display a table of users */}
        {users.length > 0 && (
          <table className="min-w-full border border-[#305973] mt-4">
            <thead>
              <tr>
                <th className="border border-[#305973] px-4 py-2 text-[#305973] text-center">
                  Username
                </th>
                <th className="border border-[#305973] px-4 py-2 text-[#305973] text-center">
                  Email
                </th>
                <th className="border border-[#305973] px-4 py-2 text-[#305973] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-[#305973] px-4 py-2 text-[#305973] text-center">
                    {user.username}
                  </td>
                  <td className="border border-[#305973] px-4 py-2 text-[#305973] text-center">
                    {user.email}
                  </td>
                  <td className="border-b border-[#305973] px-4 py-2 text-[#305973] flex items-center justify-center">
                    <button
                      className="bg-[#305973] text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
