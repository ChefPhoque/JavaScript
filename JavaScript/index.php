<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">

    <title>JEU PIERRE FEUILLE CISEAUX</title>
</head>
<body>

<header>
    <h1>JEU PIERRE FEUILLE CISEAUX</h1>
</header>

<input id="pierre" type="button" value="Pierre"/>
<input id="feuille" type="button" value="Feuille"/>
<input id="ciseaux" type="button" value="Ciseaux"/>

<br><br>

<div>Choix du joueur : <span id="choixJ"></span></div>
<div>Choix de l'ordinateur : <span id="choixPC"></span></div>

<br>

<div>Comparaison du choix du joueur et de l'ordinateur :</div>
<div id="resultat"></div>

<br>

<div>Résultat du jeu :</div>
<div id="jeu"></div>

<script src="script.js"></script>

</body>
</html>