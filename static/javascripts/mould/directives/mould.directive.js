/**
 * Post
 * @namespace thinkster.posts.directives
 */
(function () {
  'use strict';

  angular
    .module('projectx.mould.directives')
    .directive('contentEditable', contentEditable);

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
  };
}
})();
