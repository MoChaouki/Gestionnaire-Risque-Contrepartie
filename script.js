// Configuration Web3
let web3;
let contract;
const contractAddress = "0x4Fe9567FBF755C18175735F4A4BAC58A0B87B6bC"; // Replace with your contract address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_portefeuille",
				"type": "address"
			},
			{
				"internalType": "uint16",
				"name": "_scoreCredit",
				"type": "uint16"
			},
			{
				"internalType": "uint256",
				"name": "_limiteExposition",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_collateral",
				"type": "uint256"
			}
		],
		"name": "ajouterContrepartie",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contrepartie",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_positionLongue",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_positionCourte",
				"type": "uint256"
			}
		],
		"name": "ajouterPosition",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "contrepartie",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "limiteExposition",
				"type": "uint256"
			}
		],
		"name": "ContrepartieAjoutee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "contrepartie",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "nouvelleExposition",
				"type": "uint256"
			}
		],
		"name": "ExpositionMiseAJour",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "contrepartie",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "exposition",
				"type": "uint256"
			}
		],
		"name": "LimiteDepassee",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contrepartie",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_nouvelleExposition",
				"type": "uint256"
			}
		],
		"name": "mettreAJourExposition",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contrepartie",
				"type": "address"
			}
		],
		"name": "calculerCollateralRequis",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contrepartie",
				"type": "address"
			}
		],
		"name": "calculerExpositionNette",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contrepartie",
				"type": "address"
			}
		],
		"name": "calculerRatioDeCouverture",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contrepartie",
				"type": "address"
			}
		],
		"name": "calculerRisque",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "contreparties",
		"outputs": [
			{
				"internalType": "address",
				"name": "portefeuille",
				"type": "address"
			},
			{
				"internalType": "uint16",
				"name": "scoreCredit",
				"type": "uint16"
			},
			{
				"internalType": "uint256",
				"name": "limiteExposition",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expositionCourante",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "collateral",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "estActif",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalPositionsCourtes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalPositionsLongues",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_contrepartie",
				"type": "address"
			}
		],
		"name": "verifierCollateralSuffisant",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function initializeWeb3() {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log("Web3 initialized successfully");
        } catch (error) {
            console.error("MetaMask connection failed:", error);
        }
    } else {
        alert("Veuillez installer MetaMask !");
    }
}

// Ajouter une Contrepartie
async function ajouterContrepartie() {
    const portefeuille = document.getElementById("portefeuille").value;
    const scoreCredit = document.getElementById("scoreCredit").value;
    const limiteExposition = document.getElementById("limiteExposition").value;
    const collateral = document.getElementById("collateral").value;

    if (!portefeuille || !scoreCredit || !limiteExposition || !collateral) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.ajouterContrepartie(portefeuille, scoreCredit, limiteExposition, collateral)
            .send({ from: accounts[0] });
        document.getElementById("output-ajouter").innerText = "Contrepartie ajoutée avec succès.";
    } catch (error) {
        document.getElementById("output-ajouter").innerText = "Erreur : " + error.message;
        console.error("Erreur lors de l'ajout de la contrepartie :", error);
    }
}

// Mettre à Jour une Exposition
async function mettreAJourExposition() {
    const contrepartie = document.getElementById("contrepartie-exposition").value;
    const nouvelleExposition = document.getElementById("nouvelleExposition").value;

    if (!contrepartie || !nouvelleExposition) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.mettreAJourExposition(contrepartie, nouvelleExposition)
            .send({ from: accounts[0] });
        document.getElementById("output-exposition").innerText = "Exposition mise à jour.";
    } catch (error) {
        document.getElementById("output-exposition").innerText = "Erreur : " + error.message;
        console.error("Erreur lors de la mise à jour de l'exposition :", error);
    }
}

// Ajouter des Positions
async function ajouterPosition() {
    const contrepartie = document.getElementById("contrepartie-position").value;
    const positionLongue = document.getElementById("positionLongue").value;
    const positionCourte = document.getElementById("positionCourte").value;

    if (!contrepartie || !positionLongue || !positionCourte) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.ajouterPosition(contrepartie, positionLongue, positionCourte)
            .send({ from: accounts[0] });
        document.getElementById("output-position").innerText = "Positions ajoutées.";
    } catch (error) {
        document.getElementById("output-position").innerText = "Erreur : " + error.message;
        console.error("Erreur lors de l'ajout des positions :", error);
    }
}

// Calculer les Indicateurs
async function calculerIndicateurs() {
    const contrepartie = document.getElementById("contrepartie-indicateur").value;

    if (!contrepartie) {
        alert("Veuillez entrer l'adresse de la contrepartie !");
        return;
    }

    try {
        const expositionNette = await contract.methods.calculerExpositionNette(contrepartie).call();
        const ratioCouverture = await contract.methods.calculerRatioDeCouverture(contrepartie).call();
        const scoreRisque = await contract.methods.calculerRisque(contrepartie).call();

        document.getElementById("output-indicateurs").innerHTML = `
            Exposition Nette : ${expositionNette}<br>
            Ratio de Couverture : ${ratioCouverture}%<br>
            Score de Risque : ${scoreRisque}
        `;
    } catch (error) {
        document.getElementById("output-indicateurs").innerText = "Erreur : " + error.message;
        console.error("Erreur lors du calcul des indicateurs :", error);
    }
}
// Calculer le Collatéral Requis
async function calculerCollateral() {
    const contrepartie = document.getElementById("contrepartie-collateral").value;

    if (!contrepartie) {
        alert("Veuillez entrer l'adresse de la contrepartie !");
        return;
    }

    try {
        const collateralRequis = await contract.methods.calculerCollateralRequis(contrepartie).call();
        document.getElementById("output-collateral").innerText = `Collatéral Requis : ${collateralRequis}`;
    } catch (error) {
        document.getElementById("output-collateral").innerText = `Erreur : ${error.message}`;
        console.error("Erreur lors du calcul du collatéral requis :", error);
    }
}

// Vérifier le Collatéral Suffisant
async function verifierCollateral() {
    const contrepartie = document.getElementById("contrepartie-verification").value;

    if (!contrepartie) {
        alert("Veuillez entrer l'adresse de la contrepartie !");
        return;
    }

    try {
        const estSuffisant = await contract.methods.verifierCollateralSuffisant(contrepartie).call();
        document.getElementById("output-verification").innerText = estSuffisant
            ? "Le collatéral est suffisant."
            : "Le collatéral est insuffisant.";
    } catch (error) {
        document.getElementById("output-verification").innerText = `Erreur : ${error.message}`;
        console.error("Erreur lors de la vérification du collatéral :", error);
    }
}


// Event Listeners
document.getElementById("ajouterContrepartie").addEventListener("click", ajouterContrepartie);
document.getElementById("mettreAJourExposition").addEventListener("click", mettreAJourExposition);
document.getElementById("ajouterPosition").addEventListener("click", ajouterPosition);
document.getElementById("calculerIndicateurs").addEventListener("click", calculerIndicateurs);
document.getElementById("calculerCollateral").addEventListener("click", calculerCollateral);
document.getElementById("verifierCollateral").addEventListener("click", verifierCollateral);

// Initialize Web3
initializeWeb3();
