module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/prefer-stateless-function": 0,
        "react/jsx-filename-extension": 0,
        "react/forbid-prop-types": 0,
        "guard-for-in": 0,
        "no-restricted-syntax": 0,
        "react/button-has-type": 0
      },
      "env" : {"es6" : true, "jest":true, "browser": true},
      "parser": "babel-eslint"
};