'use strict';

var angular = require('camunda-bpm-sdk-js/vendor/angular');
var moment = require('moment-jalaali');
require('angular-translate');

moment.loadPersian({
  dialect: 'persian-modern',
  usePersianDigits: true
});

var filtersModule = angular.module('cam.commons.filter.date', [
  'pascalprecht.translate'
]);



filtersModule.provider('camDateFormat', function() {
  var variants = {
    normal: 'LLL',
    short: 'LL',
    long: 'LLL'
  };

  this.setDateFormat = function(newFormat, variant) {
    variant = variant || 'normal';
    variants[variant] = newFormat;
  };

  this.$get = function() {
    return function(variant) {
      variant = variant || 'normal';
      return variants[variant];
    };
  };
});



filtersModule.config([
  '$filterProvider',
  function(
    $filterProvider
  ) {

    $filterProvider.register('camDate', [
      '$translate',
      'camDateFormat',
      function(
      $translate,
      camDateFormat
    ) {

        return function(date, variant) {
          if (!date) {
            return '';
          }
          console.log('given variant', variant);
          return moment(date).format(camDateFormat(variant));
        };

      }]);
  }]);

module.exports = filtersModule;
