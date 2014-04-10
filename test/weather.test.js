module('weather', {
    setup: function () {
        this.sandbox = sinon.sandbox.create();
    },
    teardown: function () {
        $.mockjaxClear();
        this.sandbox.restore();
    }
});

test('renders', function () {

    // given
    var context = $('<div></div>');
    var weatherData = { text: 'rain' };

    // when
    render(context, weatherData);

    // then
    equal(context.find('p').text(), 'rain', 'p:text()');
});

asyncTest('fetches', function () {
    // given
    $.mockjax({
        logging: false,
        url: 'http://api.openweathermap.org/data/2.5/weather',
        data: {q: 'Denver'},
        responseText: {
            weather: [
                {
                    description: 'sun'
                }
            ]
        },
        responseTime: 1
    });

    // when
    var fetching = fetch('Denver');

    // then
    fetching.then(function (data) {
        equal(data.text, 'sun', 'data.text');
        start();
    });
});

test('listens', function () {
    // given
    var context = $('<div><input type="text" id="city" /></div>');
    var city = context.find('#city');
    this.sandbox.stub(window, 'fetch').returns({
        then: function(callback) {
            callback({text: 'foggy'});
        }
    });
    this.sandbox.stub(window, 'render').returns();

    // when
    listen(context);
    city.val('San Francisco');
    city.trigger('change');

    // then
    ok(fetch.calledWith('San Francisco'), 'fetch called');
    ok(render.calledWith(context, { text: 'foggy' }), 'render called');
});
