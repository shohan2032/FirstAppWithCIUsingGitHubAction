"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState<{ id: number; fullName: string; email: string }[]>([]);
  const [newUser, setNewUser] = useState({ fullName: '', email: '', password: '' });
  const [updateUser, setUpdateUser] = useState({ id: '', fullName: '', email: '' });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3333/users'); // Assuming your backend is running here
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post('http://localhost:3333/users', newUser);
      fetchUsers(); // Refresh the list after adding the user
      setNewUser({ fullName: '', email: '', password: '' }); // Reset form
    } catch (error) {
      console.error('Error in adding user:', error);
    }
  };

  const updateUserData = async () => {
    try {
      await axios.put(`http://localhost:3333/users/${updateUser.id}`, updateUser);
      fetchUsers(); // Refresh the list after updating
      setUpdateUser({ id: '', fullName: '', email: '' }); // Reset form
    } catch (error) {
      console.error('Error in updating user:', error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3333/users/${id}`);
      fetchUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 via-indigo-500 to-blue-900 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg my-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">User Management</h1>

        {/* Add User Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Add User</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.fullName}
                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 font-black text-black"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 font-black text-black"
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 font-black text-black"
              />
              <button
                onClick={addUser}
                className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 font-black text-black"
              >
                Add User
              </button>
            </div>
          </div>

          {/* Update User Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Update User</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="User ID"
                value={updateUser.id}
                onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 font-black text-black"
              />
              <input
                type="text"
                placeholder="Full Name"
                value={updateUser.fullName}
                onChange={(e) => setUpdateUser({ ...updateUser, fullName: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 font-black text-black"
              />
              <input
                type="email"
                placeholder="Email"
                value={updateUser.email}
                onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 font-black text-black"
              />
              <button
                onClick={updateUserData}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 "
              >
                Update User
              </button>
            </div>
          </div>

          {/* User List */}
          <div>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Users List</h2>
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-lg border border-indigo-300"
                >
                  <span className="text-indigo-900 font-medium">
                    <strong>ID:</strong> {user.id} <strong>Name:</strong> {user.fullName}{" "}
                    <strong>Email:</strong> {user.email}
                  </span>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-md transition duration-300"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
