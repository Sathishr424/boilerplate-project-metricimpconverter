const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test("should correctly read a whole number input", function(){
    assert.equal(12, convertHandler.getNum('12kg'));
  });
  test("should correctly read a decimal number input", function(){
    assert.equal(12.5, convertHandler.getNum('12.5kg'));
  });
  test("should correctly read a fractional input", function(){
    assert.equal(0.875, convertHandler.getNum('7/8lbs'));
  });
  test("should correctly read a fractional input with a decimal", function(){
    assert.equal(1.8, convertHandler.getNum('5.4/3lbs'));
  });
  test(" should correctly return an error on a double-fraction (i.e. 3/2/3)", function(){
    assert.deepEqual({error: 'invalid number'}, convertHandler.getNum('5/4/3lbs'));
  });
  test("should correctly default to a numerical input of 1 when no numerical input is provided", function(){
    assert.equal(1, convertHandler.getNum('lbs'));
  });
  test("should correctly read each valid input unit", function(){
    assert.equal("mi", convertHandler.getUnit('2mi'));
    assert.equal("lbs", convertHandler.getUnit('2lbs'));
    assert.equal("gal", convertHandler.getUnit('2gal'));
  });
  test("should correctly return an error for an invalid input unit", function(){
    assert.deepEqual({ error: 'invalid unit' }, convertHandler.getUnit('2gd'));
  });
  test("should return the correct return unit for each valid input unit", function(){
    assert.equal("mi", convertHandler.getReturnUnit('km'));
    assert.equal("lbs", convertHandler.getReturnUnit('kg'));
    assert.equal("gal", convertHandler.getReturnUnit('L'));
  });
  test("should correctly return the spelled-out string unit for each valid input unit", function(){
    assert.equal("gallons", convertHandler.spellOutUnit('gal'));
    assert.equal("kilometers", convertHandler.spellOutUnit('km'));
    assert.equal("pounds", convertHandler.spellOutUnit('lbs'));
  });
  test("should correctly convert gal to L", function(){
    assert.equal(37.8541, convertHandler.convert(10,'gal'));
  });
  test("should correctly convert L to gal", function(){
    assert.equal(2.64172, convertHandler.convert(10,'L'));
  });
  test("Should correctly convert mi to km", () => {
    assert.equal(16.0934, convertHandler.convert(10, "mi"));
  });
  test("Should correctly convert km to mi", () => {
    assert.equal(0.13315, convertHandler.convert(1.5 / 7, "km"));
  });
  test("Should correctly convert lbs to kg", () => {
    assert.equal(4.53592, convertHandler.convert(10, "lbs"));
  });
  test("Should correctly convert kg to lbs", () => {
    assert.equal(22.04624, convertHandler.convert(10, "kg"));
  });
});