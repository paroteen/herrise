import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: (amount: number, paymentMethod: string, email: string, name: string, phone?: string) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, onDonate }) => {
  const [amount, setAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('general');
  const [message, setMessage] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((amount || customAmount) && paymentMethod && name && email && consent) {
      onDonate(
        customAmount ? Number(customAmount) : Number(amount),
        paymentMethod,
        email,
        name,
        phone || undefined
      );
    }
  };

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(0);
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-modal-title"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 sm:p-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Close donation form"
          >
            <X size={24} />
          </button>
          <div className="text-center mb-8">
            <h2 id="donation-modal-title" className="text-2xl sm:text-3xl font-semibold text-gray-800">Donate Now</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Your donation makes a difference. Please fill out the form below to contribute.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount (RWF)*</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {[5000, 10000, 25000, 50000].map((value) => (
                  <button key={value} type="button" onClick={() => handleAmountSelect(value)} className={`py-3 px-2 rounded-md border ${amount === value ? 'bg-purple-100 border-purple-500 text-purple-700' : 'border-gray-300 hover:bg-gray-50'} transition-colors`}>
                    {value.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="mt-2">
                <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-1">Or enter a custom amount</label>
                <input type="number" id="custom-amount" value={customAmount} onChange={handleCustomAmountChange} placeholder="Enter amount" className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none" min="100" step="100" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method*</label>
              <div className="space-y-2">
                {['mobile_money', 'card', 'bank'].map((value) => (
                  <label key={value} className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                    <input type="radio" name="payment-method" value={value} checked={paymentMethod === value} onChange={() => setPaymentMethod(value)} className="h-4 w-4 text-purple-600 focus:ring-purple-500" required={value === 'mobile_money'} />
                    <span className="ml-3 text-sm text-gray-700">{value === 'mobile_money' ? 'Mobile Money' : value === 'card' ? 'Credit/Debit Card' : 'Bank Transfer'}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">Purpose (Optional)</label>
              <select id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none">
                <option value="general">General Donation</option>
                <option value="education">Education Programs</option>
                <option value="healthcare">Healthcare Support</option>
                <option value="empowerment">Women Empowerment</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea id="message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none" placeholder="Add a message with your donation" />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="consent" name="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" required />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="consent" className="font-medium text-gray-700">I agree to the terms and understand this donation is non-refundable.</label>
                <p className="text-gray-500">Your donation will be processed securely.</p>
              </div>
            </div>
            <button type="submit" disabled={!consent || (!amount && !customAmount) || !name || !email} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Donate Now {(amount || customAmount) && `RWF ${(customAmount || amount)?.toLocaleString()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default DonationModal;
