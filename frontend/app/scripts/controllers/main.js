'use strict';

/**
 * @ngdoc function
 * @name twitterAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the twitterAppApp
 */
angular.module('twitterAppApp')
  .controller('MainCtrl', function ($scope, Restangular, TwitterProvider, $firebaseObject) {

        var ref = new Firebase("https://twittersentiment.firebaseio.com/");
        var syncObject = $firebaseObject(ref);
        syncObject.$bindTo($scope, "tweetsData");
      $scope.tweets = {};
      $scope.positiveCount = 0;
      $scope.negativeCount = 0;
      $scope.totalScore = 0;
      $scope.numberOfTweets = 0;
      $scope.averageScore = 0;

        $scope.setSearchText = function(text)
        {
            $scope.searchText = (text);
        };


        $scope.sentiment = null;
        $scope.search = function()
        {
            var searchText = $scope.searchText;

            TwitterProvider.getTweets((searchText)).then(
            function( tweetsData )
            {


            }
        )
            $scope.searchText = encodeURI($scope.searchText);
      }


        $scope.trends = {};
        $scope.getTrends = function(locationId)
        {
            TwitterProvider.getTrends(locationId).then(
                function( trends )
                {
                   $scope.trends = trends;
                    console.log(trends);
                }
            )
        };

        $scope.getSentimentClass = function()
        {
            if(!$scope.searchText)
            return null;
            if(!($scope.tweetsData))
            return null;
            if(!($scope.tweetsData[$scope.searchText]))
            return null;

            if($scope.tweetsData[$scope.searchText])
            var sentiment = $scope.tweetsData[$scope.searchText].overallAnalysis.sentiment;
            if((sentiment == 'Positive') || (sentiment == 'Very Positive'))
            {
                return 'fa text-success fa-5x fa-smile-o'
            }
            else if((sentiment == 'Negative') || (sentiment == 'Very Negative'))
            {
                return 'fa text-danger fa-5x fa-frown-o'
            }
            else
            {
                return 'fa text-warning fa-5x fa-meh-o'
            }
        };

      function init()
      {
            $scope.getTrends(1);
      }

      init();

  });
