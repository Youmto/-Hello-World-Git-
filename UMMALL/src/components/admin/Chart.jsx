import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ClientChart({ monthlyData }){
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 cursor-pointer">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">New Clients (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData.clients}>
          <CartesianGrid   />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} name="New Clients" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PartnerChart({ monthlyData }){
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 cursor-pointer">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">New Partners (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData.partners}>
          <CartesianGrid   />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} name="New Partners" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SaleChart({ monthlyData }){
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData.sales}>
          <CartesianGrid   />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} name="Sales" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ProductChart({ monthlyData }){
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">New Products (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData.products}>
          <CartesianGrid />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} name="New Products" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}