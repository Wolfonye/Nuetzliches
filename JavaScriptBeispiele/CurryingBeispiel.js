function addiere(x,y) {
  if (typeof y === "undefined" ) {
    return function (yy) { //man beachte hier, dass "Code" zurückgegeben wird, das ist nicht in jeder Programmiersprache so einfach erlaubt
      return x + yy;
    }
  }
  return x + y;
}

addiere(2,4); // normaler Aufruf. ergibt 6

var addiere_zu_drei = addiere(3); // Currying
addiere_zu_drei(5);  // ergibt 8
