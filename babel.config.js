module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@application': './src/application',
          '@data': './src/data',
          '@domain': './src/domain',
          '@infra': './src/infra',
          '@main': './src/main',
          '@presentation': './src/presentation'
        }
      }
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-transform-typescript-metadata'
  ],
  ignore: ['**/*.spec.ts']
}
