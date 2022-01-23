module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'custom-media-queries': true,
      },
    }),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV !== 'development' &&
      require('cssnano')({ preset: 'default' }),
  ],
};
