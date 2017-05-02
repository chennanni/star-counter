// reference: https://github.com/yyx990803/starz/blob/master/starz.js

var https = require('https');
var user_username;
var user_callback;

// make https request to github api to check for stars
// input 1 - url : the query url string
// input 2 - callback : callback function to handle the data returned
function make_request (url, callback) {
    var reqOpts = {
        hostname: 'api.github.com',
        path: url,
        headers: {'User-Agent': 'GitHub StarCounter'},
        //auth: opts.auth || undefined
    }
    https.request(reqOpts, function (res) {
        var body = ''
        res
            .on('data', function (buf) {
                body += buf.toString()
            })
            .on('end', function () {
                //fetch_repos(user, JSON.parse(body), callback);
                callback(JSON.parse(body));
            })
    }).end()
}

// fetch the repos details
// input 1 - res : the user's basic info in json format
function fetch_repos(res) {
    // check if user has public repos and only process public repos
    if (!res.public_repos) {
        console.log(res.message);
        return 0;
    }
    // make several requests, limits records per page to 100
    var pages = Math.ceil(res.public_repos / 100),
        i = pages,
        repos = [];
    while (i--) {
        // * second round request call to get repos' info
        var url = '/users/' + user_username + '/repos?per_page=100&page=' + (i + 1);
        make_request(url, process_repos);
    }
    // inner function to 
    // 1. get repos' info page by page
    // 2. when all repos' info are fetched, start to count
    function process_repos (res) {
        repos = repos.concat(res);
        pages--;
        if (!pages) process_count(repos);
    }
}

// count the like numbers
function process_count (repos) {
    var total = 0;
    repos.filter(function (r) {
        total += r.stargazers_count
    })
    
    //console.log('Total in github-starz.js : ' + total)
    user_callback(total);
}

// count a user's github repos' stars in total
// input 1 - user: the github username
// input 2 - callback: the callback function to handle the returned data
function count_stars (user, callback) {
    user_username = user;
    user_callback = callback;
    // * first round request call to get user's info
    make_request('/users/' + user, fetch_repos);
}

module.exports = {count_stars};