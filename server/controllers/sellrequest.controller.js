import extend from 'lodash/extend';
import errorHandler from '../helpers/dbErrorHandler';
import SellRequest from '../models/sellrequest.model';

const list = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const resultsPerPage = parseInt(req.query.limit, 10);
  try {
    const sellRequests = (page && resultsPerPage) ? await SellRequest.find().skip((resultsPerPage * page) - resultsPerPage).limit(resultsPerPage) : await SellRequest.find().select('deviceName pricing image requestType created updated');
    return res.json(sellRequests);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const create = async (req, res) => {
  const sellRequest = new SellRequest(req.body);
  try {
    await sellRequest.save();
    return res.status(200).json({
      message: 'Sell request created successfully',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const sellRequestById = async (req, res, next, id) => {
  try {
    const sellRequest = await SellRequest.findById(id);
    if (!sellRequest) {
      return res.status(400).json({
        error: 'Sell request not found',
      });
    }
    return res.json(sellRequest);
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve sell request',
    });
  }
};
const update = async (req, res) => {
  try {
    let sellRequest = {};
    sellRequest = extend(sellRequest, req.body);
    sellRequest.updated = Date.now();
    await sellRequest.save();
    return res.json(sellRequest);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const remove = async (req, res) => {
  try {
    let sellRequest;
    const deletedSellRequest = await sellRequest.remove();
    return res.json(deletedSellRequest);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create, update, remove, list, sellRequestById,
};
