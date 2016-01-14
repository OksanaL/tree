'use strict';

/* Directives */

var treeDirectives = angular.module('treeDirectives', []);

treeDirectives.directive('template', ["$compile", function($compile) {
    return {
        restrict: 'EA',
        compile: function(element, attributes) {

            /* initializing directive related variables */
            var templateIsTag = false;
            var templateName = null;
            var templateAttributes = {};

            if (element[0].tagName.toLowerCase() == this.name.toLowerCase()) {
                templateIsTag = true;
            }

            /* template attributes filtering */
            if (templateIsTag) {
                /* case 1: directive usage as a tag - all attributes related */
                for(var attribute in attributes.$attr) {
                    var attr = attribute.replace(/^(data-|x-)/, "").toLowerCase();
                    templateAttributes[attr] = attributes[attribute];

                }
                //console.log(templateAttributes);
            } else {
                /* case 2: directive usage as an attribute - attribute prefix filtering*/
                var templatePrefix = "t-";
                for (var loop=true; loop; loop=!loop) {
                    for(var attribute in  attributes.$attr) {
                        var attr = attribute.replace(/^(data-|x-)/, "").toLowerCase();

                        /* non default prefix specified, we should repeat scan for that case (as attributes order is not strict) */
                        if (attr == "template" && attributes[attribute] != "") {
                            templatePrefix = attributes[attribute];

                            delete attributes.$attr[attribute];
                            element.removeAttr(attribute);

                            loop = false;
                        }

                        /* grabbing template related attributes and removing them from element */
                        if (attr.startsWith(templatePrefix)) {
                            attr = attr.slice(templatePrefix.length);

                            templateAttributes[attr] = attributes[attribute];
                            delete attributes.$attr[attribute];
                            element.removeAttr(attribute);
                        }
                    }
                    console.log(templateAttributes);
                }
            }

            /* template "set" operation specified */
            if ("set" in templateAttributes) {
                var templateName = templateAttributes["set"];
                delete templateAttributes["set"]

                if (typeof angular.templates == 'undefined') {
                    angular.templates = {};
                }

                /* angular scope and $compile operations requires top element */
                if (templateIsTag) {
                    angular.templates[templateName] = "<span>" + element.html() + "</span>";
                } else {
                    angular.templates[templateName] = element[0].outerHTML;
                }
            }

            /* template "get" operation specified */
            if ("get" in templateAttributes) {
                templateName = templateAttributes["get"];
                delete templateAttributes["get"]
            } else {
                templateName = null;
            }

            /* directive's "link" function */
            return function(scope, element, attributes) {

                var result = '';
                if (templateName != null && templateName != '') {
                    /* looking for a stored template HTML */
                    var templateHTML = '';
                    if (typeof angular.templates != 'undefined' &&
                        typeof angular.templates[templateName] != 'undefined') {

                        templateHTML = angular.templates[templateName];
                    }

                    /* taking subject to which new scope will be applied */
                    var templateElement = angular.element();
                    if (templateIsTag) {
                        if (templateHTML != '') {
                            templateElement = angular.element(templateHTML)
                        }
                    } else {
                        templateElement = element.append(templateHTML);
                    }

                    /* making new scope */
                    var templateScope = scope.$new(false);
                    for (var attr in templateAttributes) {
                        templateScope[attr] = templateScope.$eval(templateAttributes[attr]);
                    }

                    /* applying new scope to the subject */
                    result = $compile(templateElement)(templateScope);
                }
                element.replaceWith(result);
            }
        }
    }
}]);