// Single source of truth for the Reply Portal. Imported by the SPA and by api/* functions.
export const SITE = {
  name: 'Bar Fridges For Sale',
  domain: 'www.barfridgesforsale.com.au',
  origin: 'https://www.barfridgesforsale.com.au',
  email: 'info@barfridgesforsale.com.au'
};

export const REPLY = {
  orderPrefix: 'BFFS',
  currency: { code: 'AUD', symbol: '$', locale: 'en-AU' },
  brand: { primary: '#0284c7', headerDark: '#0b1220' },
  // Put the business WhatsApp number here (digits, with country code, e.g. 61400000000)
  // to enable WhatsApp checkout + the admin WhatsApp reply panel. Empty = disabled.
  channels: { whatsapp: '' },
  destinations: {
    contact: 'info@barfridgesforsale.com.au',
    order: 'info@barfridgesforsale.com.au',
    wholesale: 'info@barfridgesforsale.com.au'
  },
  // discountPct applies to the cart subtotal when the customer picks that method
  paymentMethods: [
    { id: 'usdt', label: 'USDT (TRC20 / ERC20)', discountPct: 10 },
    { id: 'btc', label: 'Bitcoin (BTC)', discountPct: 10 },
    { id: 'eth', label: 'Ethereum (ETH)', discountPct: 10 },
    { id: 'sol', label: 'Solana (SOL)', discountPct: 10 }
  ],
  terms: [
    'Please pay the exact amount shown, using the details provided.',
    'After paying, upload a screenshot of your payment using the confirmation link.',
    'Dispatch occurs within 24 hours of confirmed payment.',
    'Include your order reference with your payment where the method allows it.'
  ]
};
