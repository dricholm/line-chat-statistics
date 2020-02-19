module.exports = {
  hooks: {
    'pre-commit': 'lint-staged && ng lint',
  },
};
