jQuery(function () {
    setInterval(function () {
        var fluxs = [];
        chrome.storage.sync.get("flux", function (data) {

            // Notification 

            var fluxs = data.flux;
            for (i = 0; i < fluxs.length; i++) {
                var flux = fluxs[i];
                // On va récupérer les données
                url = "https://api.twitch.tv/kraken/streams/" + flux + ".json";
                jQuery.ajax({
                    url: url,
                    type: 'GET',
                    async: true,
                    success: function (obj) {
                        if (obj.stream) {
                            var nombre = localStorage.getItem("streamer-" + obj.stream.channel.display_name);
                            if (nombre == "" || nombre == null) {
                                nombre = 0;
                            }
                            if (nombre > 2) {
                                return;
                            }
                            chrome.notifications.create("new-streamer",
                                    {
                                        type: 'basic',
                                        title: obj.stream.channel.display_name + ' est en live',
                                        message: 'GO GO GO!',
                                        iconUrl: 'icon.png'
                                    }, function (id) {
                                setTimeout(function () {
                                    chrome.notifications.clear(id);
                                }, 8000);
                            });
                            localStorage.setItem("streamer-" + obj.stream.channel.display_name, parseInt(nombre) + 1);
                        } else {
                            localStorage.setItem("streamer-" + flux, 0);
                        }
                    }
                });
            }
        });
    }, 30000);
});
