// ============================================
// FICHIER 6: src/components/product/ShareModal.jsx
// Modal de partage avec réseaux sociaux
// ============================================

import React from 'react';
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Mail } from 'lucide-react';
import Modal from '../common/Modal';
import { useToast } from '../common/Toast';
import { copyToClipboard } from '../../utils/helpers';

function ShareModal({ isOpen, onClose, product }) {
  const toast = useToast();

  const shareUrl = window.location.href;
  const shareText = `Découvrez ${product?.title} sur UMMALL !`;

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      toast.success('Lien copié dans le presse-papiers !');
      onClose();
    } else {
      toast.error('Erreur lors de la copie du lien');
    }
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Partager ce produit" size="sm">
      <div className="space-y-4">
        {/* Réseaux sociaux */}
        <div className="grid grid-cols-2 gap-3">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white rounded-lg p-4 flex items-center justify-center gap-2 font-semibold transition-colors`}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </a>
          ))}
        </div>

        {/* Copier le lien */}
        <div className="pt-4 border-t">
          <button
            onClick={handleCopyLink}
            className="w-full border-2 border-gray-300 hover:border-primary hover:bg-orange-50 text-gray-700 rounded-lg p-4 flex items-center justify-center gap-2 font-semibold transition-all"
          >
            <LinkIcon className="w-5 h-5" />
            Copier le lien
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ShareModal;