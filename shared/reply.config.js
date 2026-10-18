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
    { id: 'usdt', label: 'USDT (TRC20)', discountPct: 10, network: 'Tron (TRC20)', wallet: 'TBnrAF6yjaYyUBXFGDzDUdkUG7EZr6qrFN' },
    // wallet + network pre-fill the admin "Send payment details" screen for that method (review, then send)
    { id: 'btc', label: 'Bitcoin (BTC)', discountPct: 10, network: 'Bitcoin', wallet: 'bc1qkh6y6wqm8clgrdg3act8vt8j4d20hnn5up9lzh' },
    { id: 'eth', label: 'Ethereum (ETH)', discountPct: 10, network: 'Ethereum', wallet: '0x71e590e953d8DBf7a2d8a4Fa58Ea55c3c57A6f8C' },
  ],
  terms: [
    'Please pay the exact amount shown, using the details provided.',
    'After paying, upload a screenshot of your payment using the confirmation link.',
    'Dispatch occurs within 24 hours of confirmed payment.',
    'Include your order reference with your payment where the method allows it.'
  ]
};
