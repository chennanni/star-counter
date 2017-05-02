//hostname: api.likebtn.com
//url: /api/?action=stat&email=maxstackpush@gmail.com&api_key=a5bccc56de1dc7a80cae2251702c8904&site_id=59016250943ec98a2bb37043&output=json
//https://api.likebtn.com/api/?action=stat&email=maxstackpush@gmail.com&api_key=a5bccc56de1dc7a80cae2251702c8904&site_id=59016250943ec98a2bb37043&output=json

var https = require('https');
var user_url;
var user_callback;

// make https request to likebtn api
// input 1 - url : the query url string
// input 2 - callback : callback function to handle the data returned
function make_request (url, callback) {
    var reqOpts = {
        hostname: 'api.likebtn.com',
        path: url,
        headers: {'User-Agent': 'LikeBtn StarCounter'},
        //auth: opts.auth || undefined
    }
    https.request(reqOpts, function (res) {
        var body = ''
        res
            .on('data', function (buf) {
                body += buf.toString()
            })
            .on('end', function () {
                callback(JSON.parse(body));
            })
    }).end()
}

// fetch the details with page number
// input 1 - res : the returned data in json format
function fetch_with_page_number(res) {
    // make several requests, limits records per page to 100
    var pages = Math.ceil(res.response.total / 2),
        i = pages,
        page_info_array = [];
    while (i--) {
        // * second round request call to details with page number
        var url = user_url + '&page_size=2&page=' + (i + 1);
        make_request(url, process_page);
    }
    // inner function to process each page info
    // 1. get details info page by page
    // 2. when all info are fetched, start to count
    function process_page (res) {
        page_info_array = page_info_array.concat(res);
        pages--;
        if (!pages) process_count(page_info_array);
    }
}

// count the like numbers
function process_count (page_info_array) {
    var total = 0;
    page_info_array.forEach(function(page) {
        var btn_detail_array = page.response.items;
        btn_detail_array.forEach(function(btn_detail) {
            total += btn_detail.likes;
        });
    });
    user_callback(total);
}

// count likebtn stars in total
// input 1 - user: the query url
// input 2 - callback: the callback function to handle the returned data
function count_stars (url, callback) {
    user_url = url;
    user_callback = callback;
    // * first round request call to get the total page number
    make_request(url, fetch_with_page_number);
}

module.exports = {count_stars};