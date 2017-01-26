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
  describe ('Validate Format', function (){
    // Test Propper spacing
    it ('Should throw an impropper CSS Value Definition syntax error', function () {
      let squishedSyntax = '[ [ left|| right ] && <length> | <width> ] | inherit'
      let caughtErrorMessage = /Impropper CSS Value Definition syntax/;
      assert.throws (CSSValdef.validateFormat.bind (this, squishedSyntax), caughtErrorMessage, 
        `\n     Impropper syntax not raising error:\n\t${squishedSyntax}`);
    });
    it ('Should not throw an error', function () {
      let propperSyntax = '[ [ left || right ] && <length> | <width> ] | inherit';
      assert.doesNotThrow (CSSValdef.validateFormat.bind (this, propperSyntax), 
        `\n     Propper syntax raising unexpected error\n\t${propperSyntax}`)
    });
  })

  // Testing for the Validate Variables Function
  describe ('Validate Variables', function (){
    let errorDescription = `\n     Impropper variable name not raising error:`
    let falseErrorDescription = `\n     Propper variable name raising errors`
    let thrownError = /Variable Name Error::/;
    
    // Validate that empty variables raise errors
    it ('Should throw an error for empty names', function () {
      assert.throws (CSSValdef.validateVariables.bind (this, '<>'), thrownError, errorDescription)
      assert.throws (CSSValdef.validateVariables.bind (this, '<\'\'>'), thrownError, errorDescription)
      assert.throws (CSSValdef.validateVariables.bind (this, '<\"\">'), thrownError, errorDescription)
    });

    // Test for incomplete quotes
    it ('Should throw an error for names comprised of incomplete quotes');

    // Test for bad characters
    it ('Should throw an error if an invalid character is used');

    // Test to make sure good variables are not triggering errors
    it ('Should not throw an error for valid variable names');


  })
});