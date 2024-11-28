```markdown
## Installation

1. Clonez le dépôt principal avec ses sous-modules :
   ```bash
   git clone --recurse-submodules <url-du-repo-principal>
   cd <nom-du-repo>
   ```

2. Si le dépôt a été cloné sans les sous-modules, initialisez et mettez à jour le sous-module manuellement :
   ```bash
   git submodule init
   git submodule update
   ```

3. Pour mettre à jour le sous-module vers la dernière version distante :
   ```bash
   git submodule update --remote
   ```

4. Installez les dépendances :
   ```bash
   npm install
   ```

5. Démarrez le serveur :
   ```bash
   npm start
   ```
```

---

### 4. **Mise à jour future du sous-module**

Pour mettre à jour le sous-module lorsqu’il y a des changements dans son dépôt d’origine, utilise la commande suivante :

```bash
git submodule update --remote private_files
```
