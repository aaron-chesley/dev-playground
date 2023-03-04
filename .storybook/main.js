process.env.NODE_ENV = 'development';

const path = require('path');

module.exports = {
  stories: ['../**/*.stories.@(js|mdx)'],

  staticDirs: [
    path.resolve(__dirname, '../libs/cardly/cardly-ui/src/lib/shared/assets'),
  ],
  // uncomment the property below if you want to apply some webpack config globally
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
};
