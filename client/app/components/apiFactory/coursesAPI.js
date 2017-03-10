(function() {
  'use strict';

  angular
    .module('app')
    .factory('coursesAPI', coursesAPI);

    coursesAPI.$inject = ['$http'];

    function coursesAPI($http) {
      return {
        createScrapeCourse: createScrapeCourse,
        getAllCourses: getAllCourses
      }

    function getAllCourses(){
      return $http.get('/api/courses/getAllCourses', {
        cache: true
      })
    }

      function createScrapeCourse(course){
        return $http.post('/api/courses/scrapeUpload', course);
      }
    }
})();