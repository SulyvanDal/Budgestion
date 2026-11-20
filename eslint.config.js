import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

// Modules de Node qui font des entrées-sorties (fichiers, réseau, processus,
// terminal, SQLite). Les modules de calcul pur (path, crypto…) restent permis.
const nodeIoModules = [
  "fs",
  "fs/promises",
  "child_process",
  "net",
  "tls",
  "dgram",
  "dns",
  "dns/promises",
  "http",
  "https",
  "http2",
  "readline",
  "readline/promises",
  "sqlite",
  "process",
];

export default defineConfig(
  globalIgnores(["eslint.config.js"]),

  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Règle des couches (décisions 0006 et 0007) : la logique pure ne fait
  // aucune entrée-sortie.
  {
    files: ["**/*.rules.ts", "**/*.adapter.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: nodeIoModules
            .flatMap((name) => [name, `node:${name}`])
            .map((name) => ({
              name,
              message:
                "Couches : la logique pure ne fait aucune entrée-sortie. Lecture de fichiers dans un .repository.ts, affichage dans le point d'entrée (décision 0006).",
            })),
          patterns: [
            {
              group: ["**/*.repository.ts"],
              message:
                "Couches : la logique pure n'appelle pas l'accès aux données. C'est le use case qui appelle le repository (décision 0006).",
            },
            {
              group: ["@prisma/*", "**/db/**"],
              message:
                "Couches : la logique pure ne touche pas à la base. Les requêtes Prisma vont dans un .repository.ts (décision 0006).",
            },
          ],
        },
      ],
    },
  },
);
