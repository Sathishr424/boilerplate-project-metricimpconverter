function ConvertHandler() {
  var alp = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var units = ['km', 'mi','gal','l','kg','lbs'];
  var abbr = ['kilometers', 'miles','gallons','liters','kilograms','pounds'];

  this.roundNumber = function(num, scale) {
    if(!("" + num).includes("e")) {
      return +(Math.round(num + "e+" + scale)  + "e-" + scale);
    } else {
      var arr = ("" + num).split("e");
      var sig = ""
      if(+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
  }

  this.getNum = function(input) {
    let result = '';
    for (var i=0; i<input.length; i++){
      if (alp.indexOf(input[i].toLowerCase()) != -1){
        break;
      }else result += '' + input[i];
    }if (result.length == 0) return 1;
    if (result.indexOf('/') != -1){
      result = parseFloat(result.substring(0,result.indexOf('/'))) / result.substring(result.indexOf('/')+1);
    }
    if (!result) return {error: 'invalid number'}
    return this.roundNumber(parseFloat(result),5);
  };
  
  this.getUnit = function(input) {
    let result = '';
    for (var i=0; i<input.length; i++){
      if (alp.indexOf(input[i].toLowerCase()) != -1){
        result = input.substring(i);
        break;
      }
    }if (result.length == 0) return {error: 'invalid unit'};
    if (units.indexOf(result.toLowerCase()) == -1) return {error: 'invalid unit'};
    return result.toLowerCase() == 'l' ? 'L' : result.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    if (typeof(initUnit) == 'object') return null;
    initUnit = initUnit.toLowerCase();
    let result;
    if (initUnit == 'gal') return 'L';
    else if (initUnit == 'lbs') return 'kg';
    else if (initUnit == 'mi') return 'km';
    else if (initUnit == 'l') return 'gal';
    else if (initUnit == 'kg') return 'lbs';
    else if (initUnit == 'km') return 'mi';
    return result;
  };

  this.spellOutUnit = function(unit) {
    return abbr[units.indexOf(unit.toLowerCase())];
  };
  
  this.convert = function(initNum, initUnit) {
    if (typeof(initNum) == 'object' || typeof(initUnit) == 'object') return null;
    initUnit = initUnit.toLowerCase();
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initUnit == 'lbs' || initUnit == 'kg'){
      result = initUnit == 'lbs' ? initNum * lbsToKg : initNum / lbsToKg;
    }else if (initUnit == 'gal' || initUnit == 'l'){
      result = initUnit == 'gal' ? initNum * galToL : initNum / galToL;
    }else if (initUnit == 'mi' || initUnit == 'km'){
      result = initUnit == 'mi' ? initNum * miToKm : initNum / miToKm;
    }
    return this.roundNumber(result, 5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  }; 
}

module.exports = ConvertHandler;
