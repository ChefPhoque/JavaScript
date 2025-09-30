let jeu = ["Pierre", "Feuille", "Ciseaux"];
let score = {nombreParties : 0, joueur : 0, ordinateur : 0};

let bouton = document.getElementById("pierre");
bouton.addEventListener("click",  function ()
{
     let c = document.getElementById("choixJ").innerText = "Pierre";

    let nb = getRandomInt();

    document.getElementById("choixPC").innerText = jeu[nb];

    if(jeu[nb] === "Pierre") {
        document.getElementById("resultat").innerText = "Ce sont les mêmes choix.";
    } else {
        document.getElementById("resultat").innerText = "Ce ne sont pas les mêmes choix.";
    }

    scorePartie(c, jeu[nb]);
    console.log(score);
});

let bouton1 = document.getElementById("feuille");
bouton1.addEventListener("click", function ()
{
    let c = document.getElementById("choixJ").innerText = "Feuille";

    let nb = getRandomInt();

    document.getElementById("choixPC").innerText = jeu[nb];

    if(jeu[nb] === "Feuille") {
        document.getElementById("resultat").innerText = "Ce sont les mêmes choix.";
    } else {
        document.getElementById("resultat").innerText = "Ce ne sont pas les mêmes choix.";
    }

    scorePartie(c, jeu[nb]);
    console.log(score);

});

let bouton2 = document.getElementById("ciseaux");
bouton2.addEventListener("click", function ()
{
    let c = document.getElementById("choixJ").innerText = "Ciseaux";

    let nb = getRandomInt();

    document.getElementById("choixPC").innerText = jeu[nb];

    if(jeu[nb] === "Ciseaux") {
        document.getElementById("resultat").innerText = "Ce sont les mêmes choix.";
    } else {
        document.getElementById("resultat").innerText = "Ce ne sont pas les mêmes choix.";
    }

    scorePartie(c, jeu[nb]);
    console.log(score);
});

//////////////////////////////////////////////////////////////////////////////

function getRandomInt(){
    return Math.floor(Math.random() * 3);
}

function scorePartie(c, r) {
    if (c === "Pierre") {
        if (r === "Feuille") {
            score.ordinateur += 1;
        } else if (r === "Ciseaux") {
            score.joueur += 1;
        }
    } else if (c === "Feuille") {
        if (r === "Ciseaux") {
            score.ordinateur += 1;
        } else if (r === "Pierre") {
            score.joueur += 1;
        }
    } else {
        if (r === "Pierre") {
            score.ordinateur += 1;
        } else if (r === "Feuille") {
            score.joueur += 1;
        }
    }
    score.nombreParties += 1;
}