const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
// Keep static exports within the memory budget of the hosted build worker.
config.maxWorkers = 1

module.exports = withNativeWind(config, { input: './global.css' })
