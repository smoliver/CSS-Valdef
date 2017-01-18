import { CSSValdef } from '../distribution/index.js';
import assert from 'assert';

describe ('CSSValdef', function () {
  describe ('test', function () {
    let value = 'One value';
    let otherValue = 'Another value';
    let valueDef = new CSSValdef (value);
    
    it ('Should return true when the values are equal', function () {
      assert.ok (valueDef.test (value));
    });
    it ('Should return false when the values are not euqal', function (){
      assert.ok (!valueDef.test (otherValue))
    });
  });
  describe ('format', function () {
    it ('Should place one space between value combinators, literals, and variables', function () {
      let squishedSyntax = '[[left||right]&&<length>|<width>]|inherit';
      let propperSyntax = '[ [ left || right ] && <length> | <width> ] | inherit';
      assert.equal (CSSValdef.format(squishedSyntax), propperSyntax);
    });
    it ('Should replace all white space characters with a space, and remove extras', function () {
      let spacySyntax = '[  [    left \t|| right \f]\n&&\r<length>\t| <width>\v] | inherit'
      let propperSyntax = '[ [ left || right ] && <length> | <width> ] | inherit';
      assert.equal (CSSValdef.format(spacySyntax), propperSyntax);
    });
    it ('Should remove leading and trailing spaces', function () {
      let misleadingSyntax = '   [ [ left || right ] && <length> | <width> ] | inherit   ';
      let propperSyntax = '[ [ left || right ] && <length> | <width> ] | inherit';
      assert.equal (CSSValdef.format(misleadingSyntax), propperSyntax);
    });
  });
  describe ('validate', function (){
    it ('Should throw an impropper CSS Value Definition syntax error', function () {
      let squishedSyntax = '[ [ left|| right ] && <length> | <width> ] | inherit'
      let syntaxError = /Impropper CSS Value Definition syntax/;
      assert.throws(CSSValdef.validate.bind(this, squishedSyntax), syntaxError)
    });
  })
});