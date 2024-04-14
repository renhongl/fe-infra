

module.exports = {
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    extends: ['eslint:recommended'],
    rules: {
        "no-var": "error",
    }
};
