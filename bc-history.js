var BC = BC || {};

BC.History = (function() {
	'use strict';

    var self = {};

    init();
    function init() {
        bindEvents();
    }


    /**
     * Binds necessary event handlers
     */
    function bindEvents() {
        var $b = $('body');

        $b.on('click', 'a[href]', loadPage);
        window.onpopstate = popState;
    }

    function loadPage(e, replace) {
        var url;
        var stateObj;
        var page;

        // If a link was clicked
        if (typeof e == 'object') {
            url = $(this).attr('href');
            e.preventDefault();
        }
        else {
            url = e;
        }

        // If it's the current page
        if (history.state != null && history.state.url == url && !replace) {
            return false;
        }
        
        stateObj = { url: url };

        // Get content, load in .main, either replace or push state
        //App.loading();
        $.get(url, {
            ajax: true
        }, function(response) {
            $('.main').html(response);
            $('.main').scrollTop(0);
            
            if (replace) {
                history.replaceState(stateObj, "Page", url);
            }
            else {
                history.pushState(stateObj, "Page", url);
            }
        });
    }

    function popState(e) {
        var url = document.location.pathname;
        loadPage(url, true);
    }

    self.loadPage = loadPage;
    return self;
})();
