# 0004 — Règles d'import : des contraintes vérifiées plutôt qu'un import intelligent

- **Statut** : acceptée
- **Date** : 13/11/2026

## Contexte

L'export CSV Revolut n'a pas d'identifiant de transaction. Un import « intelligent » devrait
reconnaître une transaction déjà importée (exports qui se chevauchent, passage à l'API),
s'adapter à la langue de l'export ou corriger l'encodage. Dans un outil de budget, chaque
supposition est une source d'erreur silencieuse.

## Options envisagées

| Option | Avantages | Inconvénients |
|---|---|---|
| Import intelligent (doublons repérés en comparant les champs, tolérance aux formats) | Accepte n'importe quel export. | Logique complexe ; erreurs silencieuses (deux cafés identiques le même jour). |
| **Import strict** (contraintes vérifiées, refus explicite) | Simple, prévisible, aucune erreur silencieuse. | Impose de la discipline au moment de l'export. |

## Décision

Un import strict. Si une règle n'est pas respectée, le fichier est refusé **en entier**, avec un
message clair :

1. **Mois civil complet.** Le mois est lu dans le nom donné par Revolut, et la période doit
   aller du 1er au dernier jour. La `Date de fin` de chaque ligne doit tomber dans ce mois.
2. **Mois terminé.** Seuls les états `TERMINÉ` et `RENVOYÉ` sont acceptés.
3. **Un mois ne s'importe qu'une fois.** L'option `--remplacer` efface le mois et le
   réimporte.
4. **En-têtes attendus**, identiques au caractère près.
5. **Euros uniquement** (#6).
6. **Tout ou rien** : aucune ligne n'est enregistrée si une seule échoue.

Les lignes `RENVOYÉ` (fonds non réclamés par le commerçant, rien n'a été débité) sont
ignorées. Elles sont comptées dans le bilan de l'import (« N lignes renvoyées ignorées »).

L'enchaînement des soldes n'est pas vérifié.

## Conséquences

- Aucune logique de doublons : l'unité d'import, c'est le mois.
- L'export vient de la version web de Revolut, n'est pas retouché et garde son nom d'origine.
- Le passage à l'API se fera mois par mois : un mois vient d'une seule source.
- Changer la langue de l'application Revolut bloque l'import, avec un refus explicite.
- `--remplacer` efface les corrections faites sur une seule transaction du mois. À revoir
  dans la milestone 2.
- Un export tronqué ne serait pas détecté, puisque les soldes ne sont pas vérifiés : c'est un
  risque accepté.
