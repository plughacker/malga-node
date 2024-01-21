import express, { Request, Response } from "express";
import { Malga } from 'malga';

const server = express();
const port = 3000;

server.post("/", async (request: Request, response: Response) => {
  const malga = new Malga({
    apiKey: 'YOUR_API_KEY',
    clientId: 'YOUR_CLIENT_ID',
    options: { sandbox: true },
  });

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

    return response.json(data)
  } catch (error) {
    return response.status(400).json(error)
  }
});

server.listen(port, () => {
  console.log(`server running into port ${port}`);
});
