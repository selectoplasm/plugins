/**
 * Creates a ruleset object from a selector and array of property-value tuples
 * @param {string} selector - CSS selector string
 * @param {Array<[string, string]>} declarationTuples - Array of property-value tuple pairs
 * @returns {{selector: string, declarations: Array<{property: string, value: string}>}} Ruleset object
 */
function createRuleset(selector, declarationTuples) {
   const declarations = declarationTuples.map(([property, value]) => ({ property, value }))
   return { selector, declarations }
}
