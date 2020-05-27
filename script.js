function tplawesome (e,t) {res=e; for( var n=0; n<t.length;n++) {res=res.replace(/\{\{(.*?)\}\}/g, function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
        e.preventDefault();//PreventDefault empêche le recharge le rechargement par défault lors du clique sur le bouton submit
        //Préparation de la requete
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 5,
            order: "viewCount",
            publishedAfter: "2010-01-01T00:00:00z" //On affiche les vidéos publier après du 01.01.2010
        });

        //On execute la requête
        request.execute(function(response) {
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function(index,item) {
                $.get("item.html",function(data) {
                    $("#results").append(tplawesome(data, [{"title": item.snippet.title, "videoid":item.id.videoId}]));
                });
            });
            resetVideoHeight();
        });
    });
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyBhzbf-zfzugNRoM-lsN3Ml-lxnFVRbo9c");//Ceci est ma clé d'identification obtenu sur google developer console
    gapi.client.load("youtube", "v3", function() {
        //youtube api est prete
    });
}