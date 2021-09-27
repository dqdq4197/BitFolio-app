module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./src"],
          "extensions": [".js", ".jsx", ".ts", ".tsx", ".ios.js", ".android.js", "svg"]
        }
      ],
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "safe": true,
        "allowUndefined": true,
        "verbose": false
      }],
      "babel-plugin-styled-components",
      'react-native-reanimated/plugin',
    ]
  };
};
