jQuery(function () {
// Quand la popup s'affiche
    var fluxs = localStorage.getItem("flux");
    if (fluxs === "") {
        fluxs = [];
    } else {
        fluxs = JSON.parse(fluxs);
    }

    for (i = 0; i < fluxs.length; i++) {
        jQuery('.flux_streamer').first().clone().appendTo(".flux");
        jQuery('.streamer').last().val(fluxs[i]);
        if (i == 0) {
            jQuery('.flux_streamer').first().remove();
        }
    }


// Quand on enregistre un flux
    jQuery('body').on('click', '.btn-save', function () {
        var flux = jQuery(this).siblings(".streamer").val();
        var fluxs = localStorage.getItem("flux");
        if (fluxs === "") {
            fluxs = [];
        } else {
            fluxs = JSON.parse(fluxs);
        }
        if (jQuery.inArray(flux, fluxs) != -1) {
            return;
        }
        fluxs.push(flux);
        localStorage.setItem("flux", JSON.stringify(fluxs));
        chrome.storage.sync.set({'flux': fluxs});
    });

    jQuery('body').on('click', '.add_streamer', function (e) {
        jQuery('.flux_streamer').first().clone().appendTo(".flux");
        jQuery('.streamer').last().val("");
    });

    jQuery('body').on('click', '.btn-delete', function () {
        var noeud = jQuery(this).siblings('.streamer');
        var flux = noeud.val();
        var noeud_remove = jQuery(this).parents('.flux_streamer');

        // on récupère les fluxs
        var fluxs = localStorage.getItem("flux");
        if (fluxs === "") {
            return;
        }
        fluxs = JSON.parse(fluxs);
        if (jQuery.inArray(flux, fluxs) == -1) {
            return;
        }
        fluxs.splice(fluxs.indexOf(flux), 1);
        noeud_remove.remove();
        localStorage.setItem("flux", JSON.stringify(fluxs));
        chrome.storage.sync.set({'flux': fluxs});
    })
});
