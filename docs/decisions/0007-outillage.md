# 0007 — Outillage : Node 26, Vitest, ESLint, Prettier et intégration continue

- **Statut** : acceptée
- **Date** : 13/11/2026

## Contexte

Le socle (#2) doit permettre le TDD et vérifier automatiquement la qualité de chaque PR, avant
que le code n'arrive dans `main`, la version utilisée ([décision 0005](0005-github-flow.md)).

## Options envisagées

| Sujet | Choix | Alternatives écartées |
|---|---|---|
| Tests | **Vitest** | `node:test` (vérifications moins lisibles, peu adapté au front) ; Jest (TypeScript et ESM pénibles à configurer) |
| Exécution du TypeScript | **Node directement** | `tsx` (une dépendance devenue inutile) ; compilation (une étape de plus) |
| Rigueur de TypeScript | **`strict`** | `strict` renforcé (`noUncheckedIndexedAccess`…) ; maximal |
| Lint | **ESLint, règles recommandées avec vérification des types** | Recommandé simple (ne voit pas les `await` oubliés) |
| Formatage | **Prettier** | Biome (son intérêt est de remplacer ESLint, au prix d'une vérification des types moins complète) ; dprint ; ESLint Stylistic |
| Intégration continue | **Un seul enchaînement d'étapes** | Tâches en parallèle (plus de configuration) |

## Décision

- **Node 26** (LTS), version fixée dans `.nvmrc`. Modules **ESM**.
- **TypeScript exécuté directement par Node**, sans compilation ni `tsx`. On n'utilise que la
  syntaxe effaçable (pas d'`enum`, option `erasableSyntaxOnly`) et les imports nomment le
  fichier avec son extension `.ts`. Les types sont vérifiés à part, par `tsc`
  (`npm run typecheck`).
- TypeScript en **`strict`**.
- **Vitest** pour les tests.
- **ESLint** : règles recommandées de `@eslint/js` et de `typescript-eslint`, avec vérification
  des types. **Règle des couches** : un `.rules.ts` ou un `.adapter.ts` ne peut importer ni un
  `.repository.ts`, ni Prisma (ni `db/`), ni les modules de Node qui font des entrées-sorties
  (fichiers, réseau, processus, terminal, SQLite). Les modules de calcul pur (`path`,
  `crypto`…) restent permis.
- **Prettier**, avec la configuration de Trek : points-virgules, guillemets doubles, virgule
  finale partout.
- **Intégration continue** (GitHub Actions), à chaque PR vers `main` et à chaque arrivée de code
  sur `main` : `npm ci`, `format:check`, `lint`, `typecheck`, `test`, avec la version de Node
  lue dans `.nvmrc`.
- **Protection de `main`** : PR obligatoire, intégration continue au vert obligatoire, aucune
  relecture exigée, et la règle s'applique aussi à l'administrateur.

## Conséquences

- Rien n'arrive dans `main` sans PR, ni sans les quatre vérifications au vert.
- TypeScript ne signale pas les colonnes manquantes d'une ligne CSV : l'adaptateur (#4) vérifie
  explicitement le nombre de colonnes.
- Une erreur de couche ([décision 0006](0006-organisation-du-depot.md)) fait échouer le lint.
  Limite : la règle ne voit que les `import`. Les entrées-sorties par variable globale
  (`fetch`, `process`, `console`) ne sont pas contrôlées ; à revoir plus tard, au plus tard
  avec l'adaptateur de l'API Revolut.
- L'intégration continue n'utilise que des données fabriquées, sans secret ni appel payant.
- Le front (milestone 3) réutilisera Vitest, ESLint et Prettier depuis la racine.
- Dépendances de développement ajoutées : `typescript`, `@types/node`, `vitest`, `eslint`,
  `@eslint/js`, `typescript-eslint`, `prettier`.
- **TypeScript reste en 6.0** (`~6.0`), et non en 7, tant que `typescript-eslint` n'accepte
  pas la version 7 (au 13/11/2026, il accepte `>=4.8.4 <6.1.0`). `@types/node` suit la version
  de Node (26).
- Prettier ignore le Markdown (`*.md`), dont la mise en forme reste manuelle, et
  `package-lock.json`, généré par npm.
