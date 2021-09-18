const express = require('express');
const mongoose = require('mongoose');

const BillTransactionsObj = require('../models/billTransactions.js');

const router = express.Router();

const getTransactions = async (req, res) => {
    try {
        const allTrasact = await BillTransactionsObj.find();

        res.status(200).json(allTrasact);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getspecTransact = async (req, res) => {
    //console.log(req);
    console.log(req.params.userId);
    console.log(req.params.ownsUserId);
    const userId = req.params.userId;
    var ownsUserId = req.params.ownsUserId;
    try {
        const filter ={ creditedBy: ownsUserId, creditedTo: userId }
        const userTrasact = await BillTransactionsObj.aggregate([
            {
                $match: filter, 
            }, {
                $group: {
                    _id: "$credit"
                }},
        ]);
        const userTrasact2 = await BillTransactionsObj.aggregate([
            {
                $match: { creditedBy: userId, creditedTo: ownsUserId },
            }, {
                $group: {
                    _id: "$credit"
                }
            },
        ]);
        console.log(userTrasact2);
        console.log(userTrasact);

        var userTrasactVal1 = (userTrasact[0]) ? userTrasact[0]._id : 0;
        var userTrasactVal2 = (userTrasact2[0]) ? userTrasact2[0]._id : 0;


        var actualAmount = userTrasactVal1;
        //if (userTrasact2[0]._id) {
        actualAmount = Math.abs(userTrasactVal1 - userTrasactVal2);
        //}
        var textResultVar = userId + " Owes " + ownsUserId + " : " + actualAmount;
        var returnJson = [];
        if (userTrasactVal1 > userTrasactVal2) {
            returnJson.push({ "result": textResultVar});
        } else {
            textResultVar = ownsUserId+ " Owes " + userId + " : " + actualAmount;
            returnJson.push({ "result": textResultVar });
        }
        console.log(returnJson);
        //
        //const userTrasact2 = await BillTransactionsObj.find({ creditedBy: userId, creditedTo: ownsUserId });



        res.status(200).json(returnJson);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createTransaction = async (req, res) => {
    //console.log(req.body.userId);
    //console.log(req.body.amount);
    const userobject = { 'u1': "user1", 'u2': "user2", 'u3': "user3", 'u4': "user4" };
    var userIdDb = req.body.userId;
    var useramountDb = parseInt(req.body.amount);
    var dividedAmt = 0;
    if (useramountDb > 0) {
        dividedAmt = (useramountDb / 4);
    } var newtransaction;

    //should use transaction statement in code here
    for (const key in userobject) {
        //console.log(key, userobject[key]);
        if (userIdDb!=key) {
            newtransaction= new BillTransactionsObj({
                billId: "billId",
                creditedBy: userIdDb,
                credit: dividedAmt,
                creditedTo: key,
                created_on: req.body.created_on
            });
            try {
                await newtransaction.save();
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }



    }

    res.status(201).json(newtransaction);
    //res.status(201).json(userobject);
    /*
    */
}
module.exports.getTransactions = getTransactions;
module.exports.createTransaction = createTransaction;
module.exports.getspecTransact = getspecTransact;