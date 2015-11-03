/**
 * Post
 * @namespace thinkster.posts.directives
 */
(function () {
  'use strict';

  angular
    .module('projectx.mould.directives')
    .directive('contentEditable', contentEditable);

    angular
    .module('projectx.mould.directives')
    .directive('stDateRange', stDateRange);

  /**
   * @namespace Post
   */
 function contentEditable() {
  return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
          // view -> model
          elm.bind('blur', function() {
              scope.$apply(function() {
                  ctrl.$setViewValue(elm.html());
              });
          });

          // model -> view
          ctrl.render = function(value) {
              elm.html(value);
          };

          elm.bind('keydown', function(event) {
              console.log("keydown " + event.which);
              var esc = event.which == 27,
                  el = event.target;

              if (esc) {
                  console.log("esc");
                  ctrl.$setViewValue(elm.html());
                  el.blur();
                  event.preventDefault();
              }

          });
        }
      }
  };

 function stDateRange() {
      return {
          restrict: 'E',
          require: '^stTable',
          scope: {
              before: '=',
              after: '='
          },
          templateUrl: '/static/templates/mould/directives/stDateRange.html',

          link: function (scope, element, attr, table) {

              var inputs = element.find('input');
              var inputBefore = angular.element(inputs[0]);
              var inputAfter = angular.element(inputs[1]);
              var predicateName = attr.predicate;


              [inputBefore, inputAfter].forEach(function (input) {

                  input.bind('blur', function () {


                      var query = {};

                      if (!scope.isBeforeOpen && !scope.isAfterOpen) {

                          if (scope.before) {
                              query.before = scope.before;
                          }

                          if (scope.after) {
                              query.after = scope.after;
                          }

                          scope.$apply(function () {
                              table.search(query, predicateName);
                          })
                      }
                  });
              });

              function open(before) {
                  return function ($event) {
                      $event.preventDefault();
                      $event.stopPropagation();

                      if (before) {
                          scope.isBeforeOpen = true;
                      } else {
                          scope.isAfterOpen = true;
                      }
                  }
              }

              scope.openBefore = open(true);
              scope.openAfter = open();
          }
      }
    };
})();
