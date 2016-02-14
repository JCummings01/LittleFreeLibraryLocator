'use strict'
angular.module('Little Free Library Locator', ['ionic', 'ngCordova', 'firebase'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      }
      if (window.StatusBar) {
        StatusBar.styleDefault()
      }
    })
  })

  .controller('MapCtrl', function ($scope, $state, $cordovaGeolocation, $ionicSideMenuDelegate, $ionicScrollDelegate, $ionicNavBarDelegate, $ionicLoading, $ionicPlatform) {
    $scope.states = [
      {name: 'Alabama', value: '',},
      {name: 'Alaska', value: ''},
      {name: 'Arizona', value: ''},
      {name: 'Arkansas', value: ''},
      {name: 'California', value: ''},
      {name: 'Colorado', value: ''},
      {name: 'Connecticut', value: ''},
      {name: 'Delaware', value: ''},
      {name: 'Florida', value: ''},
      {name: 'Georgia', value: ''},
      {name: 'Hawaii', value: ''},
      {name: 'Idaho', value: ''},
      {name: 'Illinois', value: ''},
      {name: 'Indiana', value: ''},
      {name: 'Iowa', value: ''},
      {name: 'Kansas', value: ''},
      {name: 'Kentucky', value: ''},
      {name: 'Louisiana', value: ''},
      {name: 'Maine', value: ''},
      {name: 'Maryland', value: ''},
      {name: 'Massachusetts', value: ''},
      {name: 'Michigan', value: ''},
      {name: 'Minnesota', value: ''},
      {name: 'Mississippi', value: ''},
      {name: 'Missouri', value: ''},
      {name: 'Montana', value: ''},
      {name: 'Nebraska', value: ''},
      {name: 'Nevada', value: ''},
      {name: 'New Hampshire', value: ''},
      {name: 'New Jersey', value: ''},
      {name: 'New Mexico', value: ''},
      {name: 'New York', value: ''},
      {name: 'North Carolina', value: ''},
      {name: 'North Dakota', value: ''},
      {name: 'Ohio', value: ''},
      {name: 'Oklahoma', value: ''},
      {name: 'Oregon', value: ''},
      {name: 'Pennsylvania', value: ''},
      {name: 'Rhode Island', value: ''},
      {name: 'South Carolina', value: ''},
      {name: 'South Dakota', value: ''},
      {name: 'Tennessee', value: ''},
      {name: 'Texas', value: ''},
      {name: 'Utah', value: ''},
      {name: 'Vermont', value: ''},
      {name: 'Virginia', value: ''},
      {name: 'Washington', value: ''},
      {name: 'West Virginia', value: ''},
      {name: 'Wisconsin', value: ''},
      {name: 'Wyoming', value: ''}
    ]

    $scope.toggleLeft = function () {
      $ionicSideMenuDelegate.toggleLeft()
    }

    $ionicPlatform.ready(onDeviceReady)

    function onDeviceReady () {
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple"></ion-spinner><br/>going to space, brb'
      })

      var options = {timeout: 10000, enableHighAccuracy: true}

      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions)
        $ionicLoading.hide()

        google.maps.event.addListenerOnce($scope.map, 'idle', function () {
          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng
          })
          var infoWindow = new google.maps.InfoWindow({
            content: 'Here I am!'
          })

          google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker)
          })
        })

      }, function (error) {
        $ionicLoading.hide()
        console.log('Could not get location')
      })
    }
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('map', {
        url: '/',
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      })

    $urlRouterProvider.otherwise('/')

  })
