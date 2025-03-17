/**
 * Creates a design token object with a property and value
 * @param {string} property - CSS property name
 * @param {string} value - CSS property value
 * @returns {DesignToken} Design token object
 */
function createDesignToken(property, value) {
   return {
      property: "--" + property,
      value
   }
}

/**
 * Creates a CSS utility class object with a single property
 * @param {string} selector - CSS selector (e.g., '.class-name')
 * @param {string} property - CSS property name
 * @param {string} value - CSS property value
 * @returns {UtilityClassObject} CSS utility class object
 */
function createUtilityClass(selector, declarations) {
   return {
      selector,
      declarations
   }
}

/**
 * Creates a CSS pattern class object with multiple declarations
 * @param {string} selector - CSS selector (e.g., '.pattern-class')
 * @param {Array<[string, string]>} declarations - Array of [property, value] tuples
 * @returns {{selector: string, declarations: Array<{property: string, value: string}>}} Pattern class object with selector and array of declaration objects
 */
function addPatternClass(selector, declarations) {
   const declarationObjects = declarations.map(([property, value]) => ({ property, value }))
   // const declarationString = '{' + declarations.join(",") + '}'
   return { selector, declarations: declarationObjects }
}
