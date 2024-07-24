import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import stylisticJsx from '@stylistic/eslint-plugin-jsx';

export default [
    { languageOptions: { globals: globals.nodeBuiltin } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
    stylisticJsx.configs['all-flat'],

    // ------------------       OVERLAPPING STYLE RULES       -----------------------
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        rules: {
            'arrow-parens':          [0, 'as-needed'],
            'array-bracket-newline': [1, { 'multiline': true }],
            'block-spacing':         [1, 'always'],
            'brace-style':           [1, 'stroustrup', { 'allowSingleLine': true }],
            'comma-dangle':          [
                0,
                'always',
                {
                    'arrays':    'always',
                    'objects':   'always',
                    'imports':   'always',
                    'exports':   'always',
                    'functions': 'always'
                }
            ],
            'comma-spacing':                  [1, { 'after': true }],
            'computed-property-spacing':      [1, 'never'],
            'eol-last':                       [1, 'always'],
            'func-call-spacing':              [1, 'never'],
            'function-call-argument-newline': [1, 'consistent'],
            'function-paren-newline':         [1, 'multiline'],
            'implicit-arrow-linebreak':       [0, 'beside'],
            'key-spacing':                    [1, { 'align': 'value', 'beforeColon': false }],
            'keyword-spacing':                [1, { 'before': true, 'after': true }],
            'lines-around-comment':           [1, { 'beforeBlockComment': true, 'beforeLineComment': true }],
            'new-parens':                     [1, 'always'],
            'newline-per-chained-call':       [1, { 'ignoreChainWithDepth': 3 }],
            'no-confusing-arrow':             [1, { 'allowParens': true, 'onlyOneSimpleParam': true }],
            'dot-location':                   [1, 'property'],
            'indent':                         [1, 4],
            'jsx-quotes':                     [1, 'prefer-double'],

            // ignores jsdocs
            'multiline-comment-style':  [0, 'separate-lines'],
            'multiline-ternary':        [1, 'always-multiline'],
            'no-extra-semi':            1,
            'no-floating-decimal':      1,
            'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
            'no-multi-spaces':          [
                1,
                {
                    'ignoreEOLComments': true,
                    'exceptions':        {
                        'Property':           true,
                        'VariableDeclarator': true,
                        'ImportDeclaration':  true,
                    }
                }
            ],
            'no-trailing-spaces':               [1, { 'ignoreComments': true }],
            'no-whitespace-before-property':    1,
            'nonblock-statement-body-position': [0, 'beside'],
            'object-curly-spacing':             [1, 'always'],
            'object-curly-newline':             [
                1, {
                    'multiline':     true,
                    'minProperties': 4,
                }
            ],
            'object-property-newline':         [1, { 'allowAllPropertiesOnSameLine': true }],
            'operator-linebreak':              [1, 'after', { 'overrides': {} }],
            'padded-blocks':                   [0, 'never'],
            'padding-line-between-statements': 0, // https://eslint.style/rules/js/padding-line-between-statements
            'quote-props':                     [
                1, 'as-needed', {
                    'numbers':     true,
                    'keywords':    true,
                    'unnecessary': false
                }
            ],
            'quotes':                             [1, 'single', { 'allowTemplateLiterals': true, 'avoidEscape': true }],
            'rest-spread-spacing':                [1, 'never'],
            'space-before-blocks':                1,
            'space-before-function-paren':        [0, 'always'],
            'space-in-parens':                    [1, 'never'],
            'space-infix-ops':                    1,
            'space-unary-ops':                    [1, { 'words': true, 'nonwords': false }],
            'spaced-comment':                     [1, 'always'],
            'switch-colon-spacing':               [1, { 'after': true, 'before': false }],
            'template-curly-spacing':             [0, 'never'],
            'wrap-iife':                          [1, 'any'],
            'wrap-regex':                         1,
            'yield-star-spacing':                 0,
            'semi':                               [1, 'always'],
            'semi-spacing':                       1,
            'semi-style':                         [0, 'last'],
            '@typescript-eslint/no-explicit-any': 0
        }
    },

    // ------------------       COMMONJS STYLE RULES       -----------------------
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        rules: {

            // Stylistic rules documentation: https://eslint.style/packages/js
            // 0 - off. 1 - warn. 2 - error
            // can use strings. ex: 'warn' 
            'no-extra-parens': [
                1, 'all', {
                    'nestedBinaryExpressions':          false,
                    'ternaryOperandBinaryExpressions':  false,
                    'enforceForArrowConditionals':      false,
                    'enforceForNewInMemberExpressions': false
                }
            ],
        }
    },

    // --------------------        REACT STYLE RULES       -------------------------
    {
        files:   ['**/*.{jsx,tsx}'],
        plugins: { '@stylistic/jsx': stylisticJsx },
        rules:   {

            // Stylistic rules documentation: https://eslint.style/packages/js

            // 0 - off. 1 - warn. 2 - error
            // can use strings. ex: 'warn' 

            'react/react-in-jsx-scope':                    0,
            '@stylistic/jsx/jsx-closing-bracket-location': [1, 'tag-aligned'],
            '@stylistic/jsx/jsx-closing-tag-location':     1,
            '@stylistic/jsx/jsx-curly-newline':            [1, 'consistent'],
            '@stylistic/jsx/jsx-curly-spacing':            [1, 'never'],
            '@stylistic/jsx/jsx-equals-spacing':           [1, 'never'],
            '@stylistic/jsx/jsx-first-prop-new-line':      [1, 'multiline-multiprop'],
            '@stylistic/jsx/jsx-function-call-newline':    [1, 'multiline'],
            '@stylistic/jsx/jsx-indent-props':             [
                1, {
                    'indent':                'first',
                    'ignoreTernaryOperator': true
                }
            ],
            '@stylistic/jsx/jsx-max-props-per-line': [
                1, {
                    'maximum': {
                        'single': 3,
                        'multi':  1
                    }
                }
            ],
            '@stylistic/jsx/jsx-newline':                 0,
            '@stylistic/jsx/jsx-one-expression-per-line': 0,
            '@stylistic/jsx/jsx-pascal-case':             [
                2,
                {
                    'allowAllCaps':           false,
                    'allowLeadingUnderscore': false,
                    'allowNamespace':         false,
                }
            ],
            '@stylistic/jsx/jsx-props-no-multi-spaces': 1,
            '@stylistic/jsx/jsx-self-closing-comp':     [1, { 'component': true }],
            '@stylistic/jsx/jsx-sort-props':            0,
            '@stylistic/jsx/jsx-tag-spacing':           [
                1, {
                    'closingSlash':      'never',
                    'beforeSelfClosing': 'always',
                    'afterOpening':      'never',
                    'beforeClosing':     'proportional-always'
                }
            ],
            '@stylistic/jsx/jsx-wrap-multilines': [
                1,
                {
                    'declaration':   'parens-new-line',
                    'assignment':    'parens-new-line',
                    'return':        'parens-new-line',
                    'arrow':         'parens-new-line',
                    'condition':     'ignore',
                    'logical':       'ignore',
                    'prop':          'ignore',
                    'propertyValue': 'ignore'
                }
            ],

            // "@stylistic/jsx/": [],
        }
    }
];
