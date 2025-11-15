// src/components/Footer.jsx
import React from 'react';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
const appStore = 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg';
const googlePlay = 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png';
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
            <h4 className="text-sm font-bold text-text-dark mb-4">Téléchargez l'application</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#"><img src={appStore} alt="App Store" className="h-10" /></a>
              <a href="#"><img src={googlePlay} alt="Google Play" className="h-10" /></a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary"><Facebook size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-primary"><Linkedin size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-primary"><Instagram size={24} /></a>
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