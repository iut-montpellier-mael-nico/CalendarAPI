# API Calendar - NodeJS

## Pour installer le projet
```
npm install
```

## Pour démarrer le serveur
```
node index.js
```
Le serveur doit normalement répondre : "app running on port 5000"


## Utilisation de l'api

Sur ce serveur il y a différents routes de disponibles :

### Ajout d'un utilisteur
```html
/register
Cette route prend en paramètre un mail et un password.
```
### Login d'un utilisteur
```html
/login
Cette route prend en paramètre un mail et un password.
```
### Ajouter un evenement
```html
/private/addEvent
Cette route prend en paramètre un titre, une date de debut, 
une date de fin , une description, un idUtilisateur.
```
### Supprimer un evenement
```html
/private/deleteEvent
Cette route prend en paramètre un idEvent.
```
### Lister les evenements
```html
/private/mesEvents
```
### Detail d'un evenement
```html
/private/monEvent
Cette route prend un paramètre un idEvent.
```

## Auteurs
* Maël Baron
* Nicolas Guitard

