---
name: cadrer
description: Transformer un besoin en issue GitHub prête à concevoir (périmètre, critères de réussite, cas de test en français, découpage en tranches). À utiliser au démarrage d'une fonctionnalité ou d'une issue.
disable-model-invocation: true
argument-hint: "<besoin en quelques mots, ou numéro d'issue>"
---

# Cadrer un besoin

Besoin à cadrer : $ARGUMENTS

Cette skill produit une issue, pas de code ni de conception technique. Ici, la question est
« qu'est-ce qu'on veut ? », pas « comment on le fait ? ».

## 1. Lire le contexte

- [docs/fiche-fonctionnelle.md](../../../docs/fiche-fonctionnelle.md) ;
- [docs/glossaire.md](../../../docs/glossaire.md) : emploie ses termes ;
- les décisions de `docs/decisions/` qui touchent au sujet ;
- si un numéro d'issue est donné : `gh issue view <n°> --comments`.

## 2. Clarifier

Pose les questions nécessaires, cinq au maximum par message, la plus structurante d'abord.
N'écris pas l'issue tant que le besoin n'est pas clair.

Pendant la discussion :
- dès qu'un terme est flou ou contredit le glossaire, signale-le (« compte : le compte
  Revolut, ou un coffre ? ») ;
- quand une question concerne la conception plutôt que le besoin, note-la pour `/challenger`
  et n'y réponds pas maintenant.

## 3. Proposer l'issue

Présente le brouillon de l'issue avec ce format :

```markdown
## Besoin
Pourquoi, en une ou deux phrases.

## Périmètre
- Inclus : …
- Hors périmètre : …

## Critères de réussite
- [ ] Vérifiable, observable (« la commande X affiche… »).

## Cas de test
1. Étant donné …, quand …, alors ….
2. …

## Questions de conception (pour /challenger)
- …

## Dépend de
#n° (ou rien)
```

À propos des cas de test :
- c'est l'utilisateur qui les décide ;
- de ton côté, propose les cas limites auxquels il n'a pas pensé, en lien avec le domaine :
  fichier vide, ligne mal formée, montant nul, devise étrangère, transaction en attente,
  remboursement, exports qui se chevauchent… ;
- marque ces ajouts pour qu'il les valide ou les retire.

## 4. Découper si c'est trop gros

Si l'issue ne tient pas dans un cycle court (quelques fonctions, testables de bout en bout) :
- découpe-la en **tranches verticales**, chacune vérifiable seule ;
- présente la liste numérotée : titre, ce que la tranche apporte, de quoi elle dépend ;
- demande si la granularité convient, puis itère.

## 5. Vérifier avant de publier

- Le dépôt est public : l'issue ne contient **aucune vraie donnée** (montant, commerçant, nom,
  IBAN). Les exemples sont inventés.
- Attends la validation explicite de l'utilisateur.
- Crée ensuite l'issue avec `gh issue create`, dans la milestone voulue si l'utilisateur en
  donne une, sans label.
- Donne le lien de l'issue créée.
