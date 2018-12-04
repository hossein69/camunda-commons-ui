'use strict';

var angular = require('camunda-bpm-sdk-js/vendor/angular');
var moment = require('moment-jalaali');
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
    console.log('given format for convert to jalaali', format);
    switch (format) {
      case 'LL':
        return 'jD jMMMM jYYYY';
      case 'LLL':
        return 'jD jMMMM jYYYY LT';
      case 'LLLL':
        return 'dddd، jD jMMMM jYYYY LT';
      default:
        return 'jD jMMMM jYYYY LT';
    }
  }

  this.$get = function() {
    return function(variant) {
      variant = variant || 'normal';
      var format = variants[variant];
      return convertToJalaaliFormat(format);
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
