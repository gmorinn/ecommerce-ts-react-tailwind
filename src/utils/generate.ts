export const generateEmail = ():string => {
    var strValues="abcdefg12345";
    var strEmail = "";
    var strTmp;
    for (var i=0;i<10;i++) {
        strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
        strEmail = strEmail + strTmp;
    }
    strTmp = "";
    strEmail = strEmail + "@";
    for (var j=0;j<8;j++) {
        strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + ".com"
    return strEmail;
}

export const generateName = ():string => {
    var strValues="abcdefghijklmnop";
    var strEmail = "";
    for (var i=0;i<10;i++)
        strEmail = strEmail + strValues.charAt(Math.round(strValues.length*Math.random()));;
    return strEmail;
}


