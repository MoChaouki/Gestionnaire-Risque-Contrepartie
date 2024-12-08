// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GestionnaireRisqueContrepartie {
    struct Contrepartie {
        address portefeuille;
        uint16 scoreCredit; // Réduit de uint256 à uint16 pour optimiser
        uint256 limiteExposition;
        uint256 expositionCourante;
        uint256 collateral;
        bool estActif;
    }

    // Variables d'état optimisées
    mapping(address => Contrepartie) public contreparties;
    mapping(address => uint256) public totalPositionsLongues; // Total positions longues par contrepartie
    mapping(address => uint256) public totalPositionsCourtes; // Total positions courtes par contrepartie

    // Événements
    event ContrepartieAjoutee(address indexed contrepartie, uint256 limiteExposition);
    event ExpositionMiseAJour(address indexed contrepartie, uint256 nouvelleExposition);
    event LimiteDepassee(address indexed contrepartie, uint256 exposition);

    // Fonction pour ajouter une contrepartie
    function ajouterContrepartie(
        address _portefeuille,
        uint16 _scoreCredit,
        uint256 _limiteExposition,
        uint256 _collateral
    ) public {
        require(_scoreCredit > 0, "Le score de credit ne peut pas etre nul");
        require(_limiteExposition > 0, "La limite d'exposition doit etre positive");
        require(contreparties[_portefeuille].portefeuille == address(0), "Contrepartie deja ajoutee");

        contreparties[_portefeuille] = Contrepartie({
            portefeuille: _portefeuille,
            scoreCredit: _scoreCredit,
            limiteExposition: _limiteExposition,
            expositionCourante: 0,
            collateral: _collateral,
            estActif: true
        });

        emit ContrepartieAjoutee(_portefeuille, _limiteExposition);
    }

    // Fonction pour mettre à jour l'exposition d'une contrepartie
    function mettreAJourExposition(address _contrepartie, uint256 _nouvelleExposition) public {
        Contrepartie storage contrepartie = contreparties[_contrepartie];

        require(contrepartie.estActif, "Contrepartie inactive");
        contrepartie.expositionCourante = _nouvelleExposition;

        if (_nouvelleExposition > contrepartie.limiteExposition) {
            emit LimiteDepassee(_contrepartie, _nouvelleExposition);
        } else {
            emit ExpositionMiseAJour(_contrepartie, _nouvelleExposition);
        }
    }

    // Fonction pour ajouter des positions longues et courtes pour une contrepartie
    function ajouterPosition(
        address _contrepartie,
        uint256 _positionLongue,
        uint256 _positionCourte
    ) public {
        totalPositionsLongues[_contrepartie] += _positionLongue;
        totalPositionsCourtes[_contrepartie] += _positionCourte;
    }

    // Fonction pour calculer l'exposition nette d'une contrepartie
    function calculerExpositionNette(address _contrepartie) public view returns (int256) {
        return int256(totalPositionsLongues[_contrepartie]) - int256(totalPositionsCourtes[_contrepartie]);
    }

    // Fonction pour calculer le ratio de couverture
    function calculerRatioDeCouverture(address _contrepartie) public view returns (uint256) {
        Contrepartie memory c = contreparties[_contrepartie];

        require(c.expositionCourante > 0, "Exposition courante nulle");
        require(c.collateral > 0, "Collateral is zero");

        return (c.collateral * 100) / c.expositionCourante;
    }

    // Fonction pour calculer le risque d'une contrepartie
    function calculerRisque(address _contrepartie) public view returns (uint256) {
        Contrepartie memory c = contreparties[_contrepartie];

        require(c.estActif, "Contrepartie inactive");
        require(c.limiteExposition > 0, "Limite d'exposition nulle");
        require(c.scoreCredit > 0, "Score de credit invalide");

        uint256 risque = (c.expositionCourante * 100) / c.limiteExposition;
        return (risque * 100) / c.scoreCredit;
    }

    // Nouvelle fonction : Calculer le collatéral requis pour une position courte
    function calculerCollateralRequis(address _contrepartie) public view returns (uint256) {
        uint256 positionCourte = totalPositionsCourtes[_contrepartie];
        require(positionCourte > 0, "Pas de position courte avec cette contrepartie");
        return positionCourte; // Collateral requis égal à la position courte
    }

    // Nouvelle fonction : Vérifier si le collatéral est suffisant pour une contrepartie donnée
    function verifierCollateralSuffisant(address _contrepartie) public view returns (bool) {
        uint256 collateralRequis = calculerCollateralRequis(_contrepartie);
        uint256 collateralDisponible = contreparties[_contrepartie].collateral;
        return collateralDisponible >= collateralRequis;
    }
}
