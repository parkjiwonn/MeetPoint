import tseslint from "typescript-eslint";
import turboPlugin from "eslint-plugin-turbo";

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    ignores: ["node_modules/**", "dist/**"],
  },
);
