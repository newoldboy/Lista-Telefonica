angular.module("uiModCtrl", []);

angular.module("uiModCtrl").run(function($templateCache){
    $templateCache.put('"<div class="ui-accordion-title" ng-click="open()">{{title}}</div><div class="ui-accordion-title" ng-show="isOpened" ng-transclude></div>"')
});

//-----------------Accordion-----------------

angular.module("uiModCtrl").directive("uiAccordions", function (){
    return {
        controller: function ($scope, $element, $attrs){
            var accordions = [];

            this.registerAccordion = function (accordion) {
                accordions.push(accordion);
            };
            this.closeAll = function (){
                accordions.forEach(function (accordion){
                    accordion.isOpened =false;
                });
            }
        }
    };
});

//-----------------Accordion-----------------

angular.module("uiModCtrl").directive("uiAccordion", function (){
    return {
        templateUrl: "view/accordion.html",
        transclude: true,
        scope: {
            title: "@"
        },
        require: "^uiAccordions",
        link: function (scope, element,attrs, ctrl){
            ctrl.registerAccordion(scope);
            scope.open = function () {
                ctrl.closeAll();
                scope.isOpened=true;
            };
        }
    };
});

//-----------------Mascara DATA-----------------

angular.module("uiModCtrl").directive("uiDate", function (){
    return {
        require: "ngModel",
        link : function (scope, element, attrs, ctrl) {
            var _formatDate = function (date) {
                date = date.replace(/[^0-9]+/g, "");
                if (date.length > 2){
                    date = date.substring (0,2) + "/" + date.substring(2);
                }
                if (date.length > 5) {
                    date = date.substring(0,5) + "/" + date.substring(5,9);
                }
                
                return date;
            }
            element.bind("keyup", function (){
                ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
                ctrl.$render();
            });
            
        }   
    };
});

//-----------------Alerta de Erro-----------------

angular.module("uiModCtrl").directive("uiAlert", function(){
    return {
        templateUrl: "view/alert.html",
        replace : true,
        restrict: "AE",
        scope: {
            title: "@",
        }
    };
});

