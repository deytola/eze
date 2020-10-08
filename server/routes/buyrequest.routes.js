import express from 'express';
import buyRequestController from '../controllers/buyrequest.controller';

const router = express.Router();

router.route('/api/buyrequests')
  .get(buyRequestController.list)
  .post(buyRequestController.create);

router.route('/api/buyrequests/:buyRequestId')
  .put(buyRequestController.update)
  .delete(buyRequestController.remove);
router.param('buyRequestId', buyRequestController.buyRequestById);

export default router;
