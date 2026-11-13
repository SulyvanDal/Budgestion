# 0003 — Git flow et Conventional Commits

- **Statut** : remplacée par la [0005](0005-github-flow.md) (le format Conventional Commits est conservé)
- **Date** : 12/11/2026

## Contexte

Le projet sert aussi à apprendre à travailler proprement, comme dans une équipe.

## Options envisagées

| Option | Avantages | Inconvénients |
|---|---|---|
| **Git flow** | Sépare l'intégration (`develop`) des versions publiées (`main`) ; fait pratiquer les versions et les correctifs urgents. | Plus de branches et de fusions qu'il n'en faut à un développeur seul. |
| GitHub Flow | Simple : `main` plus des branches courtes. | Pas de notion de version publiée. |

## Décision

Git flow, et des commits au format Conventional Commits rédigés en français.

## Conséquences

- Chaque issue a sa branche `feature/<n°>-<sujet>`, qui part de `develop` et y revient par une
  PR.
- Une version se prépare dans `release/X.Y.Z`, fusionne dans `main` et dans `develop`, et
  reçoit le tag `vX.Y.Z`.
- Un correctif urgent se fait dans `hotfix/X.Y.Z`, qui part de `main`.
- Rien n'est commité directement sur `main` ni sur `develop`.

