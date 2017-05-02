// NOTICE: Without a key you can make 300 requests per day, with a key you can make 10,000 requests per day.

var https = require('https');
var zlib = require('zlib');
var user_id;
var user_callback;

// make https request to stack overflow api
// input 1 - id : the user id
// input 2 - callback : callback function to handle the data returned
function make_request (id, callback) {
    https.get('https://api.stackexchange.com/2.2/users/3707965?order=desc&sort=reputation&site=stackoverflow', (res) => {
        
        //console.log('statusCode:', res.statusCode);
        //console.log('headers:', res.headers);
        
        res.on('data', (d) => {
            zlib.unzip(d, (err, decompressed_buf) => {
                if (!err) {
                    callback(JSON.parse(decompressed_buf.toString()));
                }
                else {
                    console.log(err);
                }
            });
        });
    }).on('error', (err) => {
        console.log(err);
    });
}

// process the user's reputation info
// input 1 - res : the returned data in json format
function process_reputation_info(res) {
    //console.log(res);
    console.log('stack overflow quote remaining: '+res.quota_remaining);
    user_callback(res.items[0].reputation);
}

// get the user's reputation
// input 1 - id: the user id
// input 2 - callback: the callback function to handle the returned data
function get_reputation(id, callback) {
    user_id = id;
    user_callback = callback;
    // * first round request call to get the total page number
    make_request(id, process_reputation_info);
}

module.exports = {get_reputation};