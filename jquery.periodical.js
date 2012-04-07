/*
 * Copyright (C) 2012 rodolfo@infweb.net
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($){
    var PeriodicalChecker = function(url, frequency, ajaxOptions){
        if (url === undefined || url == null || !url.length)
            throw "URL argument is mandatory";

        if (frequency === undefined)
            frequency = 10 * 1000;

        var self = this;
        var completeCallback = function(jqXHR, textStatus) {
            self.console.log("Completed call to \"" + self.url + "\" [" + textStatus + "]");
            self.isRunning = false;
            self.request = null;
        }

        if (typeof(ajaxOptions) == "undefined")
            ajaxOptions = {};

        if(ajaxOptions.complete !== undefined) {
            var oldComplete = ajaxOptions.complete;
            ajaxOptions.complete = function(jqXHR, textStatus) {
                oldComplete(jqXHR, textStatus);
                completeCallback(jqXHR, textStatus);
            };
        } else {
            ajaxOptions.complete = completeCallback;
        }

        this.ajaxOptions = ajaxOptions;
        this.frequency = frequency;
        this.isRunning = false;
        this.url = url;
        this.callInterval = -1;
        if (window.console !== undefined)
            this.console = window.console;
        else
            this.console = function() { /* Discard output */ };
        this.request = null;
    };

    PeriodicalChecker.prototype.start = function() {
        var self = this;
        this.callInterval = setInterval(function(){ self.runOnce(); }, this.frequency);
    };

    PeriodicalChecker.prototype.runOnce = function() {
        if(this.isRunning) {
            // this.console.error("Discarding call to " + this.url);
            return;
        }
        this.console.log("Calling ajax to " + this.url);
        this.isRunning = true;
        this.ajaxOptions.url = this.url;
        this.request = $.ajax(this.ajaxOptions);
    };

    PeriodicalChecker.prototype.stop = function() {
        this.callInterval = clearTimeout(this.callInterval);
        if (this.request !== undefined && this.request != null) {
            if (typeof(this.request.reject) == "function")
                this.request.reject();
            else if (typeof(this.request.abort) == "function")
                this.request.abort();
        }
        this.isRunning = false;
    };

    $.periodicalAjax = function(url, ajax_options, frequency) {
        var runner = new PeriodicalChecker(url, ajax_options, frequency);
        runner.start();
        return runner;
    };
})(jQuery);
