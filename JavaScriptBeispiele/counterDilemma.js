//Ein Beispiel für die Nutzung eines Closures in JavaScript
//Wir wollen einen Counter realisieren, der nur über eine Funktion add() hochgezählt werden kann. Dazu reicht der folgende naive Versuch nicht aus:

var counter = 0;

function add() {
    counter += 1;
}

/*Das Problem ist, dass counter global ist und von jeder function geändert werden könnte ohne, dass add aufgerufen wird.
Würde ich var counter innerhalb der Funktion deklarieren, wäre sie nur lokal und würde nach beendigung eines add() sterben und ich könnte gar nicht hochzählen.
Wir brauchen also ein anderes Konstrukt. Eine nächste Überlegung könnte eine nested function sein wie die folgende:*/

function add() {
    var counter = 0;
    function plus() {counter += 1;}
    plus();
    return counter;
}

/*Aber auch diese löst unser Problem nicht wirklich, da wir von außen nicht an die plus() function rankommen und
nicht erreichen können, dass counter = 0 nur einmal ausgeführt wird. Eine Closure führt uns letztlich zum Ziel: */

var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();
/*
Da ist vermutlich etwas Erklärung nötig. Wenn das nicht reichen sollte siehe nochmal online closures und self-invoking functions.

Nun aber in medias res: vier definieren eine globale Variable add und weisen ihr den Rückgabewert einer selbstaufrufenden function zu.
Diese selbstaufrufende function läuft aber nur einmal!!! (Das ist die erste wo noch kein return davor steht.)
Die setzt zunächst mal den counter auf 0 und gibt dann eine function zurück (die zweite mit dem return davor).
CLEVER: auf diese Weise ist add also selbst zur Funktion geworden, aber counter = 0 wurde nur einmal ausgeführt!
Das nette an der Sache sit, dass die innere function zugriff auf die Variablen ihres erschaffenden Kontextes hat, also
der äußeren function und counter gleichzeitig vor Veränderungen ohne Benutzung von add() abgeschirmt ist. Geiler Scheiß!
wenn ich also jetzt:
*/

add();
add();
add();

/*
aufrufe, ist der counter = 3;
Wenn ich das richtig verstehe würde in a mit a=add() dann eine 4 stehen.--> Stimmt, kann man hier gut testen:
http://math.chapman.edu/~jipsen/js/
A closure is a function having access to the parent scope, even after the parent function has closed.
*/
