(function () {
  'use strict';

  angular
    .module('projectx.mould.filters')
    .filter('unique', unique);

  /**
   * @namespace Posts
   */
  function unique() {
   return function (arr, field) {
    if(arr){
        var o = {}, i, l = arr.length, r = [];
        for(i=0; i<l;i+=1) {
            o[arr[i][field]] = arr[i];
        }
        for(i in o) {
            r.push(o[i]);
        }
        return r;
      };
    }
  }
})();