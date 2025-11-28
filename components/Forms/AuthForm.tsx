import React, { useState } from 'react';
import { Button } from '../UI/Button';
import { OtpInput } from '../UI/OtpInput';
import { api } from '../../services/api';

interface AuthFormProps {
  type: 'register' | 'enroll';
  onSuccess: (name: string) => void;
  onCancel: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onSuccess, onCancel }) => {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [otpError, setOtpError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) return;
    
    setLoading(true);
    try {
      await api.sendOtp(formData.phone);
      setStep('otp');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setLoading(true);
    setOtpError('');
    try {
      const isValid = await api.verifyOtp(formData.phone, otp);
      if (isValid) {
        if (type === 'register') {
            await api.registerUser(formData);
        }
        onSuccess(formData.name);
      } else {
        setOtpError('Invalid OTP. Try 1234.');
      }
    } catch (err) {
      setOtpError('Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {step === 'details' ? (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold ml-1">Full Name</label>
            <input
              name="name"
              required
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-[#0a585b]/30 focus:border-[#0a585b] outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold ml-1">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-[#0a585b]/30 focus:border-[#0a585b] outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold ml-1">Phone Number</label>
            <input
              name="phone"
              type="tel"
              required
              placeholder="+1 234 567 890"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-[#0a585b]/30 focus:border-[#0a585b] outline-none"
            />
          </div>

          {type === 'register' && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold ml-1">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-[#0a585b]/30 focus:border-[#0a585b] outline-none"
              />
            </div>
          )}

          <div className="flex gap-3 mt-4 justify-end">
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Enter the 4-digit code sent to {formData.phone}</p>
          <p className="text-xs text-[#0a585b] font-mono mb-4">(Hint: Use 1234)</p>
          
          <OtpInput onComplete={handleVerifyOtp} disabled={loading} />
          
          {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}
          {loading && <p className="text-sm text-[#0a585b] mt-2 animate-pulse">Verifying...</p>}

          <div className="flex gap-3 mt-6 justify-center">
            <Button variant="ghost" onClick={() => setStep('details')} disabled={loading}>Back</Button>
          </div>
        </div>
      )}
    </div>
  );
};