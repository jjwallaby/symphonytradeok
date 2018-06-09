export function convertNominal(nominal) {

    var shortNom = "";
    var newnom = Math.abs(parseInt(nominal)/1000000);
    return newnom.toString() + 'm';
    
}

export function getIconName(custSide) {

    var iconName = "";

    if ( custSide == "Lend" ) {
        // http://rugbyfc.com/favicon.ico"
        iconName = "http://rugbyfc.com/symphonyimg/lend.png";
    } else if ( custSide == "Borrow" ) {  
        iconName = "http://rugbyfc.com/symphonyimg/borrow.png";
        //iconName = "/img/borrow.jpg";
    }  else if ( custSide == "Sell" ) {  
        iconName = "http://rugbyfc.com/symphonyimg/sell.png";
    }   else if ( custSide == "Buy" ) {  
        iconName = "http://rugbyfc.com/symphonyimg/buy.png";
    } else {
        iconName = "http://rugbyfc.com/symphonyimg/tradeok.png";
    }

    return iconName;

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