
//var log4js = require('log4js');
//var logger = log4js.getLogger();
//logger.level = 'info';

//
// Stats pack
//
var sk = require("statkit/statkit.js");

module.exports = {


    checkGlobalChanges: function(state,props,callback) {
            var changeFlag = false;
            console.log("OLD STATE ENV:" + state.OLD_ENV);
            console.log("OLD STATE BUSINESSDATE:" + state.OLD_BUSINESSDATE);
            console.log("NEW STATE ENV:" + state.NEW_ENV);
            console.log("NEW STATE BUSINESSDATE:" + state.NEW_BUSINESSDATE);
            console.log("prop STATE ENV:" + props.env);
            console.log("prop STATE BUSINESSDATE:" + props.date.slice(0,10).replace(/-/g,""));
            var currDate = props.date.slice(0,10).replace(/-/g,"");
            var currEnv = props.env;
            if ( ( currDate != state.NEW_BUSINESSDATE ) || ( currEnv !=  state.NEW_ENV ) ) {
                changeFlag = true;
                console.log("Change global" + currDate + "..." + state.NEW_BUSINESSDATE + "...");
                console.log("Change global" + currEnv + "..." + state.NEW_ENV + "...");
            };
            if ( ( state.OLD_BUSINESSDATE != state.NEW_BUSINESSDATE ) || ( state.OLD_ENV !=  state.NEW_ENV ) ) {
                changeFlag = true;
                console.log("Change...global old and new");
            };

            callback(changeFlag);
    },

    updateJsonPerctMargin: function(jsonObj,id,value) {
        for (var i = 0; i < jsonObj.length; i++) {
            if (jsonObj[i].id === id) {
                jsonObj[i].perctmargin = value;
                console.log("update:"+jsonObj[i].perctmargin);
                return;
                //return jsonObj;
            }

        }
    },


    calMargin: function(prob,stdDev) {

        //0.4305
        //var prob = 0.4305;
        // add 20.53198069
        //var stdDev = 20.5319806;
        var netProb = Math.round(sk.norminv(prob) * stdDev);
        return netProb;
    },

    calBaseProb: function(json) {
        var noStr = "";
        var totWtdAvg = 0;
        //debugger;
        for (var no = 1; no <= 15; no++) {
            noStr = no.toString();
            var wtdAvg = json[no] * 0.9;
            totWtdAvg = totWtdAvg + wtdAvg;

        };

        for (var no = 16; no <= 23; no++) {
            noStr = no.toString();
            var wtdAvg = json[no] * 0.1875;
            totWtdAvg = totWtdAvg + wtdAvg;

        };

        totWtdAvg =( totWtdAvg / 15);
        return totWtdAvg;
    },

    calBaseProbPlayer: function(json) {
        var noStr = "";
        var totWtdAvg = 0;
        //debugger;
        for (var no = 0; no < 15; no++) {

            var wtdAvg = parseFloat(json[no].ExpNettPerf)/100 * 0.9;
            totWtdAvg = totWtdAvg + wtdAvg;

        };

        for (var no = 15; no < 23; no++) {

            var wtdAvg = parseFloat(json[no].ExpNettPerf)/100 * 0.1875;
            totWtdAvg = totWtdAvg + wtdAvg;

        };

        totWtdAvg =( totWtdAvg / 15);
        return totWtdAvg;
    }

}
