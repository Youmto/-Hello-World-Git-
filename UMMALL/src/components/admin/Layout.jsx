import { Outlet } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

// Layout Component
export function MainLayout() {
  return (
    <div 
      className={`flex flex-col min-h-screen bg-background text-text-dark`}>
      <Header className="sm:hidden" />

      <div className='flex flex-1'>
        <Sidebar className="hidden sm:block sm:w-64"/>
        <main className="flex-grow">
          <Outlet /> {/* Child routes render here */}
        </main>
      </div>

      <Footer />
    </div>
  );
}