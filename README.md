# democratech
Réseau sociétal..

## récupération et mise en place du projet
* télécharger et installer nodejs : [https://nodejs.org/en/](https://nodejs.org/en/)
* cloner le projet et installer les dépendances :
```bash
## clone le projet
$ git clone https://github.com/flwrnt/democratech.git

## se place sur la branch develop (la plus avancée)
$ git checkout develop

## télécharge les dépendances
$ cd democratech/server && npm install
$ cd ../client && npm install
```

* si vous ne l'avez pas déjà fait installer [nodemon](https://www.npmjs.com/package/nodemon) (permet de rafraichir le serveur à chaque modification. cf. tuto mean app)
```bash
$ npm install -g nodemon
```

## lancement de l'application
```bash
## ouvir un terminale à la racine du projet
$ npm start
## le serveur se lance... (disponible à [https://localhost:3000/](https://localhost:3000/))
## ouvrir un autre terminale à la racine du projet
$ cd client
$ npm start
## angular se lance...
```

* dans Intellij : 
  * **Remarque:** à faire pour le client et le serveur
  * liste déroulante à coté de la flèche pour lancer un projet (grisée normalement) > Edit configuration
  * bouton plus en haut à gauche (add configuration) > sélectionner npm dans la liste déroulante
  * dans la fenètre qui s'affiche ajouter **start** dans le champ **script**
  * cliquer sur ok

* sélectionner un lanceur & cliquer sur la flèche (start) pour démarrer le serveur et le client 
  * adresse du client (site democratech): [http://localhost:4200](http://localhost:4200)
  * adresse du serveur (api): [http://localhost:3000/api/API_OBJECT](http://localhost:3000/api/)

## gestion des branches
pour comprendre comment sont et seront gérer les branches, je vous invite à voir ce petit tutoriel de votre développeur préféré, j'ai nommé Grafikart : [https://www.grafikart.fr/formations/git/git-flow](https://www.grafikart.fr/formations/git/git-flow)
