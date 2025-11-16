import { Outlet } from 'react-router-dom';

// Layout Component
export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Child routes render here */}
      </main>
      <Footer />
    </div>
  );
}