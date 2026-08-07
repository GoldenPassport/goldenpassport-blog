// eslint-config-next 16 ships native flat-config presets (Linter.Config[]),
// so they can be spread directly. The legacy FlatCompat/.eslintrc bridge is no
// longer needed (and breaks on the new plugin objects).
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "storybook-static/**",
      "coverage/**",
      "next-env.d.ts",
    ],
  },
  {
    // eslint-config-next 16 enables the new React Compiler hook rules as
    // errors. They fire on correct, idiomatic patterns here (reading
    // localStorage on mount via an effect; a cumulative-offset accumulator in
    // DownloadsChart), so keep them visible as warnings rather than failing
    // the build. Reworking these to satisfy the compiler is tracked separately.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
    },
  },
];

export default eslintConfig;
