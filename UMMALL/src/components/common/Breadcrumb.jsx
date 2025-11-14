// ============================================
// FICHIER 7: src/components/common/Breadcrumb.jsx
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 py-4">
      <Link to="/" className="hover:text-primary flex items-center">
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link to={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;