//Flag qui contrôle le mode quebecois ou non
var quebecois = false;
//Flag qui contrôle si une piñata est apparue ou non
var app = false;
//Flag qui contrôle si le lien vers la vidéo a déjà été ouvert
var link = false;
//Tableau qui compte le nombre d'éléments possedés
var items={"money" : 0, "level1" : 0 , "level2" : 0 , "level3" : 0 , "level4" : 0 , "level5" : 0 };
//Tableau qui gère le coût des achats
var actualCost = {"level1" : 10 , "level2" : 100 , "level3" : 1000 , "level4" : 10000 , "level5" : 100000};
//Tableau qui stocke les flocons de neige
var snowFlakes = [];

//Fonction qui permet de donner au canevas les dimensions de l'écran
var setCanvasWidth = setTimeout(function(){
    var canvas = document.getElementById("myCanvas");
    canvas.width = screen.width;
    canvas.height = screen.height - 150;
}, 10);

//Fonction qui permet d'actualliser les textes
var windowUpdate = setInterval(function(){updateWindow()}, 100);
//Fonction qui ajoute automatiquement les items
var addingAutomatically = setInterval(function(){addAutomatic()}, 50);

//Permet de faire apparaître les flocons de neige
var drawSnow = setInterval(function(){createSnow()}, 250);
//Permet de faire tomber la neige
var updateSnows = setInterval(function(){updateSnow()}, 50);

//Permet d'ajouter un ou des items
function addThing(idThing, nbThing, byClick){
    if(idThing == "money"){
        items["money"] += nbThing;
    }else if(idThing == "level1"){
        if(byClick == 0 && items["money"] >= actualCost["level1"]){
            items["level1"] += nbThing;
            items["money"] -= actualCost["level1"];
            actualCost["level1"] *= 1.1;
        }else if(byClick == 1){
            items["level1"] += nbThing;
        }
    }else if(idThing == "level2"){
        if(byClick == 0 && items["money"] >= actualCost["level2"]){
            items["level2"] += nbThing;
            items["money"] -= actualCost["level2"];
            actualCost["level2"] *= 1.2;
        }else if(byClick == 1){
            items["level2"] += nbThing;
        }
    }else if(idThing == "level3"){
        if(byClick == 0 && items["money"] >= actualCost["level3"]){
            items["level3"] += nbThing;
            items["money"] -= actualCost["level3"];
            actualCost["level3"] *= 1.3;
        }else if(byClick == 1){
            items["level3"] += nbThing;
        }
    }else if(idThing == "level4"){
        if(byClick == 0 && items["money"] >= actualCost["level4"]){
            items["level4"] += nbThing;
            items["money"] -= actualCost["level4"];
            actualCost["level4"] *= 1.4;
        }else if(byClick == 1){
            items["level4"] += nbThing;
        }
    }else if(idThing == "level5"){
        if(byClick == 0 && items["money"] >= actualCost["level5"]){
            items["level5"] += nbThing;
            items["money"] -= actualCost["level5"];
            actualCost["level5"] *= 1.5;
        }else if(byClick == 1){
            items["level5"] += nbThing;
        }
    }
}

//Fonction qui ajoute automatiquement les items
function addAutomatic(){
    if(items["level1"] > 0){
        var nbMoneyAjoute = (items["level1"] * 2) / 20;
        addThing("money", nbMoneyAjoute, 1);
    }
    if(items["level2"] > 0){
        var nbLevel1Ajoute = (items["level2"]) / 20;
        addThing("level1", nbLevel1Ajoute, 1);
    }
    if(items["level3"] > 0){
        var nbLevel2Ajoute = (items["level3"]) / 20;
        addThing("level2", nbLevel2Ajoute, 1);
    }
    if(items["level4"] > 0){
        var nbLevel3Ajoute = (items["level4"]) / 20;
        addThing("level3", nbLevel3Ajoute, 1);
    }
    if(items["level5"] > 0){
        var nbLevel4Ajoute = (items["level5"]) / 20;
        addThing("level4", nbLevel4Ajoute, 1);
    }
}

//Permet d'afficher les nombres avec un format particulier
function afficherNombreJoli(number){
    if(number >= 1000){
        return numeral(number).format("0.00a");
    }else{
        return number.toFixed(0);
    }
}

//Fonction qui permet d'actualliser les textes
function updateWindow(){
    if(!quebecois)
    {
        document.getElementById("nbMoney").innerHTML = afficherNombreJoli(items["money"]) + " V-Bucks";
        document.getElementById("itemproduct1").innerHTML = afficherNombreJoli(items["level1"] * 2) + "  V-Bucks/s";
    }
    else
    {
        document.getElementById("nbMoney").innerHTML = afficherNombreJoli(items["money"]) + " CelineCoins";
        document.getElementById("itemproduct1").innerHTML = afficherNombreJoli(items["level1"] * 2) + "  CelineCoins/s";
    }
    document.getElementById("item1").innerHTML = afficherNombreJoli(items["level1"]);
    document.getElementById("item2").innerHTML = afficherNombreJoli(items["level2"]);
    document.getElementById("item3").innerHTML = afficherNombreJoli(items["level3"]);
    document.getElementById("item4").innerHTML = afficherNombreJoli(items["level4"]);
    document.getElementById("item5").innerHTML = afficherNombreJoli(items["level5"]);
    document.getElementById("itemproduct2").innerHTML = afficherNombreJoli(items["level2"] * 1) + " level1/s";
    document.getElementById("itemproduct3").innerHTML = afficherNombreJoli(items["level3"] * 1) + " level2/s";
    document.getElementById("itemproduct4").innerHTML = afficherNombreJoli(items["level4"] * 1) + " level3/s";
    document.getElementById("itemproduct5").innerHTML = afficherNombreJoli(items["level5"] * 1) + " level4/s";
    document.getElementById("shop1").innerHTML = afficherNombreJoli(actualCost["level1"]);
    document.getElementById("shop2").innerHTML = afficherNombreJoli(actualCost["level2"]);
    document.getElementById("shop3").innerHTML = afficherNombreJoli(actualCost["level3"]);
    document.getElementById("shop4").innerHTML = afficherNombreJoli(actualCost["level4"]);
    document.getElementById("shop5").innerHTML = afficherNombreJoli(actualCost["level5"]);
}

