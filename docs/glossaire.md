# Glossaire

Le vocabulaire du domaine et son nom dans le code. On utilise un seul terme par concept, partout :
dans les échanges, les issues, le code et les tests.

> Définitions provisoires : chaque terme sera validé en conception.

| Terme | Dans le code | Définition | Statut |
|---|---|---|---|
| Compte | `Account` | Un compte bancaire (ou un coffre ?) dont on suit les mouvements. | à valider |
| Transaction | `Transaction` | Un mouvement d'argent sur un compte, quelle que soit sa source. | à valider |
| Source | `Source` | La provenance d'une transaction : CSV Revolut, API, saisie à la main. | à valider |
| Adaptateur | `*.adapter.ts` | Le code (logique pure) qui convertit les données d'une source vers le format commun ([décision 0006](decisions/0006-organisation-du-depot.md)). | validé |
| Catégorie | `Category` | Le poste de budget auquel une transaction est rattachée. | à valider |
| Règle | `CategoryRule` | « Si la transaction ressemble à X, alors la catégorie est Y ». | à valider |
| Prévisionnel | `Forecast` | Le budget prévu pour un mois, à comparer au réel. | à valider |
