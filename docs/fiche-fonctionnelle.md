# Fiche fonctionnelle

> Brouillon : à compléter au fil du cadrage.

## Besoin

Suivre mon budget par catégorie, le plus automatiquement possible, sans tableur.

## Utilisateur et usage

- Un seul utilisateur.
- Consultation depuis le Mac uniquement.
- Mise à jour lancée à la main, environ une fois par mois.

## Sources de données

1. **Étape 1** : import d'un export CSV Revolut, téléchargé depuis la **version web de
   Revolut**, directement, sans être ouvert ni réenregistré dans un tableur. Il faut aussi
   désactiver le renommage automatique dans le navigateur.
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

## Format de l'export CSV Revolut (constaté sur un vrai export, #1)

- **Colonnes**, dans cet ordre, avec des en-têtes en français (sans doute selon la langue de
  l'application) : `Type, Produit, Date de début, Date de fin, Description, Montant, Frais,
  Devise, État, Solde`.
- **Séparateur** : la virgule.
- **Pas d'identifiant unique** par transaction.
- **Nom du fichier donné par Revolut** :
  `account-statement_<début AAAA-MM-JJ>_<fin AAAA-MM-JJ>_<langue>_<identifiant>.csv`, par
  exemple `account-statement_2026-10-01_2026-10-31_fr-fr_xxxxxx.csv`. Attention : le
  navigateur peut renommer le fichier au téléchargement (option à désactiver).
- **Encodage** : UTF-8 correct quand le fichier est téléchargé directement. En passant par
  Google Sheets, les accents étaient encodés deux fois (« É » devenait « Ã ») : le fichier doit
  arriver sans être retouché.
- **Dates** : `AAAA-MM-JJ HH:MM:SS` (par exemple `2026-10-04 11:05:20`), sans fuseau horaire.
- **`Produit`** : une seule valeur, `Valeur actuelle` (le compte courant).
- **Valeurs de `Type`** : `DAB` (retrait d'espèces), `Ajout de fonds`, `Paiement par carte`,
  `Virement`, `Remboursement sur carte`.
- **Valeurs d'`État`** : `TERMINÉ`, `RENVOYÉ`. `RENVOYÉ` : le commerçant n'a pas réclamé les
  fonds dans les délais, donc rien n'a été débité. La ligne a d'ailleurs un `Solde` vide. Aucune transaction en attente dans un export d'un mois terminé.
- **Devises** : aucune transaction en devise étrangère pour l'instant (#6).
- **Montants** : point comme séparateur décimal, dépenses en négatif (par exemple `-12.50`).
- **Transactions à cheval sur deux mois** : une opération commencée le 31 juillet et terminée
  le 1er août apparaît dans l'export d'**août**. C'est donc la `Date de fin` qui range une
  transaction dans un mois.

## Sens des types de transaction (tranché)

- `Ajout de fonds` : une vraie rentrée d'argent (salaire par virement, par exemple).
- `DAB` : une dépense effectuée.

## Questions ouvertes (à trancher en conception)

Doublons, colonnes et statuts : réglés par la
[décision 0004](decisions/0004-regles-import.md) (import strict, un mois à la fois).

- **Montants** : en centimes entiers, ou dans un autre type ? Les nombres à virgule sont à
  exclure.
- **Fuseau horaire** : les dates n'en ont pas. On les lit comme l'heure de Paris ?
- **Virements internes** : les mouvements vers un coffre Revolut ou entre mes comptes ne sont
  pas des dépenses. Comment les reconnaître ?
- **Remboursements** : faut-il les compter en négatif dans la catégorie d'origine ?
