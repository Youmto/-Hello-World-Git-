// src/components/Header.jsx
import React from 'react';
import { Search, ChevronDown, HelpCircle, Menu } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { linearGradient } from 'framer-motion/client';


function Header() {
  const navigate = useNavigate();
  const heroOverlay = "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))";

  return (
    <header className="bg-background shadow-md"   style={{
    background:'linearGradient:"linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0)) 70%"',}}>
      {/* Première barre : Logo, Recherche, Actions */}
      <div className="navbar p-4">
        {/* Partie gauche : Nom de marque et menu mobile */}
        <div className="navbar-start w-auto lg:w-1/5">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <Menu className="h-6 w-6 text-text-dark" />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
              {/* Liens pour mobile */}
              <li><a>Femmes</a></li>
              <li><a>Hommes</a></li>
              <li><a>Articles de créateurs</a></li>
              {/*... Ajoutez le reste des liens ...*/}
              <li className="divider"></li>
              <li><a href="/login">S'inscrire | Se connecter</a></li>
              <li><a>Vends tes articles</a></li>
            </ul>
          </div>
          {/* Nouveau logo UMMALL */}
          <a className="btn btn-ghost normal-case text-xl font-bold  ">
            U M MALL
          </a>
        </div>

        {/* Partie centrale : Sélecteur d'articles et Barre de recherche */}
        <div className="navbar-center flex-grow flex items-center max-w-2xl mx-auto">
          {/* Sélecteur d'articles séparé de la barre de recherche */}
          <div className="hidden lg:flex dropdown mr-2">
            <label tabIndex={0} className="btn btn-ghost normal-case text-text-dark m-1">
              Articles <ChevronDown className="inline h-4 w-4 ml-1" />
            </label>
            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-white rounded-box w-52">
              <li><a>Tous les articles</a></li>
              <li><a>Mode</a></li>
              <li><a>Maison</a></li>
              <li><a>Femmes</a></li>
              <li><a>Hommes</a></li>
              <li><a>Articles de créateurs</a></li>
              <li><a>Enfants</a></li>
              <li><a>Maison</a></li>
              <li><a>Électronique</a></li>
              <li><a>Divertissement</a></li>
              <li><a>Loisirs et collections</a></li>
              <li><a>Sport</a></li>

            </ul>
          </div>
          {/* Barre de recherche proprement dite */}
          <div className="form-control flex-grow flex items-center bg-gray-100 rounded-lg p-2">
            <Search className="h-5 w-5 text-gray-500" />
            <input type="text" placeholder="Rechercher des articles..." className="input input-ghost w-full bg-transparent focus:outline-none" />
            </div>
        </div>

        {/* Partie droite : Boutons d'action, Aide, Langue */}
        <div className="navbar-end w-auto lg:w-2/5 flex items-center space-x-2 md:space-x-4 ml-4">
          <button className="btn btn-ghost btn-sm hidden md:flex text-text-dark border border-gray-300 hover:bg-gray-200" onClick={() => navigate("/login")}>
            S'inscrire | Se connecter
          </button>
          <button className="btn bg-primary text-white btn-sm hover:bg-orange-600 border-none hidden md:flex">
            Vends tes articles
          </button>
          
          <button className="btn btn-ghost btn-circle text-text-dark hidden md:flex">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="dropdown dropdown-end hidden md:flex">
            <label tabIndex={0} className="btn btn-ghost normal-case text-text-dark">
              FR <ChevronDown className="inline h-4 w-4 ml-1" />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-32">
              <li><a>EN</a></li>
              <li><a>ch</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Deuxième barre : Catégories principales */}
  <div className="hidden lg:flex justify-center bg-background border-t border-gray-200 py-2 text-sm text-text-dark">
        <div className="flex space-x-6 px-4">
          {['À propos', 'Notre plateforme'].map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className="relative group text-text-dark hover:text-primary transition-colors duration-200"
            >
              {item}
              {/* Le soulignement qui glisse */}
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;