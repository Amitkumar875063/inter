import React, { useState } from 'react';
import { ArrowLeft, Edit3, Save, X, User, Mail, Phone, Building, CheckCircle } from 'lucide-react';
import { User as UserType, FormErrors } from '../types';

interface AccountSettingsProps {
  user: UserType;
  onNavigate: (screen: 'welcome') => void;
  onUpdateUser: (user: UserType) => void;
}

export default function AccountSettings({ user, onNavigate, onUpdateUser }: AccountSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!editedUser.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!editedUser.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(editedUser.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!editedUser.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!editedUser.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onUpdateUser(editedUser);
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setErrors({});
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserType, value: string) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate('welcome')}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h1 className="text-2xl font-bold text-white">Account Settings</h1>
              </div>
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Profile Section */}
          <div className="p-8">
            <div className="flex items-start gap-6 mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                {user.isAgency && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={editedUser.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`text-2xl font-bold bg-transparent border-b-2 pb-1 focus:outline-none focus:border-purple-500 w-full ${
                          errors.fullName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Full Name"
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`text-purple-600 bg-transparent border-b-2 pb-1 focus:outline-none focus:border-purple-500 w-full ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Email Address"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.fullName}</h2>
                    <p className="text-purple-600 mb-2">{user.email}</p>
                    {user.isAgency && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Verified Agency
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Phone Number</h3>
                </div>
                {isEditing ? (
                  <div>
                    <input
                      type="tel"
                      value={editedUser.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Phone Number"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                  </div>
                ) : (
                  <p className="text-gray-700">{user.phoneNumber}</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Company</h3>
                </div>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={editedUser.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Company Name"
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                  </div>
                ) : (
                  <p className="text-gray-700">{user.companyName}</p>
                )}
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">About</h3>
              {isEditing ? (
                <textarea
                  value={editedUser.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{user.bio}</p>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}