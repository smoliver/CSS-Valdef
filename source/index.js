// Literals: ',' '/'
// 

let breakPoints = /\s,\//

class CSSValdef {

// Ensures propper spacing between value combinators, literals, and variables
// Value combinators' <.+> [ ] , / | || '

  static format (stringDefinition = '') {
    return stringDefinition.replace(/(\|\||\||&&|\[|\]|,|\/|<[^>]*>)/g, ' $1 ').replace(/\s+/g, ' ').trim();
  }
// Checks propper spacing between value combinators, literals, and variables
// Checks for valid variable syntax
// Throws an error in that order if not true
  static validate (stringDefinition = '') {
    if(stringDefinition != CSSValdef.format (stringDefinition)){
      throw new Error(`Impropper CSS Value Definition syntax:\
        \n\tExpected: ${CSSValdef.format (stringDefinition)}\
        \n\tActual: ${stringDefinition}`);
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