# 0005 — GitHub Flow : `main` est la version utilisée

- **Statut** : acceptée. Elle remplace la [0003](0003-gitflow-conventional-commits.md).
- **Date** : 13/11/2026

## Contexte

`main` doit être la version que j'utilise réellement, avec mes vraies données, et je développe
à côté. Je suis le seul développeur et je traite une issue à la fois. La branche `develop` du
git flow (0003) ajoute une étape d'intégration qui n'apporte rien ici.

## Options envisagées

| Option | Avantages | Inconvénients |
|---|---|---|
| Git flow (0003) | Fonctionnalités regroupées en versions ; intégration séparée de la publication. | `develop` et `release/` inutiles pour un développeur seul ; issues fermées seulement à la version. |
| **GitHub Flow** | Simple ; tout ce qui est fusionné est utilisable ; `Closes #n°` ferme l'issue à la fusion. | Chaque fusion arrive directement dans la version utilisée : rien ne doit être fusionné à moitié fini. |

## Décision

GitHub Flow : la branche `main`, plus une branche courte par issue (`feature/<n°>-<sujet>`, ou
`fix/<n°>-<sujet>` pour une correction), qui revient dans `main` par une PR. Ni `develop`, ni
`release/`, ni `hotfix/`. Le format Conventional Commits ne change pas. À la fin d'une
milestone, on pose un tag `vX.Y.Z` sur `main`.

## Conséquences

- Une PR n'est fusionnée que si les tests et la vérification des types passent : `main` doit
  toujours être utilisable.
- L'issue se ferme quand sa PR est fusionnée dans `main`, donc au moment de la mise en service.
- Le développement et l'usage réel doivent utiliser des bases distinctes, à concevoir dans #2.
- Rien n'est commité directement sur `main`.
