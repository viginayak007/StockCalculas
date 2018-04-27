var app = angular.module('myApp', []);
app.controller('productsCtrl', function ($scope, $http) {
    $scope.data;
    $scope.dataToReaload;//to realod the data
    $scope.message = "";
    $scope.minMRP = 0;
    // $scope.totalBudgetAmt = 0;

    $http.get("data.json").then(function (response) {
        $scope.data = response.data.products;
        $scope.dataToReaload = response.data.products;
        $scope.minMRP = $scope.data[0].mrp;
    });

    $scope.totalMRP = function(){
        var totalAmt = 0;
        angular.forEach($scope.data, function (value, key) {
            totalAmt += parseFloat(value.mrp);
        });
        $scope.message = "Entered amount must be greater the " + totalAmt;
        return totalAmt;
    }

    $scope.changedAmt = function (budgetAmt) {
        if (isNaN(budgetAmt)) {
            alert("Enter the Amount in numbers");
            $scope.budgetAmt = "";
        } else {
            if ($scope.totalMRP() > (parseFloat(budgetAmt))) {
                $scope.message = "Entered amount must be greater the ";
            } else {
                $scope.message = ""
                var balAmt = budgetAmt - $scope.totalMRP();
                $scope.calQty(balAmt);
            }
        }
    }


    $scope.calQty = function(balAmt){
        angular.forEach($scope.data, function (value, key) {
            if (parseFloat(value.mrp) < parseFloat($scope.minMRP) ) {
                $scope.minMRP = value.mrp;
            }
            if (parseFloat(value.mrp) <= balAmt) {
                value.qty++;
                balAmt -= value.mrp;
            } else {
                if (balAmt == 0 || $scope.minMRP >= balAmt ) {
                    return;
                }
            }
        });
        if ($scope.minMRP <= balAmt){
            $scope.calQty(balAmt);
        }
    }
   
});