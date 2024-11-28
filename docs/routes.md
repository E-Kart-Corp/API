# API Documentation

Cette API permet la gestion des produits, y compris la création, la vérification, et la récupération de produits. Elle utilise Firebase Storage pour le stockage des images et Firestore pour la gestion des données des produits.

## Endpoints

### 1. `POST /create_product`
Créer un nouveau produit en téléchargeant une image et en ajoutant les informations dans Firestore.

- **URL** : `/create_product`
- **Méthode** : `POST`
- **Form Data** :
  - `title` : Titre du produit (String).
  - `image` : Image du produit (fichier requis).
- **Réponses** :
  - **201 Created** : Retourne un message de succès, l'URL de l'image téléchargée, et les informations du produit.
  - **400 Bad Request** : Aucun fichier téléchargé.
  - **500 Internal Server Error** : Erreur serveur.
- **Exemple de réponse** :
  ```json
  {
    "message": "Image uploadée avec succès et produit ajouté dans Firestore !",
    "imageUrl": "https://.../products/filename.jpg",
    "title": "Nom du produit"
  }
  ```

### 2. `POST /check_product`
Vérifie un produit en téléchargeant une image à comparer avec les produits existants.

- **URL** : `/check_product`
- **Méthode** : `POST`
- **Form Data** :
  - `image` : Image à vérifier (fichier requis).
- **Réponses** :
  - **201 Created** : Retourne un message de succès et l'URL de l'image téléchargée pour vérification.
  - **400 Bad Request** : Aucun fichier téléchargé.
  - **500 Internal Server Error** : Erreur serveur.
- **Exemple de réponse** :
  ```json
  {
    "message": "Image uploadée avec succès et produit ajouté dans Firestore !",
    "imageUrl": "https://.../check/filename.jpg"
  }
  ```

### 3. `GET /product`
Récupère la liste des produits stockés dans la base de données.

- **URL** : `/product`
- **Méthode** : `GET`
- **Réponses** :
  - **200 OK** : Retourne la liste des produits.
  - **404 Not Found** : Aucun produit trouvé.
  - **500 Internal Server Error** : Erreur serveur.
- **Exemple de réponse** :
  ```json
  {
    "products": [
      {
        "title": "Nom du produit",
        "imageUrl": "https://.../products/filename.jpg"
      }
    ]
  }
  ```

## Notes

- **Gestion des erreurs** : Toutes les erreurs côté serveur (par exemple, échec de téléchargement, problème de connexion à Firestore) retourneront une réponse de statut `500`.
