import dotenv from 'dotenv';

dotenv.config();

export const config = {
  secretKey: process.env.CARDLY_SECRET_KEY,
  port: parseInt(process.env.CARDLY_PORT),
  serverAddress: process.env.CARDLY_SERVER_ADDRESS,
};
