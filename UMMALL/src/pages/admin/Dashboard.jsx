import { Users, Handshake, CircleDollarSign, Box, RefreshCw, ChefHat } from 'lucide-react';
import { useState } from 'react';
import { monthlyData } from '../../data/admin/mockData';
import { useNavigate } from 'react-router-dom';
import { ClientChart, PartnerChart, SaleChart, ProductChart } from '../../components/admin/Chart';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isGraphDetailsOpen, setIsGraphDetailsOpen] = useState(false);

  const handleNavigation = (e, path) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(path);
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Your refresh logic here
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    setIsRefreshing(false);
  };

  return (
    <div className="p-2">
      <span className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
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
            onClick={(e) => handleNavigation(e, '/admin/clients')}
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

        <div
          onClick={(e) => handleNavigation(e, '/admin/partners')}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 hover:bg-slate-100 transition-all duration-300 cursor-pointer group">
          {/* Header with icon and label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Handshake className="size-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Partners
            </h3>
          </div>

          {/* Metric */}
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">
              345
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span className="text-green-600">↑ 02%</span> vs last month
            </p>
          </div>
        </div>

        <div 
          onClick={(e) => handleNavigation(e, '/admin/sales')}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 hover:bg-slate-100 transition-all duration-300 cursor-pointer group">
          {/* Header with icon and label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <CircleDollarSign className="size-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Sales
            </h3>
          </div>

          {/* Metric */}
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">
              $12,345
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span className="text-green-600">↑ 20%</span> vs last month
            </p>
          </div>
        </div>

        <div 
          onClick={(e) => handleNavigation(e, '/admin/products')}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 hover:bg-slate-100 transition-all duration-300 cursor-pointer group">
          {/* Header with icon and label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Box className="size-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Products
            </h3>
          </div>

          {/* Metric */}
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">
              567
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span className="text-green-600">↑ 10%</span> vs last month
            </p>
          </div>
        </div>

        <div 
          onClick={(e) => handleNavigation(e, '/admin/admin')}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 hover:bg-slate-100 transition-all duration-300 cursor-pointer group">
          {/* Header with icon and label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <ChefHat className="size-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Administrators
            </h3>
          </div>

          {/* Metric */}
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">
              2
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span className="text-green-600">↑ 00%</span> vs last month
            </p>
          </div>
        </div>

      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6"
      >
        <ClientChart monthlyData={monthlyData} />
        <PartnerChart monthlyData={monthlyData} />
        <SaleChart monthlyData={monthlyData} />
        <ProductChart monthlyData={monthlyData} />
      </div>

      {
        isGraphDetailsOpen &&
        <div>

        </div>
      }

    </div>
  )
}