
// ============================================
// FICHIER 1: src/components/profile/ProfileInfo.jsx
// Informations personnelles
// ============================================

import React, { useState } from 'react';
import { Camera, Save, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import Button from '../common/Button';
import Input from '../common/Input';

function ProfileInfo() {
  const { user, updateProfile } = useAuth();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthDate: user?.birthDate || '',
    gender: user?.gender || ''
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // TODO: Appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProfile(formData);
      setIsEditing(false);
      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      birthDate: user?.birthDate || '',
      gender: user?.gender || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Informations personnelles</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            Modifier
          </Button>
        )}
      </div>

      {/* Photo de profil */}
      <div className="flex items-center gap-6 mb-8 pb-8 border-b">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-4xl font-bold text-white">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.firstName} className="w-full h-full rounded-full object-cover" />
            ) : (
              user?.firstName?.charAt(0)
            )}
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-orange-600 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{user?.firstName} {user?.lastName}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm text-gray-500 mt-1">Membre depuis {new Date(user?.createdAt || Date.now()).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Prénom"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Nom"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          disabled={!isEditing}
        />

        <Input
          label="Téléphone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          disabled={!isEditing}
          placeholder="06 12 34 56 78"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Date de naissance"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            disabled={!isEditing}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Genre</label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50"
            >
              <option value="">Sélectionner</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      {isEditing && (
        <div className="flex gap-3 mt-8 pt-6 border-t">
          <Button
            onClick={handleSave}
            variant="primary"
            isLoading={isSaving}
            icon={Save}
            fullWidth
          >
            Enregistrer les modifications
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            disabled={isSaving}
            icon={X}
          >
            Annuler
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;