// src/components/Footer.jsx
import React from 'react';
import { Facebook, Linkedin, Instagram, Mail } from 'lucide-react';
import appStore from '../assets/app-store.png';
import googlePlay from '../assets/google-play.webp';
import '../styles/Footer.css'

const sections = [
  {
    title: "Découvrir",
    links: ["Comment ça marche ?", "Vérification de l'article", "Applications mobiles", "Tableau de bord"]
  },
  {
    title: "Aide",
    links: ["Centre d'aide", "Vendre", "Acheter", "Confiance et sécurité"]
  }
];

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 p-8 sm:p-12 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-sm font-bold text-text-dark mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="hover:underline text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-sm font-bold text-text-dark mb-4 text-center">Contactez Nous</h4>
            <div className="flex space-x-4 mb-4 flex items-center justify-center">
              <div className="main">
                <div className="up"><button class="card1">
                <Facebook size={24} />
              </button>
              <button className="card2">
                <Linkedin size={24}/>
              </button>
              </div>
              <div className="down">
                <button className="card3">
                  <Instagram size={24}/>
                </button>
                <button className="card4">
                  <Mail size={24}/>
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />
        
        <div className="flex flex-wrap justify-between items-center text-xs space-x-4">
          <a href="#" className="hover:underline">Centre de protection de la vie privée</a>
          <a href="#" className="hover:underline">Politique de cookies</a>
          <a href="#" className="hover:underline">Ne pas vendre mes informations personnelles</a>
          <a href="#" className="hover:underline">Termes et Conditions</a>
          <a href="#" className="hover:underline">Notre plateforme</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;