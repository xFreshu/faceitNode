import express, { Express, Request, Response } from 'express';
import { logger } from './logger';

const app: Express = express();
const port: 3000 = 3000;

app.get('/', (req: Request, res: Response): void => {
  logger.info('Obsługiwane żądanie GET /');
  res.send('Witaj, świecie!');
});

app.get('/error', (req: Request, res: Response): void => {
  try {
    throw new Error('Przykładowy błąd');
  } catch (error: any) {
    logger.error(`Wystąpił błąd: ${error.message}`);
    res.status(500).send('Coś poszło nie tak');
  }
});

app.listen(port, () => {
  logger.info(`Serwer działa na http://localhost:${port}`);
});
