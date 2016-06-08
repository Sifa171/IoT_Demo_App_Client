angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicLoading) {

    // Show loading...
    $scope.show = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
    };

    // Hide loading...
    $scope.hide = function(){
      $ionicLoading.hide();
    };
})

.controller('AccountCtrl', function($scope, $ionicLoading) {
  var message = '';
  // Show loading...
  $scope.show = function() {
    $ionicLoading.show({
      template: '<div class="ion-checkmark">&nbsp;'+message+'</div>',
      duration: 1000
    });
  };

  // Hide loading...
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.settings = {
    enablePush: true
  };

  $scope.login = {
  }

  $scope.setLoginCredentials = function(){
        message = 'Success';
        $scope.show();
        // store the credentials to the mobile device
        window.localStorage.setItem("bpm_username", $scope.login.username);
        window.localStorage.setItem("bpm_password", $scope.login.password);
        window.localStorage.setItem("bpm_ip", $scope.login.ip);
        window.localStorage.setItem("bpm_port", $scope.login.port);
  };

  $scope.initCredentials = function() {
      if(window.localStorage.getItem("bpm_username") != undefined){
        $scope.login.username = window.localStorage.getItem("bpm_username");
      }
      if(window.localStorage.getItem("bpm_password") != undefined){
        $scope.login.password = window.localStorage.getItem("bpm_password");
      }
      if(window.localStorage.getItem("bpm_ip") != undefined){
        $scope.login.ip = window.localStorage.getItem("bpm_ip");
      }
      if(window.localStorage.getItem("bpm_port") != undefined){
        $scope.login.port = window.localStorage.getItem("bpm_port");
      }
    };
})

.controller('TasksCtrl', function($scope, $ionicLoading) {
  // Show loading...
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };

  // Hide loading...
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.listCanSwipe = true;
  $scope.tasks = [];
  $scope.loadTasks = function(){
    $scope.show();
    allTasks();
  }

  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  function allTasks(){
      $fh.cloud({
        "path": "/bpm/loadTasks",
        "method": "POST",
        "contentType": "application/json",
        "data": {
          "params": {
            "username": window.localStorage.getItem("bpm_username"),
            "password": window.localStorage.getItem("bpm_password"),
            "ip": window.localStorage.getItem("bpm_ip"),
            "port": window.localStorage.getItem("bpm_port")
          }
        }
      }, function(res) {
        if(res.code == 'ECONNREFUSED'){
          $scope.noticeMessage = 'Connection to mBaaS refused';
          $scope.tasks = null;
          $scope.hide();
        }else if(res == 'Unauthorized'){
          $scope.noticeMessage = 'Authentication Error';
          $scope.tasks = null;
          $scope.hide();
        }else{
          $scope.noticeMessage = null;
          $scope.tasks = res.taskSummaryList;
          if(res.taskSummaryList != undefined){
            if(res.taskSummaryList.length == 0){
              $scope.noticeMessage  = 'Tasklist is empty';
            }else{
              for (i = 0; i < res.taskSummaryList.length; i++) {
                if(isBlank(res.taskSummaryList[i].actualOwnerId))
                res.taskSummaryList[i].actualOwnerId = 'Ownerless';
              }
              $scope.tasks = res.taskSummaryList;
            }
          }else{
            $scope.noticeMessage  = 'Tasklist is undefined';
          }
          $scope.hide();
        }
      }, function(msg,err) {
        $scope.tasks = null;
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
        // Clear loading
        $scope.hide();
      });
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');

  };

  $scope.claimTask = function(task){
      $scope.show();
      $fh.cloud({
        "path": "/bpm/claimTask",
        "method": "POST",
        "contentType": "application/json",
        "data": {
          "params": {
            "username": window.localStorage.getItem("bpm_username"),
            "password": window.localStorage.getItem("bpm_password"),
            "ip": window.localStorage.getItem("bpm_ip"),
            "port": window.localStorage.getItem("bpm_port"),
          },
          "taskId": task.id
        }
      }, function(res) {
        if(res.code == 'ECONNREFUSED'){
          $scope.noticeMessage = 'Connection to mBaaS refused';
          $scope.tasks = null;
          $scope.hide();
        }else if(res == 'Unauthorized'){
          $scope.noticeMessage = 'Authentication Error';
          $scope.tasks = null;
          $scope.hide();
        }else{
          allTasks();
        }
      }, function(msg,err) {
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
        $scope.tasks = null;
        // Clear loading
        $scope.hide();
      });
  };

  $scope.startTask = function(task){
      $scope.show();
      $fh.cloud({
        "path": "/bpm/startTask",
        "method": "POST",
        "contentType": "application/json",
        "data": {
          "params": {
            "username": window.localStorage.getItem("bpm_username"),
            "password": window.localStorage.getItem("bpm_password"),
            "ip": window.localStorage.getItem("bpm_ip"),
            "port": window.localStorage.getItem("bpm_port"),
          },
          "taskId": task.id
        }
      }, function(res) {
        if(res.code == 'ECONNREFUSED'){
          $scope.noticeMessage = 'Connection to mBaaS refused';
          $scope.tasks = null;
          $scope.hide();
        }else if(res == 'Unauthorized'){
          $scope.noticeMessage = 'Authentication Error';
          $scope.tasks = null;
          $scope.hide();
        }else{
          allTasks();
        }
      }, function(msg,err) {
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
        $scope.tasks = null;
        // Clear loading
        $scope.hide();
      });
  };

  $scope.releaseTask = function(task){
      $scope.show();
      $fh.cloud({
        "path": "/bpm/releaseTask",
        "method": "POST",
        "contentType": "application/json",
        "data": {
          "params": {
            "username": window.localStorage.getItem("bpm_username"),
            "password": window.localStorage.getItem("bpm_password"),
            "ip": window.localStorage.getItem("bpm_ip"),
            "port": window.localStorage.getItem("bpm_port"),
          },
          "taskId": task.id
        }
      }, function(res) {
        if(res.code == 'ECONNREFUSED'){
          $scope.noticeMessage = 'Connection to mBaaS refused';
          $scope.tasks = null;
          $scope.hide();
        }else if(res == 'Unauthorized'){
          $scope.noticeMessage = 'Authentication Error';
          $scope.tasks = null;
          $scope.hide();
        }else{
          allTasks();
        }
      }, function(msg,err) {
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
        $scope.tasks = null;
        // Clear loading
        $scope.hide();
      });
  };

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
})

