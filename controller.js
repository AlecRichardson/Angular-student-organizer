var app = angular.module("studentOrganizer", []);

app.controller("myCtrl", function($scope) {
  $scope.students = [];
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
      } else {
        $scope.inactivetotal++;
      }
      $scope.students.push(retrievedStudents[i]);
    }
  };

  $scope.addStudent = function() {
    var pattern = new RegExp("^[a-zA-Zs]*$");
    if (!pattern.test($scope.student.name)) {
      console.log("test");
      $scope.errortext = "Name field only accepts letters.";
      return;
    } else if (!pattern.test($scope.student.plan)) {
      $scope.errortext = "Academic plan field only accepts letters.";
      return;
    }
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
    localStorage.setItem("Students", JSON.stringify($scope.students));
  };

  $scope.toggleActive = function(obj, data) {
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

app.directive("restrictInput", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attr, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        var options = scope.$eval(attr.restrictInput);
        if (!options.regex && options.type) {
          switch (options.type) {
            case "digitsOnly":
              options.regex = "^[0-9]*$";
              break;
            case "lettersOnly":
              options.regex = "^[a-zA-Z]*$";
              break;
            case "lowercaseLettersOnly":
              options.regex = "^[a-z]*$";
              break;
            case "uppercaseLettersOnly":
              options.regex = "^[A-Z]*$";
              break;
            case "lettersAndDigitsOnly":
              options.regex = "^[a-zA-Z0-9]*$";
              break;
            case "validPhoneCharsOnly":
              options.regex = "^[0-9 ()/-]*$";
              break;
            default:
              options.regex = "";
          }
        }
        var reg = new RegExp(options.regex);
        if (reg.test(viewValue)) {
          return viewValue;
        } else {
          var overrideValue = reg.test(ctrl.$modelValue)
            ? ctrl.$modelValue
            : "";
          element.val(overrideValue);
          return overrideValue;
        }
      });
    }
  };
});
