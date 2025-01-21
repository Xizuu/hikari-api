import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import router from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to HikariFlix API"
  });
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
