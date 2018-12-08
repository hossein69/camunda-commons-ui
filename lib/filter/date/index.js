'use strict';

var angular = require('camunda-bpm-sdk-js/vendor/angular');
var moment = require('camunda-bpm-sdk-js/vendor/moment');
require('angular-translate');

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

  function convertToJalaaliFormat(format) {
    return format.toUpperCase().includes("L") ? format : 'j' + format;
  }

  this.$get = function() {
    return function(variant) {
      variant = variant || 'normal';
      return convertToJalaaliFormat(variants[variant]);
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

          moment.loadPersian({
            dialect: 'persian-modern'
          });
          var format = moment(date).format(camDateFormat(variant));
          moment.locale('en');
          return format;
        };

      }]);
  }]);

module.exports = filtersModule;
