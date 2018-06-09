
let header = new Headers({
    'Access-Control-Allow-Origin' : '',
    'Accept' : 'application/json',
    'Content-Type' : 'multipart/form-data'
});

function timeout(ms,promise) {
    return new Promise(function(resolve,reject) {
        setTimeout(function() {
            reject(new Error("Connection timeout"))
        },ms);

        promise.then(resolve,reject);
    });
}

var myConnection = {

    now: async function(myRequest,params) {
        //return "ok"
        console.log("now funct" + URL);
        var formData = new FormData();
        for (var k in params) {
            formData.append(k,params[k]);
        }

        return timeout(10000,fetch(URL, {
            method: 'POST',
            mode: 'no-cars',
            header: header,
            body: formData
        })).then(
            (response) => response.json()

        ).then((res) => {
            // result data
            return res;
        }).catch((error) =>  {
            console.error(error);

        }).done();

    }

};

module.exports = myConnection;
