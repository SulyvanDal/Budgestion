# 0002 — SQLite avec Prisma

- **Statut** : acceptée
- **Date** : 12/11/2026

## Contexte

Il faut stocker les transactions, les catégories et les règles. Je connais Prisma (Trek Gear
App) et un peu de SQL.

## Options envisagées

| Option | Avantages | Inconvénients |
|---|---|---|
| **Prisma** | Déjà connu ; schéma lisible ; migrations gérées ; requêtes typées. | Le SQL généré est caché, ce qui fait moins pratiquer le SQL. |
| SQL écrit à la main | On voit exactement ce qui part vers la base. | Faire du SQL pour faire du SQL : ce n'est pas l'objectif. |

## Décision

Prisma avec SQLite. J'écris moi-même le schéma et les requêtes Prisma. Le SQL brut
(`$queryRaw`) reste possible là où il est vraiment utile, par exemple pour les analyses.

## Conséquences

- La base est un seul fichier, dans `data/` (exclu de git).
- Les migrations passent par `prisma migrate`, et toujours avec mon accord.

## Ce que j'ai appris

À compléter.
