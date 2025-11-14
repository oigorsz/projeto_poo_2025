// src/routes.ts
import { Router } from 'express';
import { CardController } from './controllers/CardController';

const router = Router();
const cardController = new CardController();

// Rotas da Aplicação
router.post('/cards', cardController.create);
router.get('/cards', cardController.index);
router.put('/cards/:id', cardController.update);
router.delete('/cards/:id', cardController.delete);

export { router };