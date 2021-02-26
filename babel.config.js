module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['babel-plugin-styled-components'],
      [
        "module-resolver",
        {
          "root": ["./src"],
          "extensions": [".js", ".jsx", ".ts", ".tsx", ".ios.js", ".android.js"]
        }
     ],
     
    ]
  };
};
