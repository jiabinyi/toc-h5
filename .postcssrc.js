module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      unitPrecision: 3, //保留rem小数点多少位
      replace: true,
      mediaQuery: false,
      propList: ['*'],
    },
  }
}
