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
        // If the login credentials are bad
       if(response.msg != null && response.statusCode == '401') {
          $scope.noticeMessage  = "Bad login credentials";
          $scope.taskContent = null;
          $scope.tasks = null;
        } else if (response.msg != null && typeof(response.msg) !== 'undefined' && response.statusCode == '200') {
          $scope.noticeMessage  = null;
          $scope.tasks = response.msg.taskSummaryList;
          if($scope.tasks.length == 0){
            $scope.noticeMessage  = 'Tasklist is empty';
          }
          $scope.taskContent = null;
        } else {
          $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
          $scope.taskContent = null;
          $scope.tasks = null;
        }
      }, function(err){
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
        $scope.taskContent = null;
        $scope.tasks = null;
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
        $scope.noticeMessage  = "Please enter your login credentials and valid conection";
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
       var url = 'http://' + username + ':' + password + '@' + ip + ':' + port + '/business-central/rest/task/' + taskId + '/content'
      fhcloud.cloudGet('taskContent', url, defer.resolve, defer.reject);
      }else {
        $scope.noticeMessage  = "Please enter your login credentials and connection";
      }
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
       var completeUrl = 'http://' + username + ':' + password + '@' + ip + ':' + port + '/business-central/rest/task/' + taskId + '/complete';
       fhcloud.cloudGet('completeTask', completeUrl, defer.resolve, defer.reject);
      }else {
        $scope.noticeMessage  = "Please enter your login credentials and connection";
      }
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
         var completeUrl = 'http://' + username + ':' + password + '@' + ip + ':' + port + '/business-central/rest/task/' + taskId + '/start';
         fhcloud.cloudGet('startTask', completeUrl, defer.resolve, defer.reject);
      }else {
        $scope.noticeMessage  = "Please enter your login credentials and connection";
      }
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
         var completeUrl = 'http://' + username + ':' + password + '@' + ip + ':' + port + '/business-central/rest/task/' + taskId + '/claim';
         fhcloud.cloudGet('claimTask', completeUrl, defer.resolve, defer.reject);
      }else {
        $scope.noticeMessage  = "Please enter your login credentials and connection";
      }
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

    $scope.setLoginCookieAndNavigateToTasks = function(){
      // store the credentials in to the mobile device
      window.localStorage.setItem("iot_username", $scope.username);
      window.localStorage.setItem("iot_password", $scope.password);
      window.localStorage.setItem("iot_ip", $scope.ip);
      window.localStorage.setItem("iot_port", $scope.port);
      //$cookies.put('username', $scope.username);
      //$cookies.put('password', $scope.password);
      //$cookies.put('ip', $scope.ip);
      //$cookies.put('port', $scope.port);
      location.href = '#tasks';
    }

    $scope.initCookies = function() {
      if(window.localStorage.getItem("iot_username") !== undefined){
        $scope.username = window.localStorage.getItem("iot_username");
      }
      if(window.localStorage.getItem("iot_password") !== undefined){
        $scope.password = window.localStorage.getItem("iot_password");
      }
      if(window.localStorage.getItem("iot_ip") !== undefined){
        $scope.ip = window.localStorage.getItem("iot_ip");
      }
      if(window.localStorage.getItem("iot_port") !== undefined){
        $scope.port = window.localStorage.getItem("iot_port");
      }
      //$scope.username = $cookies.get('username');
      //$scope.password = $cookies.get('password');
      //$scope.ip = $cookies.get('ip');
      //$scope.port = $cookies.get('port');
    }

    $scope.initTable = function() {
      loadTasks();
    }

    $scope.initVersion = function(){
      $scope.version = '1.1.1';
    }
});
