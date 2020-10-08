import extend from 'lodash/extend';
import BuyRequest from '../models/buyrequest.model';
import errorHandler from '../helpers/dbErrorHandler';

const list = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const resultsPerPage = parseInt(req.query.limit, 10);

  try {
    const buyRequests = (page && resultsPerPage) ? await BuyRequest.find().skip((resultsPerPage * page) - resultsPerPage).limit(resultsPerPage) : await BuyRequest.find().select('deviceName pricing image requestType created updated');
    return res.json(buyRequests);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const create = async (req, res) => {
  const buyRequest = new BuyRequest(req.body);
  try {
    await buyRequest.save();
    return res.status(200).json({
      message: 'Buy request created successfully',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const buyRequestById = async (req, res, next, id) => {
  try {
    const buyRequest = await BuyRequest.findById(id);
    if (!buyRequest) {
      return res.status(400).json({
        error: 'Buy request not found',
      });
    }
    return res.json(buyRequest);
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve buy request',
    });
  }
};
const update = async (req, res) => {
  try {
    let buyRequest = {};
    buyRequest = extend(buyRequest, req.body);
    buyRequest.updated = Date.now();
    await buyRequest.save();
    return res.json(buyRequest);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const remove = async (req, res) => {
  try {
    let buyRequest;
    const deletedBuyRequest = await buyRequest.remove();
    return res.json(deletedBuyRequest);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create, update, remove, list, buyRequestById,
};
