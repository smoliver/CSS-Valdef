// Literals: ',' '/'
// Value combinators ' [ ] && | || '
// Value multiplyers '* + ? {int,int} # !'

// (Good Variable) goodVar = /<(['"]?)[a-z\-]+\1>/g

let breakPoints = /\s,\//

class CSSValdef {

// Ensures propper spacing between value combinators, value multiplyers, literals, and variables
// Validates propper variable names and parenthases
  static format (stringDefinition = '') {
    // Test to 

    let combinatorLiteralFormat = /(\|\||\||&&|\[|\]|,(?=[^{}]*(?:{|$))|\/|<[^>]*>)/g
    let multiplyerFormat = /\s*(\*|\+|\?|\{[^\}]*\}|\#|\!)/g;
    return stringDefinition.replace(combinatorLiteralFormat, ' $1 ')
      .replace(multiplyerFormat, '$1 ').replace(/\s+/g, ' ').trim();
  }

// Checks propper spacing between value combinators, literals, and variables
// Throws an error if there is an error
  static validateFormat (stringDefinition = '') {
    if(stringDefinition != CSSValdef.format (stringDefinition)){
      throw new Error(`Impropper CSS Value Definition syntax:\
        \n\tExpected: ${CSSValdef.format (stringDefinition)}\
        \n\tActual: ${stringDefinition}`
      );
    }
  }

// Checks for valid variable names
// returns true if valid
// Throws an error otherwise 
  static validateVariables (stringDefinition = '') {
    let error = '';
    let errorPrefix = "Variable Name Error::";

    // Test for empty variable names
    let emptyVariableDef = /<(['"])?\1>/g;
    let emptyVariableMessage =  errorPrefix + "Variable name may not be empty";
    let emptyVariableList = (stringDefinition.match(emptyVariableDef) || []);
    if (emptyVariableList.length) {
      error += `${emptyVariableMessage}\n\t${emptyVariableList.join ('\n\t')}\n\n`;
    }

    // Test for incomplete quotes
    let unmatchedQuotesDef = /<(['"])(?:(?!\1>)[^>])*(?!\1)>/g;
    let unmatchedQuotesMessage = "";
    let unmatchedQuotesList = (stringDefinition.match (unmatchedQuotesDef) || []);
    if (unmatchedQuotesList.length) {
      error += `${unmatchedQuotesMessage}\n\t${unmatchedQuotesList.join ('\n\t')}\n\n`;
    }

    // Test for bad characters in variable names
    let badCharacterDef = /<(?!["'])[a-z\-]*[^a-z\->][^>]*>/g;
    let badCharacterQuotedDef = /<(['"])[a-z\-]*(?:(?!\1>)[^a-z\->])(?:(?!\1>)[^>])*\1>/g;
    let badCharacterMessage = "Variable names may only include lower case letters and dashes"
    let badCharacterList = (stringDefinition.match (badCharacterDef) || []);
    badCharacterList = badCharacterList.concat (
      (stringDefinition.match (badCharacterQuotedDef) || []));
    if (badCharacterList.length) {
      error += `${badCharacterMessage}\n\t${badCharacterList.join ('\n\t')}\n\n`;
    }

    // If there are any errors output them under the prefix
    if(error.length){
      throw new Error (`${errorPrefix} ${error}`);
    }
    return true
  }

// Ensures that all braces, parentheses, and box backets have a full pair
// Throws an error, including the responsible bracket and the count
  static validateBrackets (stringDefinition = ''){
    let leftBraceCount = (stringDefinition.match ('{') || []).length;
    let rightBraceCount = (stringDefinition.match ('}') || []).length;
    let leftParenCount = (stringDefinition.match ('(') || []).length;
    let rightParenCount = (stringDefinition.match (')') || []).length;
    let leftBoxBracketCount = (stringDefinition.match ('[') || []).length;
    let rightBoxBracketCount = (stringDefinition.match (']') || []).length;

    // If there are any braces, parentheses, or box brackets without pair, throw an error
    if (leftBraceCount != rightBraceCount ||
        leftParenCount != rightParenCount ||
        leftBoxBracketCount != rightBoxBracketCount) {

      let errorMessage = 'Not all brackets are closed';
      if (leftBraceCount != rightBraceCount) {
        errorMessage += `\n\tThere are ${leftBraceCount} '{' and ${rightBraceCount} '}'`;
      }
      if (leftParenCount != rightParenCount) {
        errorMessage += `\n\tThere are ${leftParenCount} '(' and ${rightParenCount} ')'`;
      }
      if (leftBoxBracketCount != rightBoxBracketCount) {
        errorMessage += `\n\tThere are ${leftBoxBracketCount} '[' and ${leftBoxBracketCount} ']'`;
      }
      throw new Error (errorMessage);
    }

  }

  constructor (valueDefinition = '') {
    this.valueDefinition = CSSValdef.format(valueDefinition);
  }

  test (string=''){
    return CSSValdef.format(string) == this.valueDefinition;
  }
}

module.exports.CSSValdef = CSSValdef;