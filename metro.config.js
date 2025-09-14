
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Web optimizations
config.resolver.platforms = ['web', 'native', 'ios', 'android'];

module.exports = config;
