'use strict';

var myApp = angular.module('myApp.controllers', ['fhcloud', 'ngCookies']);

myApp.controller('MainCtrl',
         function($scope, $q, fhcloud, $http, $cookies, $window) {
    $scope.getTasks = function getTasks(){
      loadTasks();
    }
    // $fh.cloud call to controller scope
   function loadTasks() {
      var username = $cookies.get('username');
      var password = $cookies.get('password');
      var ip = $cookies.get('ip');
      var port = $cookies.get('port');
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
      var username = $cookies.get('username');
      var password = $cookies.get('password');
      var ip = $cookies.get('ip');
      var port = $cookies.get('port');
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

    $scope.completeTask = function(task){
      var username = $cookies.get('username');
      var password = $cookies.get('password');
      var ip = $cookies.get('ip');
      var port = $cookies.get('port');
      var taskId = task.id;
      //Creating an AngularJS promise as the $fh.cloud function is asynchronous.
      var defer = $q.defer();
      var promise = defer.promise;

      //When the promise has completed, then the notice message can be updated to include result of the $fh.cloud call.
      promise.then(function(response){
        // If successful, display the length  of the string.
        if (response.msg != null && typeof(response.msg) !== 'undefined') {
          // Refresh the table
          loadTasks();
        } else {
          $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
          $scope.textClassName = "text-danger";
        }
      }, function(err){
        //If the function
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
      });
      var completeUrl = 'http://' + username + ':' + password + '@' + ip + ':' + port + '/business-central/rest/task/' + taskId + '/complete';
      fhcloud.cloudGet('completeTask', completeUrl, defer.resolve, defer.reject);
    }

    $scope.startTask = function(task){
      var username = $cookies.get('username');
      var password = $cookies.get('password');
      var ip = $cookies.get('ip');
      var port = $cookies.get('port');
      var taskId = task.id;
      //Creating an AngularJS promise as the $fh.cloud function is asynchronous.
      var defer = $q.defer();
      var promise = defer.promise;

      //When the promise has completed, then the notice message can be updated to include result of the $fh.cloud call.
      promise.then(function(response){
        // If successful, display the length  of the string.
        if (response.msg != null && typeof(response.msg) !== 'undefined') {
          // Refresh the table
          loadTasks();
        } else {
          $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
          $scope.textClassName = "text-danger";
        }
      }, function(err){
        //If the function
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
      });
      var completeUrl = 'http://' + username + ':' + password + '@' + ip + ':' + port + '/business-central/rest/task/' + taskId + '/start';
      fhcloud.cloudGet('startTask', completeUrl, defer.resolve, defer.reject);
    }

    $scope.claimTask = function(task){
      var username = $cookies.get('username');
      var password = $cookies.get('password');
      var ip = $cookies.get('ip');
      var port = $cookies.get('port');
      var taskId = task.id;
      //Creating an AngularJS promise as the $fh.cloud function is asynchronous.
      var defer = $q.defer();
      var promise = defer.promise;

      //When the promise has completed, then the notice message can be updated to include result of the $fh.cloud call.
      promise.then(function(response){
        // If successful, display the length  of the string.
        if (response.msg != null && typeof(response.msg) !== 'undefined') {
          // Refresh the table
          loadTasks();
        } else {
          $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
          $scope.textClassName = "text-danger";
        }
      }, function(err){
        //If the function
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
      });
      var completeUrl = 'http://' + username + ':' + password + '@' + ip + ':' + port + '/business-central/rest/task/' + taskId + '/claim';
      fhcloud.cloudGet('claimTask', completeUrl, defer.resolve, defer.reject);
    }

    $scope.statusIsReserved = function(task){
      if (task.status == 'Reserved') {
        return true;
      }
      return false;
      };

    $scope.statusIsInProgress = function(task){
      if (task.status == 'InProgress') {
        return true;
      }
      return false;
      };

      $scope.statusIsReady = function(task){
      if (task.status == 'Ready') {
        return true;
      }
      return false;
      };

    $scope.setLoginCookie = function(){
      // Setting a cookie
      $cookies.put('username', $scope.username);
      $cookies.put('password', $scope.password);
      $cookies.put('ip', $scope.ip);
      $cookies.put('port', $scope.port);
    }

    $scope.initCookies = function() {
      $scope.username = $cookies.get('username');
      $scope.password = $cookies.get('password');
      $scope.ip = $cookies.get('ip');
      $scope.port = $cookies.get('port');
    }

    $scope.initTable = function() {
      loadTasks();
    }
});
