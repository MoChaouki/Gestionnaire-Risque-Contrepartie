# Gestionnaire de Risque Contrepartie

## Description
Le projet **Gestionnaire de Risque Contrepartie** est une application web interactive, basée sur un contrat intelligent Solidity. Il permet de gérer efficacement les risques financiers liés aux contreparties sur une blockchain. Grâce à une interface web intuitive, il offre une gestion transparente et traçable des expositions financières et des collatéraux.

## Fonctionnalités principales
### Ajout de contreparties :
- Ajouter une contrepartie avec une adresse de portefeuille, un score crédit, une limite d’exposition et un collatéral.

### Mise à jour de l'exposition :
- Mettre à jour l’exposition d’une contrepartie existante.

### Ajout de positions financières :
- Ajouter des positions longues et courtes pour chaque contrepartie.

### Calculs d’indicateurs financiers :
- **Exposition nette** : Différence entre positions longues et courtes.
- **Ratio de couverture** : Mesure le collatéral disponible par rapport à l’exposition courante.
- **Score de risque** : Évalue le risque global d'une contrepartie.
- **Collatéral requis** : Calcule le collatéral minimum nécessaire pour couvrir une position courte.

### Vérification du collatéral :
- Vérifier si le collatéral disponible est suffisant pour couvrir les positions courtes.

## Technologies Utilisées
- **Solidity** : Développement du contrat intelligent.
- **Web3.js** : Interaction avec le contrat intelligent sur une blockchain Ethereum.
- **HTML/CSS/JavaScript** : Création de l'interface utilisateur web.
- **MetaMask** : Gestion des transactions blockchain via un portefeuille Ethereum.
- **Python (optionnel)** : Hébergement local avec `http.server`.

## Prérequis
Pour exécuter ce projet, vous aurez besoin de :
- **MetaMask** : Pour connecter votre portefeuille Ethereum.
- **Node.js** et **http-server** : Pour héberger l'interface utilisateur en local.
- **Environnement blockchain** : Utilisez le réseau Sepolia Testnet pour les tests.

## Installation et Utilisation
### 1. Clonez le dépôt GitHub :
```bash
git clone https://github.com/MoChaouki/Gestionnaire-Risque-Contrepartie.git
cd Gestionnaire-Risque-Contrepartie

Hébergez le projet localement avec Python : python -m http.server Puis accédez à l'interface via http://localhost:8000.