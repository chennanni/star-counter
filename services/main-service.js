var github_starz_service = require('../services/github-starz.js');
var likebtn_starz_service = require('../services/likebtn-starz.js');
var stackoverflow_api_service = require('../services/stackoverflow-reputation.js');
var import_data = require('../data.js');

var github_username = import_data.github_username;
var likebtn_url = '/api/?action=stat&email='+import_data.likebtn_email+'&api_key='+import_data.likebtn_api_key+'&site_id='+import_data.likebtn_site_id+'&output=json';
var stackoverflow_user_id = import_data.stackoverflow_user_id;

module.exports = {
  countGithubLikes: function(callback) {
    github_starz_service.count_stars(github_username, function(data) {
      callback(data);
    });
  },
  
  countBlogLikes: function(callback) {
    likebtn_starz_service.count_stars(likebtn_url, function(data) {
      callback(data);
    });
  },
  
  countStackOverflowReputations: function(callback) {
    stackoverflow_api_service.get_reputation(stackoverflow_user_id, function(data) {
      callback(data);
    });
  }
};