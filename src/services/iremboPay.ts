/**
 * IremboPay Integration – donation payments via IremboPay gateway.
 */

export interface IremboPayConfig {
  paymentUrl?: string;
  amount?: number;
  description?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export function openIremboPay(config: IremboPayConfig = {}) {
  const {
    paymentUrl = import.meta.env.VITE_IREMBO_PAY_URL || 'https://pay.irembo.gov.rw',
    amount,
    description = 'Donation to HerRise Development Organisation',
    customerEmail,
    customerPhone,
  } = config;

  const params = new URLSearchParams();
  if (amount) params.append('amount', amount.toString());
  if (description) params.append('description', description);
  if (customerEmail) params.append('email', customerEmail);
  if (customerPhone) params.append('phone', customerPhone);
  params.append('reference', `DONATION-${Date.now()}`);
  params.append('merchant', 'HerRise Development Organisation');

  window.open(`${paymentUrl}?${params.toString()}`, '_blank', 'noopener,noreferrer');
}

export function useIremboPay() {
  const handleDonation = (amount?: number, additionalConfig?: Partial<IremboPayConfig>) => {
    openIremboPay({ amount, ...additionalConfig });
  };
  return { handleDonation, openIremboPay };
}
