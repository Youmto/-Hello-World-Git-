import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { X } from 'lucide-react';
function ClientChart({ monthlyData }){
  return (
    <div 
      
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 cursor-pointer hover:bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">New Clients (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData.clients} style={{cursor: 'pointer'}}>
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

function PartnerChart({ monthlyData }){
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 hover:bg-gray-50 cursor-pointer">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">New Partners (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData.partners} style={{cursor: 'pointer'}} >
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
          <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} name="New Partners" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function SaleChart({ monthlyData }){
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 hover:bg-gray-50 cursor-pointer">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData.sales} style={{cursor: 'pointer'}}>
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

function ProductChart({ monthlyData }){
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 hover:bg-gray-50 cursor-pointer">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">New Products (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData.products} style={{cursor: 'pointer'}}>
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

export function StatisticChart({ monthlyData }) {

  return (
    <div>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6"
      >
        <ClientChart monthlyData={monthlyData} />
        <PartnerChart monthlyData={monthlyData} />
        <SaleChart monthlyData={monthlyData} />
        <ProductChart monthlyData={monthlyData} />

      </div>


    </div>
  )
}
