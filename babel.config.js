module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["babel-plugin-styled-components", {
        "name": "typescript-styled-plugin",
        "lint": {
          "validProperties": [
            "shadow-color",
            "shadow-opacity",
            "shadow-offset",
            "shadow-radius",
            "padding-horizontal",
            "padding-vertical",
            "margin-vertical",
            "margin-horizontal",
            "tint-color",
            "aspect-ratio",
            "elevation"
          ]
        }
      }],
      [
        "module-resolver",
        {
          "root": ["./src"],
          "extensions": [".js", ".jsx", ".ts", ".tsx", ".ios.js", ".android.js"]
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
