'use strict';

var myApp = angular.module('myApp.controllers', ['fhcloud']);

myApp.controller('MainCtrl',
         function($scope, $q, fhcloud, $http) {
    // $fh.cloud call to controller scope
    $scope.getTasks = function() {
      var username = $scope.username;
      var password = $scope.password;
      var ip = $scope.ip;
      var port = $scope.port;

      $scope.tasks = [];

      //Creating an AngularJS promise as the $fh.cloud function is asynchronous.
      var defer = $q.defer();
      var promise = defer.promise;

      //When the promise has completed, then the notice message can be updated to include result of the $fh.cloud call.
      promise.then(function(response){
        // If successful, display the length  of the string.
        if (response.msg != null && typeof(response.msg) !== 'undefined') {
          $scope.tasks = response.msg.taskSummaryList;
          $scope.noticeMessage  = null;
        } else {
          $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
          $scope.textClassName = "text-danger";
        }
      }, function(err){
        //If the function
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
      });

      // check if userInput is defined
      if (username && password && ip && port) {
        /**
         * Pass the userInput to the module containing the $fh.cloud call.
         *
         * Notice that the defer.resolve and defer.reject functions are passed to the module.
         * One of these functions will be called when the $fh.cloud function has completed successully or encountered
         * an error.
         */
        var url = 'http://' + username + ':' + password + '@' + ip + ':' + port + '/business-central/rest/task/query';
        fhcloud.cloud('tasks', url, defer.resolve, defer.reject);
      }else {
        $scope.noticeMessage  = "Please set your login credentials and Connection";
        $scope.textClassName = "text-danger";
      }
    };

    $scope.test = function(){
      $scope.noticeMessage  = "test";
    }
});
