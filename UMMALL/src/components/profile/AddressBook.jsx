// ============================================
// FICHIER 3: src/components/profile/AddressBook.jsx
// Carnet d'adresses
// ============================================

import React, { useState } from 'react';
import { Plus, MapPin, Edit2, Trash2, Check } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';
import { useToast } from '../common/Toast';

function AddressBook() {
  const toast = useToast();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: 'Jean Dupont',
      address: '12 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      phone: '0612345678',
      isDefault: true
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: '',
    isDefault: false
  });

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingAddress(null);
    setFormData({
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'France',
      phone: '',
      isDefault: false
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingAddress) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...formData, id: addr.id } : addr
      ));
      toast.success('Adresse mise à jour');
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
      toast.success('Adresse ajoutée');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer cette adresse ?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
      toast.success('Adresse supprimée');
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast.success('Adresse par défaut mise à jour');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Mes adresses</h2>
          <Button onClick={handleAdd} icon={Plus}>
            Ajouter une adresse
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`
                border-2 rounded-xl p-6 transition-all
                ${address.isDefault ? 'border-primary bg-orange-50' : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-gray-900">{address.fullName}</h3>
                </div>
                {address.isDefault && (
                  <div className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                    <Check className="w-3 h-3" />
                    Par défaut
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-700 space-y-1 mb-4">
                <p>{address.address}</p>
                <p>{address.postalCode} {address.city}</p>
                <p>{address.country}</p>
                <p className="text-gray-600">{address.phone}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="flex-1 px-3 py-2 text-sm font-semibold text-primary hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    Définir par défaut
                  </button>
                )}
                <button
                  onClick={() => handleEdit(address)}
                  className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Ajout/Édition */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingAddress ? 'Modifier l\'adresse' : 'Ajouter une adresse'}
      >
        <div className="space-y-4">
          <Input
            label="Nom complet"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <Input
            label="Adresse"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Code postal"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            />
            <Input
              label="Ville"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
          <Input
            label="Téléphone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="w-4 h-4 text-primary rounded"
            />
            <span className="text-sm text-gray-700">Définir comme adresse par défaut</span>
          </label>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} variant="primary" fullWidth>
              {editingAddress ? 'Modifier' : 'Ajouter'}
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

export default AddressBook;