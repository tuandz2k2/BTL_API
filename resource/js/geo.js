function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    $.ajax({
        url: '/save-location',
        type: 'POST',
        data: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },
        success: function(res) {
            // window.location.reload();
        },
        errror: function(err) {
            console.log(err)
        }
    })
}

function changeLocation() {
    getLocation();
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}

$(document).ready(function() {
    $('.btn-current-location').click(function(evt) {
        evt.preventDefault();

        let lat = $(this).data('lat');
        let lng = $(this).data('lng');
        if (lng && lat) {

            showPosition({
                coords: {
                    latitude: lat,
                    longitude: lng
                }
            });
        }
    })

    // getLocation()
});