var app = angular.module("studentOrganizer", []);

app.controller("myCtrl", function($scope) {
  $scope.students = [];
  $scope.studentsActive = [];
  $scope.studentsInactive = [];
  $scope.activetotal = 0;
  $scope.inactivetotal = 0;
  var retrievedStudents = 0;
  if (localStorage.getItem("Students")) {
    retrievedStudents = JSON.parse(localStorage.getItem("Students") || []);
  }
  $scope.init = function() {
    for (var i = 0; i < retrievedStudents.length; i++) {
      if (retrievedStudents[i].activity === "Active") {
        $scope.activetotal++;
        $scope.studentsActive.push(retrievedStudents[i]);
      } else {
        $scope.inactivetotal++;
        $scope.studentsInactive.push(retrievedStudents[i]);
      }
      $scope.students.push(retrievedStudents[i]);
    }
  };

  $scope.addStudent = function() {
    $scope.errortext = "";
    if (!$scope.student) {
      return;
    }
    if ($scope.students.indexOf($scope.student) == -1) {
      if ($scope.student.activity === true) {
        $scope.student.activity = "Active";
        $scope.activetotal++;
      } else {
        $scope.student.activity = "Inactive";
        $scope.inactivetotal++;
      }
      $scope.students.push($scope.student);
      localStorage.setItem("Students", JSON.stringify($scope.students));
    } else {
      $scope.errortext = "This student is already in your organizer.";
    }

    $scope.student = null;
  };
  $scope.removeItem = function(x) {
    $scope.errortext = "";
    if ($scope.students[x].activity === "Active") {
      $scope.activetotal--;
    } else {
      $scope.inactivetotal--;
    }
    $scope.students.splice(x, 1);
  };

  $scope.toggleActive = function(i, data) {
    if ($scope.students[i].activity === data) {
      return;
    }
    if (data === "Active") {
      $scope.students[i].activity = "Active";
      $scope.inactivetotal--;
      $scope.activetotal++;
      return;
    } else {
      $scope.students[i].activity = "Inactive";
      $scope.inactivetotal++;
      $scope.activetotal--;
      return;
    }
  };
});
