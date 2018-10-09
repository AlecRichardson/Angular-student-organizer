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
  $scope.addStudent = function() {
    $scope.errortext = "";
    if (!$scope.student) {
      console.log("no student in scope");
      return;
    }
    if ($scope.students.indexOf($scope.student) == -1) {
      console.log($scope.students.indexOf($scope.student));
      localStorage.setItem(JSON.stringify($scope.student));
      $scope.students.push($scope.student);
      var retrievedStudent = localStorage.getItem("Student");
      console.log(retrievedStudent);
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
