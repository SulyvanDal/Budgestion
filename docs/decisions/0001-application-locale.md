# 0001 — Application web locale

- **Statut** : acceptée
- **Date** : 12/11/2026

## Contexte

L'application manipule des données financières personnelles. Je la consulte uniquement depuis
mon Mac et je lance la mise à jour à la main une fois par mois.

## Options envisagées

| Option | Avantages | Inconvénients |
|---|---|---|
| **Locale** (serveur sur `127.0.0.1`) | Les données ne quittent pas le Mac (FileVault activé) ; pas de connexion à gérer ; pas d'hébergement. | Inaccessible depuis le téléphone ; aucune synchronisation quand le Mac est éteint. |
| **En ligne** | Accessible partout ; synchronisation permanente possible. | Connexion, HTTPS et sauvegardes à gérer ; données financières chez un hébergeur. |

## Décision

Une application locale, conçue pour pouvoir être mise en ligne plus tard sans réécriture (le
code métier ne dépend pas de l'endroit où il tourne).

## Conséquences

- Pas de connexion à développer, et le serveur n'écoute que sur `127.0.0.1`.
- Ports réservés à Budgestion : **4400** pour le serveur, **4401** pour le front en
  développement. Ils évitent les ports déjà pris sur le Mac : 4321 (suivi-candidature), 3000 et
  5173 (Trek Gear App), 5000 et 7000 (AirPlay de macOS). Le port reste modifiable par une
  variable d'environnement.
- Docker n'est pas nécessaire pour l'instant.
- L'API Revolut, plus tard, demandera de renouveler un accord dans le navigateur tous les
  quelques mois : c'est compatible avec une application locale.

## Ce que j'ai appris

À compléter.
