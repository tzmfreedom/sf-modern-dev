const path = require('path')

let rules = [];
if (process.env.NODE_ENV !== 'production') {
  rules = {
    test: /\.vue$/,
    loader: 'string-replace-loader',
    options: {
      search: '\\{!URLFOR\\(\\$Asset\\.SLDS, \'(.*)\'\\)\\}',
      replace: (match, p1, offset, string) => {
        return `~@salesforce-ux/design-system/${p1}`
      },
      flags: 'g',
    }
  }
}
module.exports = {
  filenameHashing: false,
  outputDir: '../force-app/main/default/staticresources/resource1',
  configureWebpack: {
    module: {
      rules,
    }
  }
}
