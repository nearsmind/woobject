"use strict";

/**
    This utils are created by Leclerc Kevin (leclerc.kevin@gmail.com)
*/
(function (window) {

    var woobject = (function () {

        /**
         * Check if the item in parameter is a string
         * @param   {} item object to test
         * @returns {boolean} result of test
         */
        function isString(item) {
            return (typeof item === "string");
        }

        /**
         * Check if the item in parameter is an object
         * @param   {} item object to test
         * @returns {boolean} result of test
         */
        function isObject (item) {
            return (typeof item === "object" && !Array.isArray(item) && item !== null);
        }

        /**
         * Get the value of the data object
         * @param   {object}   o            [[Description]]
         * @param   {string}   prop         [[Description]]
         * @param   {[[Type]]} defaultValue [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        function get(o, prop, defaultValue) {
            if (!prop || !isString(prop) || !prop.trim().length > 0) {
                return;
            }

            var props = prop.split('.');
            var lastObj = o;

            if (props && props.length > 1) {
                //run into the object to got the value of prop
                for (var key in props) {
                    lastObj = lastObj[props[key]];
                }
            } else {
                lastObj = o[props[0]];
            }

            if (!lastObj && defaultValue) {
                return defaultValue;
            }

            return lastObj;
        }

        /**
         * Set the value of the data object
         * @param {[[Type]]} o     [[Description]]
         * @param {string}   prop  [[Description]]
         * @param {[[Type]]} value [[Description]]
         */
        function set(o, prop, value) {
            if (!prop || !isString(prop) || !prop.trim().length > 0) {
                return;
            }

            var lastObj = o;
            var props = prop.split('.');
            var key = 0;

            if (props && props.length > 1) {
                //run into the object to got the value of prop
                for (key in props) {
                    if (isObject(lastObj[props[key]])) {
                        lastObj = lastObj[props[key]];
                    }
                }
            }

            lastObj[props[key]] = value;
        }

        /**
         * Set an array value of the data object
         * @param {[[Type]]} o     [[Description]]
         * @param {string}   prop  [[Description]]
         * @param {[[Type]]} value [[Description]]
         */
        function setArray(o, prop, value) {
            if (!prop || !isString(prop) || !prop.trim().length > 0) {
                return;
            }

            var lastObj = o;
            var props = prop.split('.');
            var key = 0;

            if (props && props.length > 1) {
                //run into the object to got the value of prop
                for (key in props) {
                    if (isObject(lastObj[props[key]])) {
                        lastObj = lastObj[props[key]];
                    }
                }
            }

            lastObj[props[key]] = [];
            if (value) {
                value.forEach(function setValues(v, position) {
                    lastObj[props[key]].push(v.value);
                });
            }
        }

        /**
         * Clone an object
         * @param   {Boolean} deep    [[Description]]
         * @param   {Object}  [out={] [[Description]]
         * @returns {Object}  [[Description]]
         */
        function extend(deep, out) {
            out = out || {};

            for (var i = 2; i < arguments.length; i++) {
                if (!arguments[i]) {
                    continue;
                }

                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        if (Object.prototype.toString.call(arguments[i][key]) === '[object Object]') {
                            if (deep) {
                                out[key] = extend(deep, out[key], arguments[i][key]);
                            }
                        } else if (Array.isArray(arguments[i][key])) {
                            out[key] = [];

                            extendArray(deep, out[key], arguments[i][key]);
                        }else {
                            out[key] = arguments[i][key];
                        }
                    }
                }
            }

            return out;
        }

        /**
         * Clone an array
         * @param {Boolean} deep     [[Description]]
         * @param {Object}  out      [[Description]]
         * @param {Object}  objArray [[Description]]
         */
        function extendArray(deep, out, objArray) {
            objArray.forEach(function runIntoArray(obj, pos) {

                if (Object.prototype.toString.call(obj) === '[object Object]') {
                    if (deep) {
                        out[pos] = extend(deep, out[pos], obj);
                    }
                } else if (Array.isArray(obj)) {
                    out[pos] = [];

                    extendArray(deep, out[pos], obj);
                }else {
                    out[pos] = obj;
                }
            });
        }

        return {
            get: get,
            set: set,
            setArray: setArray,
            extend: extend
        };
    })();

    window._woobject = woobject;
})(window);
