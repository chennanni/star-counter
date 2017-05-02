var express = require('express');
var async_module = require('async');
var router = express.Router();
var services = require('../services/main-service.js');

var title = "Star Counter";
var github_like_count = 0;
var blog_like_count = 0;
var stackoverflow_reputation_count = 0;

function fetch_data_in_parallel(render_page) {
    async_module.parallel([
        function(callback) {
            services.countGithubLikes(function(data) {
                //console.log('count item 1 in main-router.js: ' + data.toString());
                github_like_count = data;
                callback(null, data);
            });
        },
        function(callback) {
            services.countBlogLikes(function(data) {
                //console.log('count item 2 in main-router.js: ' + data.toString());
                blog_like_count = data;
                callback(null, data);
            });
        },
        function(callback) {
            services.countStackOverflowReputations(function(data) {
                //console.log('count item 3 in main-router.js: ' + data.toString());
                stackoverflow_reputation_count = data;
                callback(null, data);
            });
        },
    ],
    // optional callback
    function(err, results) {
        if (err) console.log('error in fetch_data_in_parallel: ' + err);
        console.log('results in fetch_data_in_parallel: ' + results);
        render_page();
    });
}

// show the index page
router.get(['/', '/index'], function (req, res) {
    fetch_data_in_parallel(function(){
        console.log('rendering page...');
        res.render('index', {title, github_like_count, blog_like_count, stackoverflow_reputation_count});
    });
});

module.exports = router;