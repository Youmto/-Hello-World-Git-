import { Users, RefreshCw, Trophy } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Client() {
  // const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Your refresh logic here
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    setIsRefreshing(false);
  };
  return (
    <div className='p-2'>
      <span className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold mb-4">Manage Clients</h1>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 mb-6 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 ease-in-out cursor-pointer"
        >
          <RefreshCw className={`size-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 hover:bg-slate-100 transition-all duration-300 cursor-pointer group">
          {/* Header with icon and label */}
          <div
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Users className="size-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Clients
            </h3>
          </div>

          {/* Metric */}
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">
              1,234
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span className="text-green-600">↑ 12%</span> vs last month
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 hover:bg-slate-100 transition-all duration-300 cursor-pointer group">
          {/* Header with icon and label */}
          <div
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Trophy className="size-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Top Client
            </h3>
          </div>

          {/* Metric */}
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">
              John Doe
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span className="text-green-600">$1530</span> this month
            </p>
          </div>
        </div>
      </div>

    </div>
  )

}