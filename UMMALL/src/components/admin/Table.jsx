import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { usersData } from "../../data/admin/Users_mock_data";


export function UsersTable1({ width }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const [filters, setFilters] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    verified: '',
    ip: '',
    created: ''
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      id: '',
      name: '',
      email: '',
      phone: '',
      role: '',
      status: '',
      verified: '',
      ip: '',
      created: ''
    });
  };

  const openUserDetails = (user) => {
    setSelectedUser(user);
  };


  const closeUserDetails = () => {
    setStatusMessage('');
    setSelectedUser(null);
  };

  const openStatusMessage = (status) => {
    setStatusMessage(status);
  };

  const closeStatusMessage = () => {
    setStatusMessage('');
  };

  useEffect(() => {
    setUsers(usersData);
  }, []);

  return (
    <div>
      <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter Users
          </h3>
          <button 
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-white rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors">
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">ID</label>
            <input
              type="text"
              value={filters.id}
              onChange={(e) => handleFilterChange('id', e.target.value)}
              placeholder="Filter by ID"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              placeholder="Filter by name"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              value={filters.email}
              onChange={(e) => handleFilterChange('email', e.target.value)}
              placeholder="Filter by email"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              value={filters.phone}
              onChange={(e) => handleFilterChange('phone', e.target.value)}
              placeholder="Filter by phone"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
            <select
              value={filters.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
              <option value="user">User</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Verified</label>
            <select
              value={filters.verified}
              onChange={(e) => handleFilterChange('verified', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">IP Address</label>
            <input
              type="text"
              value={filters.ip}
              onChange={(e) => handleFilterChange('ip', e.target.value)}
              placeholder="Filter by IP"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Created Date</label>
            <input
              type="date"
              value={filters.created}
              onChange={(e) => handleFilterChange('created', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>
      <div
        style={{ width: `${width - 0.158*width}px` }}
        className={`overflow-x-auto mx-auto`}>
        <table 
          className={`border border-gray-200 text-sm`}>
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border">ID</th>
              {/* <th className="px-4 py-3 border">Avatar</th> */}
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Phone</th>
              <th className="px-4 py-3 border">Role</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Verified</th>
              <th className="px-4 py-3 border">IP</th>
              <th className="px-4 py-3 border">Created</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} 
                onClick={() => openUserDetails(u)}
                className="hover:bg-blue-100 cursor-pointer transition-all"
              >
                <td className="px-4 py-3 border-b text-center">{u.id}</td>

                {/* <td className="px-4 py-3 border text-center">
                  <img
                    src={u.avatar}
                    alt={u.firstName}
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                </td> */}

                <td className="px-4 py-3 border-b font-medium">{`${u.firstName} ${u.lastName}`}</td>

                <td className="px-4 py-3 border-b text-blue-600 underline">{u.email}</td>

                <td className="px-4 py-3 border-b">{u.phone}</td>

                <td className="px-4 py-3 border-b capitalize">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      u.role === "admin"
                        ? "bg-red-100 text-red-700"
                        : u.role === "seller"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="px-4 py-3 border-b capitalize">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      u.status === "active"
                        ? "bg-green-100 text-green-700"
                        : u.status === "banned"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>

                <td className="px-4 py-3 border-b text-center">
                  {u.isVerified ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold text">No</span>
                  )}
                </td>

                <td className="px-4 py-3 border-b">
                  {u.ip_address[0]}<br />
                  {(u.ip_address.length > 1) ? '...': ''}
                </td>

                <td className="px-4 py-3 border-b text-xs text-gray-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {
        selectedUser && (
          <div 
              onClick={() => closeUserDetails()}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-red-200 to-blue-200 bg-gradient-to-tr from-green-200 to-yellow-200 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 relative">
              <div className="flex justify-between">
                <h2 className="flex text-2xl font-semibold mb-4">User Details</h2>
                <button
                onClick={() => closeUserDetails()}
                className="btn btn-neutral btn-outline text-gray-600 hover:text-red-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                <p><span className="font-medium">ID:</span> {selectedUser.id}</p>
                <p><span className="font-medium">Name:</span> {`${selectedUser.firstName} ${selectedUser.lastName}`}</p>
                <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                <p><span className="font-medium">Phone:</span> {selectedUser.phone}</p>
                <p><span className="font-medium">Role:</span> {selectedUser.role}</p>
                <p><span className="font-medium">Status:</span> {selectedUser.status}</p>
                <p><span className="font-medium">Verified:</span> {selectedUser.isVerified ? 'Yes' : 'No'}</p>
                <p><span className="font-medium">IP Address:</span>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    {selectedUser.ip_address.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </p>
                <p><span className="font-medium">Created:</span> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-end mt-4 space-x-3">
                <span className="font-medium mr-4 self-center">Change Status:</span>
                <button
                  onClick={() => openStatusMessage('Active')}
                  className={`${selectedUser.status === 'active' ? 'hidden' : '' } px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors cursor-pointer`}
                >
                  Active
                </button>
                <button
                  onClick={() => openStatusMessage('Suspended')}
                  className={`${selectedUser.status === 'suspended' ? 'hidden' : '' } px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors cursor-pointer`}
                >
                  Suspended
                </button>
                <button
                  onClick={() => openStatusMessage('Banned')}
                  className={`${selectedUser.status === 'banned' ? 'hidden' : '' } px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors cursor-pointer`}
                >
                  Banned
                </button>
              </div>
              {
                statusMessage && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200">
                      {/* Icon */}
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                          </svg>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
                        Confirm Your Action
                      </h2>

                      {/* Message */}
                      <p className="text-gray-600 text-center mb-6">
                        {'Are you sure you want to change the status of the user '} 
                        
                        {selectedUser.firstName} {selectedUser.lastName} from 
                        <span
                          className={`px-2 py-1 rounded-full ${
                            selectedUser.status === "active"
                              ? "text-green-700"
                              : selectedUser.status === "banned"
                              ? "text-red-700"
                              : "text-orange-700"
                          }`}
                        >
                          {selectedUser.status}
                        </span>to 
                        <span
                          className={`px-2 py-1 rounded-full ${
                            statusMessage.toLowerCase() === "active"
                              ? "text-green-700"
                              : statusMessage === "banned"
                              ? "text-red-700"
                              : "text-orange-700"
                          }`}
                        >
                          {statusMessage}
                        </span>?
                      </p>

                      {/* Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => closeStatusMessage()}
                          className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300 cursor-pointer">
                          Cancel
                        </button>
                        <button
                          onClick={() => closeStatusMessage()}
                          className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer">
                          Confirm
                        </button>
                      </div>
                    </div>
                )
              }
              
            </div>
          </div>
        )
        }

    </div>
  );
}
