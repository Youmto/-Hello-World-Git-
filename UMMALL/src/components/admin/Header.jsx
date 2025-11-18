import { Menu, X, Moon, Sun, Bell, CircleUserRound } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const sidebarElement = [
  { name: 'Dashboard', link: '/admin/dashboard' },
  { name: 'Partners', link: '/admin/partners' },
  { name: 'Clients', link: '/admin/clients' },
  { name: 'Administrators', link: '/admin/admin' },
  { name: 'Sales', link: '/admin/sales' },
  { name: 'Products', link: '/admin/products' },
  { name: 'Settings', link: '/admin/settings' },
  { name: 'Profile', link: '/admin/profile' },
]

export default function Header({ className = "" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
  };



  return (
    <header className={`flex shadow-sm shadow-black/50 bg-white p-2 relative ${className}`}
    >
      {/* left side */}
      <div className="flex items-center">
          <Menu
            className='size-7 text-black cursor-pointer hover:text-blue-600 hover:bg-slate-200 hover:rounded-lg hover:p-1 transition-all duration-200 ease-in-out'
            onClick={toggleMenu}
          />
      </div>

      {/* right side */}
      
      <div className='flex flex-1 justify-end items-center gap-4'>
        {/* <Moon className='size-6 text-black cursor-pointer hover:text-blue-600 hover:bg-slate-800 hover:rounded-lg'/> */}
        <Sun className='size-7 text-black cursor-pointer hover:text-blue-600 hover:bg-slate-200 hover:rounded-lg hover:p-1 transition-all duration-200 ease-in-out'/>
        <Bell className='size-7 text-black cursor-pointer hover:text-blue-600 hover:bg-slate-200 hover:rounded-lg hover:p-1 transition-all duration-200 ease-in-out'/>
        <CircleUserRound className='size-7 text-black cursor-pointer hover:text-blue-600 hover:bg-slate-200 hover:rounded-lg hover:p-1 transition-all duration-200 ease-in-out'/>
        <button className='bg-red-600 text-white rounded-lg px-5 py-2 cursor-pointer hover:bg-red-700 transition-all duration-200 ease-in-out'>
          Logout
        </button>
      </div>
        {
          <>
            {/* Backdrop */}
            <div 
              className={`fixed inset-0 bg-black/50 z-10 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              onClick={(e) => closeMenu(e)} 
            />

            {/* Sidebar */}
            <div 
              className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-4 z-20 transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()} 
            >
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold'>Admin Menu</h2>
                <X
                  className='size-7 text-black cursor-pointer hover:text-blue-600 hover:bg-slate-200 hover:rounded-lg hover:p-1 transition-all duration-200 ease-in-out'
                  onClick={toggleMenu}
                />
              </div>
              {/* Add your menu items here */}
              <nav>
                <ul className='flex flex-col gap-2'>
                  {sidebarElement.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.link}
                        className='flex bg-slate-200 p-2 rounded-md text-lg text-black hover:text-blue-500 hover:bg-slate-300 hover:rounded-lg hover:p-3 transition-all duration-200 ease-in-out cursor-pointer'
                        onClick={toggleMenu}
                      >
                        {item.name}
                      </Link>
                    </li>  
                  ))}
                </ul>
              </nav>
            </div>
          </>
        }
    </header>
  )
}