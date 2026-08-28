import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import vue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "**/*.tsbuildinfo",
      "apps/vue/public/mockServiceWorker.js",
      "apps/vue/typed-router.d.ts",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs["flat/recommended"],

  {
    files: ["apps/vue/**/*.{ts,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        definePage: "readonly",
      },
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  {
    files: ["**/*.config.{js,mjs,ts}", "eslint.config.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    rules: {
      "no-console": "error",
      "vue/require-default-prop": "off",
    },
  },

  {
    files: ["apps/vue/src/shared/components/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },

  // Всегда последним
  prettier,
);
