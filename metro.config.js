/**
 * firebase 9.7.x 이상 버전의 경우 호환이 안되는 이슈.
 * @see https://docs.expo.dev/guides/using-firebase/#configure-metro
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('@expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)
defaultConfig.resolver.assetExts.push('cjs')

module.exports = defaultConfig