.controller('TaskDetailCtrl', function($scope, $stateParams, $ionicLoading) {
  $scope.readOnly = 'readonly';

  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };

  // Hide loading...
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  function showSuccessMessage() {
    $ionicLoading.show({
      template: '<div class="ion-checkmark">&nbsp; Success</div>',
      duration: 1000
    });
    //Reloading the Task-Tab
    location.href = '#/tab/tasks';
    window.location.reload(true);
  };

  $scope.getTaskContent = function(){
    $scope.show();
    loadTaskContent();
  }

  function loadTaskContent(){
    $fh.cloud({
      "path": "/bpm/loadTaskContent",
      "method": "POST",
      "contentType": "application/json",
      "data": {
        "params": {
          "username": window.localStorage.getItem("bpm_username"),
          "password": window.localStorage.getItem("bpm_password"),
          "ip": window.localStorage.getItem("bpm_ip"),
          "port": window.localStorage.getItem("bpm_port"),
        },
        "taskId": $stateParams.taskId
      },
      "timeout": 25000
    }, function(res) {
      if(res.code == 'ECONNREFUSED'){
        $scope.noticeMessage = 'Connection to mBaaS refused';
        $scope.taskContent = null;
        $scope.hide();
      }else if(res == 'Unauthorized'){
        $scope.noticeMessage = 'Authentication Error';
        $scope.taskContent = null;
        $scope.hide();
      }else{
        $scope.noticeMessage = null;
        $scope.taskContent = res.contentMap;
        $scope.hide();
      }
    }, function(msg,err) {
      $scope.taskContent = null;
      $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
      $scope.hide();
    });
    // Stop the ion-refresher from spinning
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.completeTask = function(){
      $scope.show();
      $fh.cloud({
        "path": "/bpm/completeTask",
        "method": "POST",
        "contentType": "application/json",
        "data": {
          "params": {
            "username": window.localStorage.getItem("bpm_username"),
            "password": window.localStorage.getItem("bpm_password"),
            "ip": window.localStorage.getItem("bpm_ip"),
            "port": window.localStorage.getItem("bpm_port"),
          },
          "taskId": $stateParams.taskId
        }
      }, function(res) {
        if(res.code == 'ECONNREFUSED'){
          $scope.noticeMessage = 'Connection to mBaaS refused';
          $scope.taskContent = null;
          $scope.hide();
        }else if(res == 'Unauthorized'){
          $scope.noticeMessage = 'Authentication Error';
          $scope.taskContent = null;
          $scope.hide();
        }else{
          $scope.hide();
          showSuccessMessage();
        }
      }, function(msg,err) {
        $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
        $scope.taskContent = null;
        // Clear loading
        $scope.hide();
      });
  };

  $scope.statusIsInProgress = function(){
      if ($stateParams.status == 'InProgress') {
        return true;
      }
      return false;
  };

  $scope.statusIsReserved = function(){
        if ($stateParams.status == 'Reserved') {
          return true;
        }
        return false;
  };
})
