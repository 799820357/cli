module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        //空行不能够超过2行
        "no-multiple-empty-lines": [1, { "max": 2 }],
        //变量未引用的警告
        "no-unused-vars": [1],
        //prop-types
        "react/prop-types": [0],
        "react/display-name": [0]
    }
};
