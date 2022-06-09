/**
 * firebase "cjs" 파일 확장자 추가가 expo에서 상호 호환이 안되는 문제.
 * @See https://github.com/firebase/firebase-js-sdk/issues/6253#issuecomment-1123747839
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
