import { Malga } from 'malga'

const malga = new Malga({
  apiKey: 'YOUR_API_KEY',
  clientId: 'YOUR_CLIENT_ID',
  options: { sandbox: true },
});

(async function () {
  try {
    const data = await malga.charges.create({
      merchantId: 'YOUR_MERCHANT_ID',
      amount: 100,
      paymentMethod: {
        type: 'credit',
        installments: 1,
        card: {
          holderName: 'João da Silva',
          number: '5453881028277600',
          cvv: '170',
          expirationDate: '10/2030',
        },
      },
    })

    console.log(data)
  } catch (error) {
    console.error(error)
  }
})();
