module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.ios.js',
            '.android.js',
            'svg',
          ],
        },
      ],
      'babel-plugin-styled-components',
      'react-native-reanimated/plugin',
    ],
  }
}
