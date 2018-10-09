var app = angular.module("studentOrganizer", []);

app.controller("myCtrl", function($scope) {
  $scope.students = [
    {
      name: "Alec",
      studentNumber: 14295160,
      address: "123 Rollins st",
      phoneNumber: 1234567890,
      gpa: 4.0,
      plan: "IT",
      year: "Senior"
    }
  ];

  var array = JSON.parse(localStorage.getItem("Students") || []);

  $scope.addStudent = function() {
    $scope.errortext = "";
    if (!$scope.student) {
      return;
    }
    if ($scope.students.indexOf($scope.student) == -1) {
      $scope.students.push($scope.student);
      localStorage.setItem("Students", JSON.stringify($scope.students));
    } else {
      $scope.errortext = "This student is already in your organizer.";
    }

    $scope.student = null;
  };
  $scope.removeItem = function(x) {
    $scope.errortext = "";
    $scope.students.splice(x, 1);
  };
});
