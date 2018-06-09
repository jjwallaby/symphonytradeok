export function convertNominal(nominal) {

    var shortNom = "";
    var newnom = parseInt(nominal)/1000000;
    return newnom.toString();
    
}


export function cpySide(side) {

    var switchCpySide = "";
    if ( side == "Lend") {
        switchCpySide = "Borrow";
    } else if ( side == "Borrow") {
        switchCpySide = "Lend";
    }
    return switchCpySide;

    
}