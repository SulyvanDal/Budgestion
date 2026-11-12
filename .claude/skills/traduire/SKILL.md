---
name: traduire
description: Réaliser une issue en TDD à partir de la conception de l'utilisateur. D'abord les tests à partir de ses cas, puis la traduction fidèle de son pseudo-code en TypeScript, la vérification, et des questions de compréhension.
disable-model-invocation: true
argument-hint: "<fichier ou fonction à traduire>"
---

# Traduire le pseudo-code

Cible : $ARGUMENTS

## 0. Prérequis

Vérifie que :
- l'issue a des cas de test validés ;
- le fichier contient les signatures et le pseudo-code de l'utilisateur ;
- le pseudo-code a été critiqué.

S'il manque quelque chose, arrête-toi et propose `/cadrer` ou `/challenger`.

Si le pseudo-code doit accéder à la base mais que la requête Prisma n'est pas écrite :
**demande-la à l'utilisateur**. Tu n'écris pas les requêtes Prisma.

## 1. Tests (rouge)

1. Annonce **où** tu vas tester : la fonction ou le module public. Dis en une ligne ce que ce
   choix détecte et ce qu'il ne détecte pas, puis attends l'accord de l'utilisateur.
2. Écris un test par cas validé dans l'issue, en reprenant la formulation du cas comme nom du
   test.
3. Règles des tests :
   - tester le **comportement**, par l'interface publique, jamais le fonctionnement interne ;
   - les valeurs attendues sont écrites en dur, à partir de l'énoncé du cas, et **jamais
     recalculées** comme le code les calcule (sinon le test passe toujours et ne prouve rien) ;
   - les données sont fabriquées, jamais réelles ;
   - pas de simulation d'objets (mock) sauf si c'est inévitable, et alors explique pourquoi.
4. Montre les tests à l'utilisateur pour relecture.
5. Lance-les et vérifie qu'ils échouent **pour la bonne raison** (fonction absente ou résultat
   faux, pas une faute de frappe).

## 2. Traduction

- Reste **fidèle** au pseudo-code. Garde la structure et les noms choisis par l'utilisateur,
  avec les correspondances du glossaire.
- Si tu repères un bug, un cas oublié ou une meilleure approche : **arrête-toi, explique, et
  demande**. Ne corrige jamais sans le signaler.
- N'ajoute ni fonctionnalité, ni optimisation, ni gestion d'erreur au-delà de ce que décrivent
  le pseudo-code et les tests.
- Supprime les commentaires de pseudo-code. Ne garde un commentaire que s'il explique un
  *pourquoi* qui ne se voit pas dans le code.

## 3. Vérification (vert)

- Lance les tests et la vérification des types.
- Rapporte le résultat tel quel, y compris les échecs, avec leur sortie.
- Ne déclare pas l'étape finie tant que tout n'est pas vert.

## 4. Explication

Liste les **concepts nouveaux** apparus dans le code (syntaxe TypeScript, API Node, Prisma,
manière d'écrire le test…) et explique chacun en deux ou trois phrases, en citant la ligne
concernée.

## 5. Compréhension

- Pose **deux ou trois questions** sur ce code précis, par exemple :
  - « Que se passe-t-il si le fichier est vide ? »
  - « Pourquoi ce `await` ici ? »
  - « Quel test casse si on inverse ces deux lignes ? »
- Ne donne pas les réponses dans le même message. Attends celles de l'utilisateur, puis
  corrige-le directement s'il se trompe.

## 6. Clôture

- Propose un message de commit au format Conventional Commits, en français, avec `Refs #n°`
  ou `Closes #n°`.
- Ne commite pas : attends que l'utilisateur le demande.
