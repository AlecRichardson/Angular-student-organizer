var app = angular.module("studentOrganizer", []);

app.controller("myCtrl", function ($scope) {
  $scope.students = [];
  $scope.activetotal = 0;
  $scope.inactivetotal = 0;
  var retrievedStudents = 0;

  if (localStorage.getItem("Students")) {
    retrievedStudents = JSON.parse(localStorage.getItem("Students") || []);
  }
  $scope.init = function () {
    for (var i = 0; i < retrievedStudents.length; i++) {
      if (retrievedStudents[i].activity === "Active") {
        $scope.activetotal++;
      } else {
        $scope.inactivetotal++;
      }
      $scope.students.push(retrievedStudents[i]);
    }
  };

  $scope.addStudent = function () {
    var pattern = /^[a-zA-Z\s]+$/;

    if (!$scope.student || !$scope.student.name || !$scope.student.address || !$scope.student.studentNumber || !$scope.student.phoneNumber || !$scope.student.plan || !$scope.student.year) {
      $scope.errortext = 'All fields are required';
      return;
    }


    $scope.errortext = "";
    if (!pattern.test($scope.student.name)) {
      console.log("test");
      $scope.errortext = "Name field only accepts letters.";
      return;
    } else if (!pattern.test($scope.student.plan)) {
      $scope.errortext = "Academic plan field only accepts letters.";
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
  $scope.removeItem = function (x) {
    $scope.errortext = "";
    if ($scope.students[x].activity === "Active") {
      $scope.activetotal--;
    } else {
      $scope.inactivetotal--;
    }
    $scope.students.splice(x, 1);
    localStorage.setItem("Students", JSON.stringify($scope.students));
  };

  $scope.toggleActive = function (obj, data) {
    var i = $scope.students.indexOf(obj);

    if ($scope.students[i].activity === data) {
      return;
    }

    if (data === "Active") {
      $scope.students[i].activity = "Active";
      $scope.inactivetotal--;
      $scope.activetotal++;
    } else {
      $scope.students[i].activity = "Inactive";
      $scope.inactivetotal++;
      $scope.activetotal--;
    }

    localStorage.setItem("Students", JSON.stringify($scope.students));
  };
});
