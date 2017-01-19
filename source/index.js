// Literals: ',' '/'
// Value combinators ' [ ] && | || '
// Value multiplyers '* + ? {int,int} # !'

let breakPoints = /\s,\//

class CSSValdef {

// Ensures propper spacing between value combinators, value multiplyers, literals, and variables
  static format (stringDefinition = '') {
    return stringDefinition.replace(/(\|\||\||&&|\[|\]|,(?=[^{}]*(?:{|$))|\/|<[^>]*>)/g, ' $1 ')
      .replace(/\s*(\*|\+|\?|\{[^\}]*\}|\#|\!)/g, '$1 ').replace(/\s+/g, ' ').trim();
  }

// Checks propper spacing between value combinators, literals, and variables
// Throws an error if there is an error
  static validate (stringDefinition = '') {
    if(stringDefinition != CSSValdef.format (stringDefinition)){
      throw new Error(`Impropper CSS Value Definition syntax:\
        \n\tExpected: ${CSSValdef.format (stringDefinition)}\
        \n\tActual: ${stringDefinition}`
      );
    }
  }

  // Checks for valid variable names
  // Throws an error otherwise 
  static validateVariables (stringDefinition = '') {
    let badVariabledef = /(?:<(?:""|'')?>)|(?:<'[a-z\-]*[^a-z\->]+[^'>]*'>)|(?:<"[a-z\-]*[^a-z\->]+[^">]*">)|(?:<[a-z\-]*[^a-z\->]+[^>]*>)/g
    let badVariables = stringDefinition.match(badVariabledef);

    if(badVariables && badVariables.length){
      throw new Error (`Invalid Variables:\
        \n\t${badVariables.join (', ')}
        \n\tVariable names may only include lowercase letters and '-'`);
    }
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