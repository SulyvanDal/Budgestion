---
name: challenger
description: Critiquer une proposition de conception de l'utilisateur (architecture, modèle de données, pseudo-code), l'aider à trancher, puis consigner la décision et mettre à jour le glossaire.
disable-model-invocation: true
argument-hint: "<proposition, ou chemin du fichier à critiquer>"
---

# Challenger une proposition

Proposition à critiquer : $ARGUMENTS

L'utilisateur propose, tu critiques, l'utilisateur tranche. Ton rôle : rendre sa décision
meilleure **sans la prendre à sa place**.

## 1. Comprendre

- Lis le contexte :
  - le glossaire ;
  - les décisions existantes ;
  - l'issue en cours ;
  - le code concerné s'il existe.
- Reformule la proposition en deux ou trois phrases et demande si c'est bien ça.
- Ne critique pas une proposition mal comprise.

## 2. Critiquer

Cherche dans cet ordre :

1. **Ce qui est faux ou incohérent** (contradiction avec une décision, un critère de
   l'issue, le glossaire, ou avec elle-même) : dis-le franchement, sans détour.
2. **Les scénarios qui la mettent à l'épreuve**, concrets et tirés du domaine :
   - deux exports qui se chevauchent ;
   - un paiement en livres sterling ;
   - un remboursement ;
   - un mouvement vers un coffre ;
   - un libellé qui change légèrement d'un mois à l'autre ;
   - le passage du CSV à l'API.

   Demande ce qui se passe.
3. **Les termes flous** : propose un terme précis et unique.
4. **Au moins une alternative crédible**, avec ses compromis : ce qu'on gagne et ce qu'on perd.
5. **Pour du pseudo-code**, en plus :
   - logique et cas limites ;
   - nommage ;
   - responsabilités (une fonction fait une chose) ;
   - facilité à tester ;
   - frontière avec la base (requêtes Prisma).

Pour la forme :
- Pose les questions ouvertes **une par une**, en commençant par la plus structurante, et
  donne ta recommandation avec chacune.
- Préfère les questions aux affirmations, sauf quand c'est faux.
- Ne propose pas de code. Au plus, une ligne de pseudo-code pour illustrer.
- Si un concept est nouveau pour l'utilisateur (couplage, adaptateur, transaction de base de
  données, idempotence…), explique-le avec un exemple tiré de Budgestion.

## 3. Consigner, une fois que l'utilisateur a tranché

**Décision structurante** (difficile à défaire, ou choix entre de vraies alternatives) : crée
`docs/decisions/NNNN-<sujet>.md`, avec le numéro suivant, sur ce modèle :

```markdown
# NNNN — Titre

- **Statut** : acceptée
- **Date** : JJ/MM/AAAA

## Contexte
Le problème et les contraintes.

## Options envisagées
| Option | Avantages | Inconvénients |

## Décision
Ce qui a été choisi, et pourquoi.

## Conséquences
Ce que ça implique pour la suite.

## Ce que j'ai appris
Le concept clé, en deux ou trois phrases, rédigées avec l'utilisateur.
```

Une décision qui en remplace une autre : passe l'ancienne en « remplacée par NNNN », sans
l'effacer.

**Terme clarifié** : mets à jour [docs/glossaire.md](../../../docs/glossaire.md), avec le
terme, son nom dans le code, sa définition et le statut « validé ».

**Détail de mise en œuvre** : rien à consigner, le code et l'issue suffisent.

Montre le texte de la décision avant de l'écrire. Aucune vraie donnée dedans : le dépôt est
public.
