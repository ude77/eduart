$(document).ready(function(){
    // Initialize Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    $(window).scroll(function() {
        $(".slideanim").each(function(){
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });

});

function myMap() {
    var myCenter = new google.maps.LatLng(41.584809, 1.621299);
    var mapProp = {center:myCenter, zoom:12, scrollwheel:true, draggable:true, mapTypeId:google.maps.MapTypeId.ROADMAP};
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({position:myCenter});
    google.maps.event.addListener(marker, 'click', function () {
        window.open(
            "https://www.google.com/maps/search/?api=1&query=41.584809,1.621299",
            "_blank");
    });
    marker.setMap(map);
}

var detectorOptions = {
    // order and from where user language should be detected
    order: ['querystring', 'cookie', 'localStorage', 'htmlTag', 'navigator'],

    // keys or params to lookup language from
    lookupQuerystring: 'lang',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 60*24*365,
    cookieDomain: 'eduartjardins.com',

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement
};

i18next
    .use(i18nextXHRBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: 'ca',
        debug: false,
        backend: {
            loadPath: './translations/{{lng}}.json',
            crossDomain: true
        },
        detection: detectorOptions
    }, function(err, t) {
        updateContent();
    });


function updateContent() {
    jqueryI18next.init(i18next, $, {
        handleName: "localize",
        selectorAttr: "data-i18n"
    });
    $("#nav").localize();
    $("#carousel").localize();
    $("#who").localize();
    $("#services").localize();
    $("#contact").localize();
    $("#footer").localize();
}

function changeLng(lng) {
    i18next.changeLanguage(lng);
}

i18next.on('languageChanged', function() {
    updateContent();
});