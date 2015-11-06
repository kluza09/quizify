//current page active in side menu
$(function(){

    var url = window.location.pathname,
        urlRegExp = new RegExp(url.replace(/\/$/,'') + "$"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
        // now grab every link from the navigation
        $('#fixed-menu a').each(function(){

            if(urlRegExp.test(this.href.replace(/\/$/,''))){
                $(this).parent('li').addClass('active');
            }
        });

});
