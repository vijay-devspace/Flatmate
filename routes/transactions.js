const express = require("express");

const transactionsObj = require("../controllers/transactions");

const router = express.Router();
console.log('====', transactionsObj);
router.get('/', transactionsObj.getTransactions);
router.get('/:userId/:ownsUserId', transactionsObj.getspecTransact);
router.post('/', transactionsObj.createTransaction);

module.exports = router;
