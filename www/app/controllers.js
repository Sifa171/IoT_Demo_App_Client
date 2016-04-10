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
          $scope.taskContent = null;
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
        fhcloud.cloudGet('tasks', url, defer.resolve, defer.reject);
      }else {
        $scope.noticeMessage  = "Please set your login credentials and Connection";
        $scope.textClassName = "text-danger";
      }
    };

    $scope.getTaskContent = function(task){
      var username = $scope.username;
      var password = $scope.password;
      var ip = $scope.ip;
      var port = $scope.port;
      var taskId = task.id;
      //Creating an AngularJS promise as the $fh.cloud function is asynchronous.
      var defer = $q.defer();
      var promise = defer.promise;

      //When the promise has completed, then the notice message can be updated to include result of the $fh.cloud call.
      promise.then(function(response){
        // If successful, display the length  of the string.
        if (response.msg != null && typeof(response.msg) !== 'undefined') {
          $scope.taskContent = response.msg.contentMap;
          $scope.noticeMessage  = null;
          $scope.taskId = taskId;
        } else {
          $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
          $scope.textClassName = "text-danger";
        }
      }, function(err){
        //If the function
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
      });

      var url = 'http://' + username + ':' + password + '@' + ip + ':' + port + '/business-central/rest/task/' + taskId + '/content';
      fhcloud.cloudGet('taskContent', url, defer.resolve, defer.reject);
    }

    $scope.completeTask = function(){
      var username = $scope.username;
      var password = $scope.password;
      var ip = $scope.ip;
      var port = $scope.port;
      var taskId = $scope.taskId;
      //Creating an AngularJS promise as the $fh.cloud function is asynchronous.
      var defer = $q.defer();
      var promise = defer.promise;
      var defer2 = $q.defer();
      var promise2 = defer.promise;
      var taskStarted = false;

      //When the promise has completed, then the notice message can be updated to include result of the $fh.cloud call.
      promise.then(function(response){
        // If successful, display the length  of the string.
        if (response.msg != null && typeof(response.msg) !== 'undefined') {
            var completeUrl = 'http://' + username + ':' + password + '@' + ip + ':' + port + '/business-central/rest/task/' + taskId + '/complete';
            fhcloud.cloudGet('completeTask', completeUrl, defer2.resolve, defer2.reject);
        } else {
          $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
          $scope.textClassName = "text-danger";
        }
      }, function(err){
        //If the function
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
      });
      var startUrl = 'http://' + username + ':' + password + '@' + ip + ':' + port + '/business-central/rest/task/' + taskId + '/start';
      fhcloud.cloudGet('startTask', startUrl, defer.resolve, defer.reject);

      promise2.then(function(response){
        // If successful, display the length  of the string.
        if (response.msg != null && typeof(response.msg) !== 'undefined') {
          $scope.tasks = null;
          $scope.noticeMessage  = null;
          $scope.taskContent = null;
        } else {
          $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
          $scope.textClassName = "text-danger";
        }
      }, function(err){
        //If the function
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
      });
    }
});
