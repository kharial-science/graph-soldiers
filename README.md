# graph-soldiers

## Plan

-   Développement de l'environnement
    -   Implémentation de la classe Graph
    -   Implémentation de la classe Environment qui découle du graphe, mais l'étend
    -   Implémentation des EnvironmentVertex et EnvironmentEdge qui contiennent davantage d'informations sur l'environnement, comme:
        -   La liste des individus présents sur le vertex
        -   Des informations sur les individus en transit sur les edges
        -   Une liste des féromones présent sur le vertex
        -   Les quantités de ressources des différentes ressources disponibles (il pourrait y en avoir plusieurs types, y réfléchir)
    -   Implémentation des fonctions de consommation et de manipulation de l'environnement
    -   Implémentation d'une clock universelle (le temps s'écoule, fait consommer de l'énergie aux créatures, fait disparaîtres des féromones)
-   Développement base de données
    -   Création d'une base de données SQL gérée avec MySQL
    -   Base de données pour gérer les individus
    -   Base de données pour gérer l'environnement
    -   Base de données pour gérer la construction de l'environnement
-   Concernant la construction de l'environnement
    -   Trouver une lib de scraping
    -   Téléchargement et filtrage des données de construction de l'environnement
    -   Implémentation de méthodes pour étendre l'environnement de manière progressive (par exemple chercher tous les liens d'un site et construire tous les voisins, sans nécessairement continuer la propagation)
-   Concernant les créatures
    -   Création de la classe Creature
    -   Implémentation des différents centres de commandes :
        -   Senseurs (nombre d'individus, cycles circadiens, nourriture disponible, féromones, identifier les transits possibles)
        -   Neurones activateurs (fonctions d'activations reliables aux autres centres)
        -   Actionneurs (consommer l'environnement, lancer un déplacement, tuer une autre créature?, lancer une reproduction)
        -   Reproducteurs (permet de lancer la reproduction à l'aide d'une certaine quantité d'énergie, de son propre génotype ou)
        -   Génotypes (sauvegarde entière de génotypes d'autres créatures, ces génotypes sont soumis à la dérive lors de la reproduction, pour éviter les problèmes de récursion, une créature possédant des génotypes pour produire d'autres créatures ne peut produire de créatures possédant des génotypes (les génotypes ne contiennent pas de génotypes) OU BIEN donner la possibilité de régler la "recursion depth" : les génotypes peuvent contenir des sous-génotypes mais seulement jusqu'à un certain point)
    -   Les centres de commandes consomment de l'énergie lorsqu'ils sont actifs, les actionneurs consomment de l'énergie à chaque action, les activateurs à chaque activation, les senseurs et génotypes en continu, l'énergie consommée par le reproducteur l'est pour la reproduction
    -   Implémentation de l'éjection de génotype et de la récupération de génotypes (les créatures peuvent s'échanger des génotypes)
    -   Lorsqu'un créature en tue une autre, elle récupère son énergie, mais il faut trouver un système de point de vie / dégât / protection
-   Représentation graphique
    -   Première étape : graphe hard codé et visualisation hard codée
    -   Deuxième étape : graphe web et visualisation dynamique du graphe
    -   Page web pour visualiser, évidemment
    -   Visualisation des données d'environnement : en cliquant sur un noeud, liste des créatures, de la nourriture disponible, etc
    -   Visualisation des profils de créatures : en sélectionnant une créature particulière : graphe de ses senseurs, des poids entre les centres de commandes, des génotypes, etc
    -   Interaction avec les créatures et l'environnement par l'interface graphique : ajout de nourriture, catastrophes naturelles, massacres de créature, etc

## Implémentations

La première implémentation concerne l'environnement et les créatures sans centres génotypiques.
La seconde implémentation intègre la base de données.
La représentation graphique est ensuite considérée.
Les génotypes peuvent être intégrés.
