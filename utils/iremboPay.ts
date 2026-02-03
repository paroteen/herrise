/**
 * IremboPay Integration Utility
 * Handles donation payments through IremboPay gateway
 */

export interface IremboPayConfig {
  // IremboPay merchant/payment link URL
  paymentUrl?: string;
  // Optional: Amount in RWF
  amount?: number;
  // Optional: Description for the donation
  description?: string;
  // Optional: Customer email
  customerEmail?: string;
  // Optional: Customer phone number
  customerPhone?: string;
}

/**
 * Opens IremboPay payment page for donations
 * @param config - Payment configuration
 */
export const openIremboPay = (config: IremboPayConfig = {}) => {
  const {
    paymentUrl = import.meta.env.VITE_IREMBO_PAY_URL || 'https://pay.irembo.gov.rw',
    amount,
    description = 'Donation to HerRise Development Organisation',
    customerEmail,
    customerPhone,
  } = config;

  // Build payment URL with parameters
  const params = new URLSearchParams();
  
  if (amount) {
    params.append('amount', amount.toString());
  }
  
  if (description) {
    params.append('description', description);
  }
  
  if (customerEmail) {
    params.append('email', customerEmail);
  }
  
  if (customerPhone) {
    params.append('phone', customerPhone);
  }
  
  // Add reference for tracking
  params.append('reference', `DONATION-${Date.now()}`);
  params.append('merchant', 'HerRise Development Organisation');

  const fullUrl = `${paymentUrl}?${params.toString()}`;
  
  // Open IremboPay in a new window/tab
  window.open(fullUrl, '_blank', 'noopener,noreferrer');
};

/**
 * React hook for IremboPay donation
 */
export const useIremboPay = () => {
  const handleDonation = (amount?: number, additionalConfig?: Partial<IremboPayConfig>) => {
    openIremboPay({
      amount,
      ...additionalConfig,
    });
  };

  return { handleDonation, openIremboPay };
};
