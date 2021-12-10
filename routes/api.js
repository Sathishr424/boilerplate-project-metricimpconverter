'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req,res)=>{
     //console.log(req.query.input);
    var input = req.query.input;
    var initNum = convertHandler.getNum(input), 
      initUnit = convertHandler.getUnit(input),
      returnNum = convertHandler.convert(initNum,initUnit), 
      returnUnit = convertHandler.getReturnUnit(initUnit);
    // console.log("=", initNum, 
        // initUnit,
        // returnNum,
        // returnUnit);
    if (typeof(initNum) == "object" || typeof(initUnit) == 'object'){
      if (typeof(initNum) == "object" && typeof(initUnit) == "object")
        res.send('invalid number and unit')
      else if(typeof(initNum) == "object")
        res.send('invalid number')
      else
        res.send('invalid unit')
    }else{
      res.json({ 
        initNum, 
        initUnit,
        returnNum,
        returnUnit,
        string:  convertHandler.getString(initNum,initUnit,returnNum,returnUnit)
      });
    }
  });
};
