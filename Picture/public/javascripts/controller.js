var app = angular.module('gallery', ['ngRoute']).run(function($rootScope, $http) {
    $http.get('auth/confirm-login')
        .success(function(user) {
            if (user) {
                $rootScope.current_user_name = user.fullName;
                $rootScope.authenticated = true;
                $rootScope.current_user = user.username;
                $rootScope.current_user_email = user.email;
            }
        });
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    $rootScope.current_user_name = '';
    $rootScope.current_user_email = '';
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'mainController',
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'mainController'
        })
        .when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'mainController'
        })
        .when('/newGallery', {
            templateUrl: 'partials/newGallery.html',
            controller: 'mainController'
        })
        .when('/gallery/:id/:name/:admin', {
            templateUrl: 'partials/gallery.html',
            controller: 'mainController'
        })
        .otherwise({
            templateUrl: 'partials/main.html',
            controller: 'mainController'
        })
});


app.controller('mainController', function($scope, $http, $rootScope, $routeParams, $location) {

    $scope.login = function() {
        $http.post('/auth/login', $scope.user).success(function(data) {
            if (data.state == 'success') {
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $rootScope.current_user_email = data.user.email;
                $rootScope.current_user_name = data.user.fullName;
                $location.path('/');
            } else {
                alert(data.message)
                $scope.user = {}
            }
        });
    };

    $scope.register = function() {
        $http.post('/auth/signup', $scope.user).success(function(data) {
            if (data.state == 'success') {
                alert("Registration Successfull!")
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $rootScope.current_user_name = data.user.fullName;
                $location.path('/');
            } else {
                $scope.error_message = data.message;
            }
        });
    };

    $scope.createGallery = function() {
        if (!$scope.galleryName) {
            alert("Please enter a name for your gallery.")
        } else {
            $scope.data = {
                "galleryName": $scope.galleryName,
                "galleryAdmin": $rootScope.current_user_name
            }
            console.log($rootScope.current_user_name)
            console.log($scope.data)
            $http.post('api/gallery', $scope.data).then(function(response) {
                alert("Gallery has been created.")
                delete $scope.galleryName;
            })
        }
    }

    $scope.getGalleries = function() {
        $http.get('api/gallery').then(function(response) {
            $scope.allGalleries = response.data;
            console.log($scope.allGalleries)
        })
    }
    $scope.getGalleries()

    $scope.getImages = function() {

    }
    $scope.getImages()

    if ($routeParams.id) {
        $rootScope.currentGallery = $routeParams.name;
        $rootScope.currentAdmin = $routeParams.admin;
        $rootScope.currentGalleryId = $routeParams.id;
        $http.get('api/images/' + $rootScope.currentGalleryId).then(function(response) {
            $scope.allImages = response.data;
            console.log($scope.allImages)
        })
    }
    $scope.openGallery = function(item) {
        $location.path('/gallery/' + item._id + '/' + item.galleryName + '/' + item.galleryAdmin);
    }

    $scope.uploadFile = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = function(e) {
                $rootScope.currentImage = e.target.result;
            }
        }
    }

    $scope.uploadImage = function() {
        if (!$rootScope.currentImage || !$scope.caption) {
            alert('Please select an image and add a caption.')
        } else {
            $scope.imageData = {
                "galleryID": $rootScope.currentGalleryId,
                "imageName": $scope.caption,
                "imageURL": $rootScope.currentImage
            }
            console.log($scope.imageData)
            $http.post('api/images', $scope.imageData).then(function(response) {
                alert('Image upload Successful!');
                delete $scope.allImages
                delete $scope.caption
                delete $rootScope.currentImage
                $http.get('api/images/' + $rootScope.currentGalleryId).then(function(response) {
                    $scope.allImages = response.data;
                    console.log($scope.allImages)
                })
            })
        }
    }

    $scope.deleteImage = function(id) {
        $http.delete('/api/images/' + id).then(function(response) {
            alert("Image deleted.")
            delete $scope.allImages
            $http.get('api/images/' + $rootScope.currentGalleryId).then(function(response) {
                $scope.allImages = response.data;
                console.log($scope.allImages)
            })
        })
    }

    $scope.signout = function() {
        $http.get('auth/signout');
        $rootScope.authenticated = false;
        $rootScope.current_user = '';
        $location.path('/');
    };

});