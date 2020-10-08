import express from 'express';
import sellRequestController from '../controllers/sellrequest.controller';

const router = express.Router();

router.route('/api/sellrequests/')
  .get(sellRequestController.list)
  .post(sellRequestController.create);

router.route('/api/sellrequests/:sellRequestId')
  .put(sellRequestController.update)
  .delete(sellRequestController.remove);
router.param('sellRequestId', sellRequestController.sellRequestById);

export default router;
