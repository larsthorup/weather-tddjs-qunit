function render(context, data) {
    $('<p></p>').appendTo(context).text(data.text);
}

function fetch(query) {
    if(false) {
        return {
            then: function (callback) {
                callback({text: 'sunny'});
            }
        };
    }

    // sample response:
    //
    var x = {
        "coord": {
            "lon": -104.99,
            "lat": 39.74
        },
        "sys": {
            "message": 0.0728,
            "country": "United States of America",
            "sunrise": 1396701384,
            "sunset": 1396747710
        },
        "weather": [
            {
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03d"
            }
        ],
        "base": "cmc stations",
        "main": {
            "temp": 285.04,
            "humidity": 20,
            "pressure": 1008,
            "temp_min": 278.15,
            "temp_max": 289.82
        },
        "wind": {
            "speed": 1.03,
            "gust": 3.6,
            "deg": 260
        },
        "clouds": {
            "all": 36
        },
        "dt": 1396723744,
        "id": 5419384,
        "name": "Denver",
        "cod": 200
    };

    return $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        data: {q: query},
        dataType: 'jsonp'
    }).then(function (data) {
        return {
            text: data.weather[0].description
        };
    });
}

function listen(context) {
    context.find('#city').on('change', function () {
        var city = $(this);
        fetch(city.val()).then(function (data) {
            render(context, data);
        })
    })
}