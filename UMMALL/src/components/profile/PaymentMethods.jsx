// ============================================
// FICHIER 5: src/components/profile/PaymentMethods.jsx
// Moyens de paiement
// ============================================

import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, Check } from 'lucide-react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Input from '../common/Input';
import { useToast } from '../common/Toast';

function PaymentMethods() {
  const toast = useToast();
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleAddCard = () => {
    // Validation basique
    if (!formData.number || !formData.name || !formData.expiry || !formData.cvv) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const newCard = {
      id: Date.now(),
      type: 'visa', // Détection automatique en prod
      last4: formData.number.slice(-4),
      expiry: formData.expiry,
      isDefault: cards.length === 0
    };

    setCards([...cards, newCard]);
    toast.success('Carte ajoutée avec succès');
    setShowModal(false);
    setFormData({ number: '', name: '', expiry: '', cvv: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer cette carte ?')) {
      setCards(cards.filter(card => card.id !== id));
      toast.success('Carte supprimée');
    }
  };

  const handleSetDefault = (id) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
    toast.success('Carte par défaut mise à jour');
  };

  const getCardIcon = (type) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳'
    };
    return icons[type] || '💳';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Moyens de paiement</h2>
          <Button onClick={() => setShowModal(true)} icon={Plus}>
            Ajouter une carte
          </Button>
        </div>

        {cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`
                  border-2 rounded-xl p-6 transition-all
                  ${card.isDefault ? 'border-primary bg-orange-50' : 'border-gray-200 hover:border-gray-300'}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getCardIcon(card.type)}</span>
                    <div>
                      <p className="font-bold text-gray-900 uppercase">{card.type}</p>
                      <p className="text-sm text-gray-600">•••• {card.last4}</p>
                    </div>
                  </div>
                  {card.isDefault && (
                    <div className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                      <Check className="w-3 h-3" />
                      Par défaut
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">Expire le {card.expiry}</p>

                <div className="flex gap-2 pt-4 border-t">
                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefault(card.id)}
                      className="flex-1 px-3 py-2 text-sm font-semibold text-primary hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      Définir par défaut
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Aucun moyen de paiement enregistré</p>
            <Button onClick={() => setShowModal(true)} icon={Plus}>
              Ajouter une carte
            </Button>
          </div>
        )}

        {/* Info sécurité */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            🔒 <strong>Paiement sécurisé :</strong> Vos informations bancaires sont cryptées et sécurisées. 
            Nous ne stockons jamais vos données complètes.
          </p>
        </div>
      </div>

      {/* Modal Ajout carte */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Ajouter une carte bancaire"
      >
        <div className="space-y-4">
          <Input
            label="Numéro de carte"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          <Input
            label="Nom sur la carte"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value.toUpperCase() })}
            placeholder="JEAN DUPONT"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date d'expiration"
              value={formData.expiry}
              onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
              placeholder="MM/YY"
              maxLength={5}
            />
            <Input
              label="CVV"
              type="password"
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              placeholder="123"
              maxLength={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleAddCard} variant="primary" fullWidth>
              Ajouter
            </Button>
            <Button onClick={() => setShowModal(false)} variant="outline">
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PaymentMethods;