//Fonction qui renvoie un entier aléatoire entre deux nombres
function randomBetweenTwoNumbers(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Fonction qui crée la neige
function createSnow(){
    if(quebecois){    
        var xRandom =randomBetweenTwoNumbers(0,screen.width);
        var snowflake = {
            position:{x : xRandom, y : 10}
        }

        snowFlakes.push(snowflake);
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(snowflake.position.x, snowflake.position.y,5, 0, Math.PI * 2, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

//Fonction qui fait tomber la neige
function updateSnow(){
    if(quebecois){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0, canvas.width, canvas.height);
        snowFlakes.forEach(snowflake => {
            snowflake.position.y += 3;
            ctx.beginPath();
            ctx.arc(snowflake.position.x, snowflake.position.y,5, 0, Math.PI * 2, false);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        });
    }
}

//Fonction qui change le mode quebecois / fortnite
function changeMode(){
    quebecois = !quebecois;
    snowFlakes = [];
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);
    if(quebecois){
        document.getElementById("itemimg1").src = "./Images/itemQ1.gif";
        document.getElementById("itemimg2").src = "./Images/itemQ2.gif";
        document.getElementById("itemimg3").src = "./Images/itemQ3.gif";
        document.getElementById("itemimg4").src = "./Images/itemQ4.gif";
        document.getElementById("itemimg5").src = "./Images/itemQ5.gif";
        document.getElementById("shopimg1").src = "./Images/shopQ1.png";
        document.getElementById("shopimg2").src = "./Images/shopQ2.png";
        document.getElementById("shopimg3").src = "./Images/shopQ3.png";
        document.getElementById("shopimg4").src = "./Images/shopQ4.png";
        document.getElementById("shopimg5").src = "./Images/shopQ5.png";
        document.getElementById("mode").innerHTML = "Mode Fortnite";
        document.getElementsByTagName("body")[0].style.backgroundImage = "url('./Images/background_quebec.png')";
    }else{
        document.getElementById("itemimg1").src = "./Images/item1.gif";
        document.getElementById("itemimg2").src = "./Images/item2.gif";
        document.getElementById("itemimg3").src = "./Images/item3.gif";
        document.getElementById("itemimg4").src = "./Images/item4.gif";
        document.getElementById("itemimg5").src = "./Images/item5.gif";
        document.getElementById("shopimg1").src = "./Images/shop1.png";
        document.getElementById("shopimg2").src = "./Images/shop2.png";
        document.getElementById("shopimg3").src = "./Images/shop3.png";
        document.getElementById("shopimg4").src = "./Images/shop4.png";
        document.getElementById("shopimg5").src = "./Images/shop5.png";
        document.getElementById("mode").innerHTML = "Mode québécois";
        if(!porte)
        {
            document.getElementsByTagName("body")[0].style.backgroundImage = "url('./Images/background_fortnite.png')";
        }
        else
        {
            document.getElementsByTagName("body")[0].style.backgroundImage = "url('./Images/background_fortnite2.png')";
        }
    }
    
}

//Permet d'afficher la piñata trouvée
function pinata(id)
{
    var pinpop = document.getElementById("pinpop");
    if(!quebecois)
    {
        if(id == "pin2")
        {
            if(!porte)
            {
                document.getElementsByTagName("body")[0].style.backgroundImage = "url('./Images/background_fortnite2.png')"
                porte = true;
            }
            else
            {
                app = true;
                pinpop.src = "./Images/pinata_sepia.png";
                pinpop.style.zIndex = 1;
            }
        }
        else
        {
            app = true;
            pinpop.src = "./Images/pinata_gray.png";
            pinpop.style.zIndex = 1;
        }
    }
    else
    {
        if(id == "pin2")
        {
            app = true;
            pinpop.src = "./Images/pinata_pixel.png";
            pinpop.style.zIndex = 1;
        }
        if(id == "pin1")
        {
            app = true;
            pinpop.src = "./Images/pinata_multicolor.png";
            pinpop.style.zIndex = 1;
            if(!link)
            {
                link = true;
                window.open("https://www.youtube.com/watch?v=WMdFnFjyR48");
            }
        }
    }

}

//Fonction qui affiche un message d'alerte si on double clique sur la piñata
function ouch()
{
    alertify.set("notifier","position","bottom-left");
    if(!quebecois)
    {
        alertify.error("Aïe, ça fait mal !");
    }
    else
    {
        alertify.error("Aïe, ça fait mal tabernak !");
    }
}