# Fiche fonctionnelle

> Brouillon : à compléter au fil du cadrage.

## Besoin

Suivre mon budget par catégorie, le plus automatiquement possible, sans tableur.

## Utilisateur et usage

- Un seul utilisateur.
- Consultation depuis le Mac uniquement.
- Mise à jour lancée à la main, environ une fois par mois.

## Sources de données

1. **Étape 1** : import d'un export CSV Revolut.
2. **Étape 2** (plus tard) : API Revolut, sans doute par un agrégateur d'open banking. On
   étudiera les contraintes à ce moment-là.
3. **Saisie à la main** pour d'autres comptes ou banques.

D'autres comptes pourront être ajoutés plus tard.

## Catégorisation

1. Des règles déterministes (par exemple, un libellé donné donne toujours une catégorie donnée).
2. Si aucune règle ne s'applique : Claude cherche, recherche web comprise, et propose une
   catégorie.
3. Je valide ou je corrige sa proposition, et ma décision devient une règle pour les fois
   suivantes.

Mon fichier de suivi de budget existant pourra servir à créer les premières règles et à
évaluer la catégorisation. Il restera hors de git (`prive/`), et on décidera le moment venu
s'il est utile.

## Restitution

- Le budget du mois par catégorie.
- Plus tard : la comparaison avec un mois prévisionnel.
- Plus tard : des analyses, à définir.

## Questions ouvertes (à trancher en conception)

- **Doublons** : l'export CSV Revolut n'aurait pas d'identifiant unique par transaction (à
  vérifier sur un vrai export). Comment éviter les doublons quand deux exports se chevauchent,
  ou au passage du CSV à l'API ?
- **Montants** : en centimes entiers, ou dans un autre type ? Les nombres à virgule sont à
  exclure.
- **Devises** : Revolut est multi-devises. Quel montant retenir pour un paiement en devise
  étrangère ?
- **Statut** : que fait-on des transactions en attente et des transactions annulées ?
- **Virements internes** : les mouvements vers un coffre Revolut ou entre mes comptes ne sont
  pas des dépenses. Comment les reconnaître ?
- **Remboursements** : faut-il les compter en négatif dans la catégorie d'origine ?
