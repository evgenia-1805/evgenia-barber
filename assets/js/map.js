// Initialize Yandex Map
function initMap() {
    if (typeof ymaps === 'undefined') {
        console.error('Yandex Maps API not loaded');
        return;
    }

    ymaps.ready(function () {
        try {
            var myMap = new ymaps.Map('map', {
                center: [56.828640, 60.594645],
                zoom: 15,
                controls: ['zoomControl', 'typeSelector'],
                behaviors: ['drag', 'scrollZoom']
            }, {
                searchControlProvider: 'yandex#search',
                suppressMapOpenBlock: true
            });

            var myPlacemark = new ymaps.Placemark([56.828640, 60.594645], {
                balloonContent: 'E. E. Barber, ул. Хохрякова, 63, Екатеринбург',
                hintContent: 'E. E. Barber'
            }, {
                preset: 'islands#blueStretchyIcon',
                draggable: false
            });

            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable('scrollZoom');
        } catch (error) {
            console.error('Error initializing Yandex Map:', error);
        }
    });
}

// Call initMap when the page loads
window.addEventListener('load', initMap); 