# 0006 — Organisation du dépôt : workspaces npm et rangement par fonctionnalité

- **Statut** : acceptée
- **Date** : 13/11/2026

## Contexte

Le projet aura un back-end dès la milestone 1 et un front React à la milestone 3. Le point de
départ est Trek : deux dossiers indépendants, `back-end/` et `front-end/`, et un back-end
découpé en couches techniques. Mais Budgestion a un point d'entrée qui n'est pas HTTP (la
commande d'import), et sa logique doit pouvoir être testée en TDD sans base de données.

## Options envisagées

**Lien entre les dossiers**

| Option | Avantages | Inconvénients |
|---|---|---|
| Dossiers indépendants (Trek) | Déjà connus. | Trois installations, aucune commande globale, types recopiés entre front et back. |
| **Workspaces npm** | Une seule installation, des commandes globales, une configuration partagée, des types partageables. | Un concept de plus à apprendre. |
| Un seul paquet | Le plus simple aujourd'hui. | Frontière entre front et back implicite ; restructuration à la milestone 3. |

**Rangement du back-end**

| Option | Avantages | Inconvénients |
|---|---|---|
| Par couche (Trek, *package by layer*) | Déjà connu ; standard des API REST. | Une fonctionnalité éparpillée ; pensé pour HTTP ; logique et Prisma mélangés. |
| **Par fonctionnalité** (*package by feature*) | Une fonctionnalité dans un dossier ; logique pure testable ; points d'entrée minces. | La séparation entre logique pure et entrées-sorties repose sur la discipline. |
| Hexagonale (*ports & adapters*) | Séparation imposée par la structure. | Lourd ; deux concepts de plus ; une fonctionnalité éparpillée. |

**Emplacement des tests**

| Option | Avantages | Inconvénients |
|---|---|---|
| **À côté du code** | La norme en TypeScript ; un test suit son module quand on le déplace. | `src/` mélange code et tests (réglé par la configuration). |
| Dossier `tests/` | `src/` ne contient que le code. | Deux arborescences parallèles, des imports longs. |

## Décision

1. **Workspaces npm.** La racine porte la configuration partagée et les commandes globales.
   `back-end/` est créé maintenant, `front-end/` le sera à la milestone 3.
2. **Back-end rangé par fonctionnalité.** Un dossier par fonctionnalité (`import/`,
   `categorization/`, `budget/`…), les points d'entrée à part (`cli/`, puis `http/`), et le
   client Prisma partagé dans `db/`.
3. **Quatre couches dans chaque fonctionnalité** (*functional core, imperative shell*),
   reconnaissables à leur suffixe (`<sujet>.<rôle>.ts`) :

   | Couche | Rôle | Suffixe |
   |---|---|---|
   | ① Point d'entrée | Recevoir la demande, présenter le résultat | `.command.ts`, `.route.ts` |
   | ② Orchestration (*use case*) | Enchaîner les étapes | `.usecase.ts` |
   | ③ Logique pure | Règles, calculs, conversion d'une source | `.rules.ts`, `.adapter.ts` |
   | ④ Accès aux données (*repository*) | Requêtes Prisma, lecture de fichiers | `.repository.ts` |

4. **Les règles :**
   - les appels vont dans un seul sens : ① appelle ②, qui appelle ③ et ④. La logique pure
     n'appelle rien et ne fait aucune entrée-sortie ;
   - une fonctionnalité renvoie un **résultat structuré**. Seul le point d'entrée affiche le
     résultat et choisit le code de sortie ou la réponse HTTP ;
   - aucune dépendance circulaire entre fonctionnalités ;
   - une requête utile à plusieurs fonctionnalités n'est mise en commun que le jour où le
     besoin apparaît.
5. **Les tests sont à côté du code** (`<fichier>.test.ts`). Les données fabriquées vont dans
   `fixtures/`, à côté des tests qui les utilisent.

## Conséquences

- Un seul `npm install` et un seul `package-lock.json`, à la racine. `npm test`, `typecheck`,
  `lint` et `format:check` vérifient tout le projet.
- Le rôle d'un fichier se lit dans son nom. Un `.rules.ts` qui importe un `.repository.ts` est
  une erreur de couche.
- À la milestone 1, l'import passe par une commande. L'import par l'interface (milestone 3),
  puis par l'API Revolut, ajoutera un point d'entrée et un adaptateur sans modifier la logique
  d'import.
- Pas de serveur local avant l'interface (milestone 3).
- L'emplacement des types partagés entre fonctionnalités (`Transaction`…) reste à décider dans
  #3.
