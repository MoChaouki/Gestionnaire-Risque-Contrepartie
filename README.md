# Gestionnaire de Risque Contrepartie

## Description
Le projet **Gestionnaire de Risque Contrepartie** est une application web interactive, basée sur un contrat intelligent Solidity, qui permet de gérer efficacement les risques financiers liés aux contreparties sur une blockchain. 

### Fonctionnalités principales :
- Ajouter une contrepartie avec un portefeuille, un score crédit, une limite d’exposition et un collatéral.
- Mettre à jour l’exposition d’une contrepartie existante.
- Ajouter des positions longues et courtes pour les contreparties.
- Calculer les indicateurs financiers clés :
  - Exposition nette
  - Ratio de couverture
  - Score de risque
  - Collatéral requis
- Vérifier si le collatéral disponible est suffisant.

## Technologies Utilisées
- **Solidity** : Développement du contrat intelligent.
- **Web3.js** : Interaction avec le contrat sur une blockchain compatible Ethereum.
- **HTML/CSS/JavaScript** : Création de l'interface utilisateur.
- **MetaMask** : Gestion des transactions blockchain.

## Prérequis
Pour exécuter ce projet, vous aurez besoin de :
- [MetaMask](https://metamask.io/) pour connecter votre portefeuille Ethereum.
- [Node.js](https://nodejs.org/) et `http-server` pour héberger l'interface utilisateur.
- Un environnement blockchain comme [Sepolia Testnet](https://sepolia.dev/).

## Installation et Utilisation
1. Clonez le dépôt GitHub :
   ```bash
   git clone https://github.com/<votre-utilisateur>/projet-gestionnaire-risque.git
   cd projet-gestionnaire-risque

Hébergez le projet localement avec Python :
python -m http.server
Puis accédez à l'interface via http://localhost:8000.

