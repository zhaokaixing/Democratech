# democratech
Réseau sociétal..

## récupération et mise en place du projet
* télécharger et installer nodejs : [https://nodejs.org/en/](https://nodejs.org/en/)
* cloner le projet et installer les dépendances :
```bash
$ git clone https://github.com/flwrnt/democratech.git
$ cd /sous/repertoire/democratech
$ npm install
$ cd client
$ npm install
```

* si vous ne l'avez pas déjà fait installer [nodemon](https://www.npmjs.com/package/nodemon) (permet de rafraichir le serveur à chaque modification. cf. tuto mean app)
```bash
$ npm install -g nodemon
```

* dans Intellij : 
  * liste déroulante à coté de la flèche pour lancer un projet (grisée normalement) > Edit configuration
  * bouton plus en haut à gauche (add configuration) > sélectionner npm dans la liste déroulante
  * dans la fenètre qui s'affiche ajouter **start** dans le champ **script**
  * cliquer sur ok

* cliquer sur la flèche (start) pour lancer le serveur (disponible à l'adresse [http://localhost:3000](http://localhost:3000))

## gestion des branches
pour comprendre comment sont et seront gérer les branches, je vous invite à voir ce petit tutoriel de votre développeur préféré, j'ai nommé Grafikart : [https://www.grafikart.fr/formations/git/git-flow](https://www.grafikart.fr/formations/git/git-flow)
