import express from 'express';
import TradeRequestController from '../controllers/traderequest.controller';

const router = express.Router();

router.route('/api/traderequests').get(TradeRequestController.list);

router.route('/api/traderequests/load').get(TradeRequestController.loadRequests);

export default router;
