module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      },
    }),
    require('@tailwindcss/jit'),
    require('autoprefixer'),
    process.env.NODE_ENV !== 'development' &&
      require('cssnano')({ preset: 'default' }),
  ],
};
