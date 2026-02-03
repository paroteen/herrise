import React, { useState } from 'react';
import { X } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: (amount: number, paymentMethod: string, email: string) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, onDonate }) => {
  const [amount, setAmount] = useState<number | ''>('');
  const [paymentMethod, setPaymentMethod] = useState('mobile_money');
  const [email, setEmail] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && paymentMethod) {
      onDonate(Number(amount), paymentMethod, email);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Make a Donation</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donation Amount (RWF)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[5000, 10000, 20000].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setAmount(value);
                      setIsCustomAmount(false);
                    }}
                    className={`py-2 px-4 rounded-md border ${
                      amount === value && !isCustomAmount
                        ? 'bg-purple-100 border-purple-500 text-purple-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {value.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="customAmount"
                  checked={isCustomAmount}
                  onChange={() => {
                    setIsCustomAmount(true);
                    setAmount('');
                  }}
                  className="h-4 w-4 text-purple-600"
                />
                <label htmlFor="customAmount" className="ml-2 text-sm text-gray-700">
                  Other Amount
                </label>
              </div>
              {isCustomAmount && (
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || '')}
                  placeholder="Enter amount"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  min="100"
                  step="100"
                  required
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                required
              >
                <option value="mobile_money">Mobile Money</option>
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={!amount}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Donate {amount ? `RWF ${Number(amount).toLocaleString()}` : ''}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
