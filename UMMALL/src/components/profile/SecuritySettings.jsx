// ============================================
// FICHIER 4: src/components/profile/SecuritySettings.jsx
// Paramètres de sécurité
// ============================================

import React, { useState } from 'react';
import { Lock, Shield, Smartphone, Key, AlertTriangle } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { useToast } from '../common/Toast';

function SecuritySettings() {
  const toast = useToast();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChangePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.new.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    try {
      // TODO: Appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Mot de passe modifié avec succès');
      setShowPasswordForm(false);
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (error) {
      toast.error('Erreur lors du changement de mot de passe');
    }
  };

  const handleToggle2FA = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTwoFactorEnabled(!twoFactorEnabled);
      toast.success(
        twoFactorEnabled 
          ? 'Authentification à deux facteurs désactivée'
          : 'Authentification à deux facteurs activée'
      );
    } catch (error) {
      toast.error('Erreur lors de la configuration');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Mot de passe */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Mot de passe</h2>
            <p className="text-sm text-gray-600">Modifiez votre mot de passe</p>
          </div>
        </div>

        {!showPasswordForm ? (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">••••••••</p>
              <p className="text-sm text-gray-600">Dernière modification il y a 3 mois</p>
            </div>
            <Button onClick={() => setShowPasswordForm(true)} variant="outline">
              Modifier
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              label="Mot de passe actuel"
              type="password"
              value={passwordData.current}
              onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
            />
            <Input
              label="Nouveau mot de passe"
              type="password"
              value={passwordData.new}
              onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
            />
            <Input
              label="Confirmer le nouveau mot de passe"
              type="password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
            />

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-900">
                <p className="font-semibold mb-1">Exigences du mot de passe :</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Au moins 8 caractères</li>
                  <li>Au moins une majuscule</li>
                  <li>Au moins un chiffre</li>
                  <li>Au moins un caractère spécial</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleChangePassword} variant="primary" fullWidth>
                Enregistrer
              </Button>
              <Button onClick={() => setShowPasswordForm(false)} variant="outline">
                Annuler
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Authentification à deux facteurs */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Authentification à deux facteurs</h2>
            <p className="text-sm text-gray-600">Ajoutez une couche de sécurité supplémentaire</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">
                {twoFactorEnabled ? 'Activée' : 'Désactivée'}
              </p>
              <p className="text-sm text-gray-600">
                {twoFactorEnabled 
                  ? 'Code requis à chaque connexion'
                  : 'Activez pour plus de sécurité'
                }
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={handleToggle2FA}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      {/* Sessions actives */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <Key className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Sessions actives</h2>
            <p className="text-sm text-gray-600">Gérez vos appareils connectés</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { device: 'Chrome sur Windows', location: 'Paris, France', current: true, lastActive: 'Maintenant' },
            { device: 'Safari sur iPhone', location: 'Paris, France', current: false, lastActive: 'Il y a 2h' }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-900">{session.device}</p>
                  {session.current && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                      Actuel
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{session.location}</p>
                <p className="text-xs text-gray-500">Dernière activité: {session.lastActive}</p>
              </div>
              {!session.current && (
                <button className="text-sm text-red-600 hover:text-red-700 font-semibold">
                  Déconnecter
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SecuritySettings;
