import { CSSValdef } from '../distribution/index.js';
import assert from 'assert';

describe ('CSSValdef', function () {
  // Tests the format function 
  describe ('format', function () {
    it ('Should place one space between value combinators, literals, and variables', function () {
      let squishedSyntax = '[[left||right]&&<length>|<width>] |inherit,game';
      let propperSyntax = '[ [ left || right ] && <length> | <width> ] | inherit , game';
      assert.equal (CSSValdef.format(squishedSyntax), propperSyntax);
    });
    it ('Should remove all extra white space and replace white space characters with a single space', function () {
      let spacySyntax = '[  [    left \t|| right \f]\n&&\r<length>\t| <width>\v] | inherit'
      let propperSyntax = '[ [ left || right ] && <length> | <width> ] | inherit';
      assert.equal (CSSValdef.format(spacySyntax), propperSyntax);
    });
    it ('should ensure no space before, and a single space after all multiplyers', function () {
      let spacyMultiplyers = 'one    ?two {10,14}three!four# five+ six *';
      let propperMultiplyer = 'one? two{10,14} three! four# five+ six*';
      assert.equal (CSSValdef.format(spacyMultiplyers), propperMultiplyer);
    });
    it ('Should remove leading and trailing spaces', function () {
      let misleadingSyntax = '   [ [ left || right ] && <length> | <width> ] | inherit   ';
      let propperSyntax = '[ [ left || right ] && <length> | <width> ] | inherit';
      assert.equal (CSSValdef.format(misleadingSyntax), propperSyntax);
    });
  });
  // Testing for the Validate Layout Function
  describe ('validate', function (){
    // Test Propper spacing
    it ('Should throw an impropper CSS Value Definition syntax error', function () {
      let squishedSyntax = '[ [ left|| right ] && <length> | <width> ] | inherit'
      let caughtErrorMessage = /Impropper CSS Value Definition syntax/;
      assert.throws (CSSValdef.validate.bind (this, squishedSyntax), caughtErrorMessage, 
        `\n     Impropper syntax not raising error:\n\t${squishedSyntax}`);
    });
    it ('Should not throw an error', function () {
      let propperSyntax = '[ [ left || right ] && <length> | <width> ] | inherit';
      assert.doesNotThrow (CSSValdef.validate.bind (this, propperSyntax), 
        `\n     Propper syntax raising unexpected error\n\t${propperSyntax}`)
    });
  })
  // Testing for the Validate Variables Function
  describe ('Validate Variable Names', function (){
    let errorDescription = `\n     Impropper variable name not raising error:`
    let thrownError = /Invalid Variables/;
    it ('Should throw an error for empty variable names', function () {
      assert.throws (CSSValdef.validateVariables.bind (this, '<>'), thrownError, errorDescription)
    })
  })
});