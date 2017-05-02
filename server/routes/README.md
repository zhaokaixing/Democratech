# Documentation API :

## Sommaire
* [Information générales](#globalInfos)
* [API villes](#citiesApi)
* [API départements](#deptsApi)
* [API utilisateurs](#usersApi)
* [API projets](#projApi)
* [API commentaires](#commApi)
* [API opinions](#opsApi)
* [ToDo](#todo)

## Information générales <a id=globalInfos></a>
* base url : ** http://\<domain\>:3000/api/ **
* port : 3000
* les types avec une * sont documentés dans /client/src/app/models/\<type\>.ts
__________________________________________________
## API villes <a id=citiesApi></a>
#### Obtenir la liste de toutes les villes : 
    * url: cities
    * method: GET
#### Obtenir une ville : 
    * url: city/:cityId | city/:deptNum
    * method: GET
    * params: { cityId: string } | { deptNum: int }
_________________________________________________
## API départements <a id=deptsApi></a>
#### Obtenir la liste de tous les départements : 
    * url: departments
    * method: GET
_________________________________________________
## API utilisateurs <a id=usersApi></a>
#### Obtenir la liste de tous les utilisateurs : 
    * url: users
    * method: GET
#### Obtenir un utilisateur : 
    * url: user/:userId | user/:email
    * method: GET
    * params: { userId: string } | { email: string }
#### Ajouter un utilisateur :
    * url: user
    * method: POST
    * body: User*
    * content-type: application/json
#### Mettre à jour un utilisateur :
    * url: user/:userId
    * method: PUT
    * params: { userId: string }
    * body: User*
    * content-type: application/json    
#### Supprimer un utilisateur :
    * url: user/:userId
    * method: DELETE
    * params: { userId: string }
_________________________________________________
## API projets <a id=projApi></a>
#### Obtenir la liste de tous les projets : 
    * url: projects
    * method: GET
#### Obtenir un projet : 
    * url: project/:projectId | project/:cityName
    * method: GET
    * params: { projectId: string } | { cityName: string }
#### Ajouter un projet :
    * url: project
    * method: POST
    * body: Project*
    * content-type: application/json
#### Mettre à jour un projet (ToDo) :
    * url: project/:projectId
    * method: PUT
    * params: { projectId: string }
    * body: Project*
    * content-type: application/json    
#### Supprimer un projet :
    * url: project/:projectId
    * method: DELETE
    * params: { projectId: string }
_________________________________________________
## ToDo <a id=todo></a>
    * mise à jour projet
    * sécuriser avec jwt
    * recherche projet générique (url/:key/:value)
