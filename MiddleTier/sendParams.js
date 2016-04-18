var http = require('http');
var Image = require('./imageModel');

module.exports = {

    //Send generatedParameters request to BackEnd
    sendParameters: function(params, res, sv) {
        
        var generateOptions;
        if(sv == 1)
        {
            generateOptions = {
            host: 'localhost',
            path: '/generateSong',
            port: 3001,
            method: 'POST'
            };
        }
        else
        {
            generateOptions = {
            host: 'localhost',
            path: '/generateSongP',
            port: 3001,
            method: 'POST'
            };   
        }
        
     
        var midiResponse = {};


        var req = http.request(generateOptions, function(response) {
            var str = ''
            response.on('data', function(chunk) {
                str += chunk;
            });

            response.on('end', function() {
                console.log("Response from BackEnd:");
                //INSERT CODE TO HANDLE RESPONSE (Will be a song??)
                var response = JSON.parse(str);
                
                    saveReturn(response);
                    if(sv == 1)
                        res.send(JSON.stringify(response));
            });

            response.on('error', function(err) {
                console.log(err);
            });

        });

        req.write(JSON.stringify(params));
        req.end();
    }
};



var saveReturn = function(returnData)
{
    console.log(returnData);
        var key = returnData.imageKey;
        var sp = returnData.songPath;
        var faces = returnData.numberOfFaces;
        var proCo = returnData.prominantColor;
        var songkey = returnData.chosenKey;
        var temp = returnData.chosenTempo;
        var rm = returnData.relativeMinor;
        
     Image.findOne({ 'local.songKey': key }, function (err, img) {
        if (!img) {
            console.log("can't find key");
            return;
        }


        img.local.songPath = sp;
        img.local.numberOfFaces = faces;
        img.local.prominantColor = proCo;
        img.local.chosenKey = songkey;
        img.local.chosenTempo = temp;
        img.local.relativeMinor = rm;

        img.save(function (err) {
            if (err)
                throw err;
            else {

                    return ;
            }
        });
    });

}
