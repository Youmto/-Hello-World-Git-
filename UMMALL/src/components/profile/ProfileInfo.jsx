// ============================================
// FICHIER: src/components/profile/ProfileInfo.jsx
// Design Premium - Informations personnelles
// ============================================

import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Save, X, Upload, Camera } from 'lucide-react';
import Button from '../common/Button';
import { useToast } from '../common/Toast';

function ProfileInfo({ initialData = {} }) {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    avatar: initialData.avatar || null,
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    dateOfBirth: initialData.dateOfBirth || '',
    gender: initialData.gender || '',
    bio: initialData.bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simuler API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast.success('Profil mis à jour avec succès !');
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      avatar: initialData.avatar || null,
      firstName: initialData.firstName || '',
      lastName: initialData.lastName || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
      dateOfBirth: initialData.dateOfBirth || '',
      gender: initialData.gender || '',
      bio: initialData.bio || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-primary-600" />
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                Informations personnelles
              </h2>
              <p className="text-sm text-neutral-600">
                Gérez vos informations de compte
              </p>
            </div>
          </div>

          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="medium"
            >
              Modifier
            </Button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        
        {/* Photo de profil */}
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-100 border-4 border-white shadow-lg">
              {formData.avatar ? (
                <img 
                  src={formData.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500">
                  <span className="text-3xl font-bold text-white">
                    {formData.firstName?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
            </div>

            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900">
              Photo de profil
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              JPG, PNG ou GIF. Max 2MB.
            </p>
            {isEditing && (
              <label className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors text-sm">
                <Upload className="w-4 h-4" />
                <span>Changer la photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Formulaire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Prénom */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Prénom
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`
                  w-full pl-11 pr-4 py-3 rounded-lg border
                  ${isEditing 
                    ? 'border-neutral-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100' 
                    : 'border-neutral-200 bg-neutral-50'
                  }
                  focus:outline-none transition-all
                `}
              />
            </div>
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Nom
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`
                  w-full pl-11 pr-4 py-3 rounded-lg border
                  ${isEditing 
                    ? 'border-neutral-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100' 
                    : 'border-neutral-200 bg-neutral-50'
                  }
                  focus:outline-none transition-all
                `}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-500 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              L'email ne peut pas être modifié
            </p>
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Téléphone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`
                  w-full pl-11 pr-4 py-3 rounded-lg border
                  ${isEditing 
                    ? 'border-neutral-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100' 
                    : 'border-neutral-200 bg-neutral-50'
                  }
                  focus:outline-none transition-all
                `}
              />
            </div>
          </div>

          {/* Date de naissance */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Date de naissance
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={!isEditing}
                className={`
                  w-full pl-11 pr-4 py-3 rounded-lg border
                  ${isEditing 
                    ? 'border-neutral-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100' 
                    : 'border-neutral-200 bg-neutral-50'
                  }
                  focus:outline-none transition-all
                `}
              />
            </div>
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Genre
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className={`
                w-full px-4 py-3 rounded-lg border
                ${isEditing 
                  ? 'border-neutral-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100' 
                  : 'border-neutral-200 bg-neutral-50'
                }
                focus:outline-none transition-all
              `}
            >
              <option value="">Non spécifié</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">
            Bio (optionnel)
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={!isEditing}
            rows={4}
            placeholder="Parlez-nous de vous..."
            className={`
              w-full px-4 py-3 rounded-lg border resize-none
              ${isEditing 
                ? 'border-neutral-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100' 
                : 'border-neutral-200 bg-neutral-50'
              }
              focus:outline-none transition-all
            `}
          />
          {isEditing && (
            <p className="text-xs text-neutral-500 mt-1">
              {formData.bio.length}/500 caractères
            </p>
          )}
        </div>

        {/* Actions */}
        {isEditing && (
          <div className="flex gap-3 pt-4 border-t border-neutral-200">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              variant="primary"
              size="large"
              icon={isSaving ? null : <Save className="w-5 h-5" />}
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </Button>

            <Button
              onClick={handleCancel}
              disabled={isSaving}
              variant="outline"
              size="large"
              icon={<X className="w-5 h-5" />}
            >
              Annuler
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;