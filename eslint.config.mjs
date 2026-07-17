import nestjsEslintConfig from '@nestjs/eslint-config';

export default [
  ...nestjsEslintConfig,
  {
    rules: {
      // Apaga por completo el linter de Prettier (chau líneas en los imports y saltos de línea)
      'prettier/prettier': 'off',

      // Apaga la alerta de cosas declaradas o importadas que todavía no usaste
      '@typescript-eslint/no-unused-vars': 'off',

      // Desactiva alertas sobre espacios, tabulaciones y formateo interno mientras tipeás
      'indent': 'off',
      'no-trailing-spaces': 'off',
    },
  },
];