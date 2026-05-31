module.exports = {
  extends: ['stylelint-config-sass-guidelines'],
  plugins: ['stylelint-scss'],
  rules: {
    'max-nesting-depth': 8,
    'selector-max-compound-selectors': 5,
    'selector-no-qualifying-type': null,
    'property-no-vendor-prefix': null,
    'selector-no-vendor-prefix': null,
    'scss/dollar-variable-pattern': null,
    'selector-max-id': null,
    'scss/at-extend-no-missing-placeholder': null,
    'scss/selector-no-redundant-nesting-selector': null,
    'scss/no-global-function-names': null,
    'declaration-property-value-disallowed-list': null,
    'selector-class-pattern': null,
    'block-no-empty': null,
    'function-url-quotes': null,
    'length-zero-no-unit': null,
    '@stylistic/string-quotes': null,
    '@stylistic/block-opening-brace-space-before': null,
    'color-named': null
  }
}
