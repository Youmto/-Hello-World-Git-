// src/components/Header.jsx
import React from 'react';
import { Search, Menu, Heart, Gift, ShoppingBag } from 'lucide-react'; 

// Liste des catégories pour le menu déroulant principal (style image bde539.png)
const mainCategoriesList = [
  'Accessoires', 'Animaux', 'Art et collections', 'Bain et beauté', 
  'Bijoux', 'Bébé', 'Cadeaux', 'Chaussures', 'Électronique et accessoires', 
  'Fournitures créatives et outils', 'Jeux et jouets', 'Livres, films et musique',
  'Maison', 'Vêtements' // Ajout de quelques éléments pour compléter la liste
];

// Liste des catégories pour la barre secondaire (style image 88bd04.png)
const secondaryCategories = [
  { name: "Cadeaux", icon: Gift }, 
  { name: "Favoris d'Halloween", icon: Heart }, 
  { name: "Articles de déco", icon: null }, 
  { name: "Articles de mode", icon: null }, 
  { name: "Liste de cadeaux", icon: null },
];


function Header() {
  return (
    <header className="bg-background shadow-md">
      {/* 1. BARRE SUPÉRIEURE : Logo, Recherche, Actions */}
      <div className="container mx-auto flex items-center justify-between p-3 sm:p-4">

        {/* --- PARTIE GAUCHE : Logo et Bouton Catégories --- */}
        <div className="flex items-center space-x-4"> 
          
          {/* Menu Burger Mobile (Hidden sur PC) */}
          <div className="dropdown lg:hidden"> 
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Menu className="h-6 w-6 text-text-dark" />
            </label>
            {/* Contenu du menu mobile simple */}
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow-xl bg-white rounded-box w-64">
                {mainCategoriesList.map((item, index) => (
                    <li key={index}><a href="#">{item}</a></li>
                ))}
                <li className="divider"></li>
                <li><a href="#">S'inscrire | Se connecter</a></li>
                <li><a href="#">Vends tes articles</a></li>
            </ul>
          </div>
          
          {/* Logo UMMALL (Style Etsy) */}
          <a className="text-primary text-2xl sm:text-3xl font-bold tracking-tighter whitespace-nowrap">
            UMMALL
          </a>
          
          {/* Bouton Catégories (Desktop) - Style Liste Haute de image_bde539.png */}
             <div className="dropdown dropdown-bottom dropdown-end hidden lg:block">
            <label tabIndex={0} className="btn btn-ghost btn-sm text-text-dark flex items-center hover:bg-gray-100 cursor-pointer">
              <Menu className="h-5 w-5 mr-2" />
              Catégories
            </label>
            
                       {/* Contenu du Menu Déroulant (Liste simple, haute) */}
            <ul tabIndex={0} className="dropdown-content z-[50] menu p-0 shadow-2xl bg-white rounded-lg w-64 mt-2 max-h-96 overflow-y-auto border border-gray-200">
                {/* Suppression du positionnement "bottom" par défaut de DaisyUI pour le positionnement latéral */}
                {mainCategoriesList.map((item, index) => (
                    <li key={index} className="w-full">
                        <a 
                            href="#" 
                            className={`px-4 py-2 text-text-dark text-base hover:bg-gray-100 transition-colors duration-100 ${index === 0 ? 'border-b border-gray-200 font-semibold bg-gray-50' : ''}`}
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
          </div>
        </div>


        {/* --- PARTIE CENTRALE : Recherche (RESTAURÉE) --- */}
        <div className="hidden lg:flex flex-grow max-w-2xl mx-auto items-center">
            <div className="relative flex items-center rounded-full border border-gray-400 overflow-hidden bg-white w-full">
                <input type="text" placeholder="Cherchez ce que vous voulez..." className="w-full pl-4 py-2 pr-16 text-gray-800 bg-transparent focus:outline-none" />
                <button className="absolute right-0 top-0 h-full w-14 flex items-center justify-center bg-primary text-white rounded-r-full">
                <Search className="h-6 w-6" />
                </button>
            </div>
        </div>


        {/* --- PARTIE DROITE : Actions --- */}
        <div className="flex items-center space-x-3 ml-4">
          
          <a href="#" className="text-text-dark hover:text-gray-700 lg:hidden">
            <Search className="h-6 w-6" /> 
          </a>
          
          <a href="#" className="hidden lg:block text-text-dark font-semibold whitespace-nowrap hover:text-gray-700">
            Se connecter
          </a>

          <a href="#" className="hidden lg:flex text-text-dark hover:text-gray-700">
            <Heart className="h-6 w-6" />
          </a>
          <a href="#" className="hidden lg:flex text-text-dark hover:text-gray-700">
            <Gift className="h-6 w-6" />
          </a>
          
          <a href="#" className="text-text-dark hover:text-gray-700">
            <ShoppingBag className="h-6 w-6" />
          </a>
        </div>
      </div>
      
      {/* 2. BARRE DE RECHERCHE MOBILE (Sous le header, cachée sur PC) */}
       <div className="lg:hidden p-3 pt-0">
          <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full">
              <Search className="h-5 w-5 text-gray-500 mx-2" />
              <input type="text" placeholder="Rechercher des articles..." className="input input-ghost w-full bg-transparent focus:outline-none" />
          </div>
      </div>

      
      {/* --- BARRE SECONDAIRE : Catégories (PC Seulement) --- */}
      <div className="hidden lg:block border-t border-gray-200 py-2">
        <div className="container mx-auto flex justify-center text-sm space-x-8 px-4 text-text-dark">
          {secondaryCategories.map((item, index) => (
            <a 
              key={index} 
              href="#" 
              className={`flex items-center space-x-1 p-1 transition-colors duration-150 ${item.name === "Favoris d'Halloween" ? 'bg-gray-200 rounded-lg px-3 py-1 font-semibold text-text-dark' : 'hover:text-primary'}`}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </div>

    </header>
  );
}

export default Header;