
// Lấy dữ liệu từ thuộc tính data- của id="mydata"
var place = document.getElementById("mydata").dataset.place;
var lon = document.getElementById("mydata").dataset.lon;
var lat = document.getElementById("mydata").dataset.lat;

function getCurrentWeatherDetail() {
    // Gửi yêu cầu đến API để lấy dữ liệu thời tiết
    $.ajax({
        url: `https://api.weatherapi.com/v1/forecast.json?key=cf4433948c49480fb79143448232003&q=${lat},${lon}&days=1&aqi=yes&alerts=yes&lang=vi`,

        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);

            // xử lí dữ liệu trả về
            var location = data.location.name;
            var country = data.location.country;
            var iconUrl = data.current.condition.icon;
            var temp = data.current.temp_c;
            var text = data.current.condition.text;
            var feels_like = data.current.feelslike_c;
            var humidity = data.current.humidity;
            var vis_km = data.current.vis_km;
            var wind_kph = data.current.wind_kph;
            var uv = data.current.uv;
            var temp_min = data.forecast.forecastday[0].day.mintemp_c;
            var temp_max = data.forecast.forecastday[0].day.maxtemp_c;


            //Hiển thị thông tin thời tiết lên trang web
            $("#location").text(`Dự báo thời tiết ${location}, ${country}`);
            $("#image-div").prepend(`<img id="current-weather-image" src="${iconUrl}" />`);
            $("#current-temp").text(`${temp} °`);
            $("#text").text(`${text}`);
            $("#feels_like").text(`Cảm giác như ${feels_like}`);
            $("#humidity").text(`${humidity} %`);
            $("#vis_km").text(`${vis_km} km`);
            $("#wind_kph").text(`${wind_kph} km/h`);
            $("#uv").text(`${uv}`);
            $("#min_max_temp").text(`${temp_min}°/${temp_max}°`);

            /*
            strHTML = ``;
            // 3 days forecast
            for (let i = 0; i < 3; i++) {
                // Lấy dữ liệu trả về
                var date = data.forecast.forecastday[i].date;
                var avghumidity = data.forecast.forecastday[i].day.avghumidity;
                var iconUrlforecast = data.forecast.forecastday[i].day.condition.icon;
                var textforecast = data.forecast.forecastday[i].day.condition.text;
                var min_temp = data.forecast.forecastday[i].day.mintemp_c;
                var max_temp = data.forecast.forecastday[i].day.maxtemp_c;
                var displayDate = formatDate(date);
                str = `<div class="weather-item">
                                    <span class="weather-item-title">${displayDate}</span>
                                    <div class="weather-item-body">
                                        <img src="${iconUrlforecast}">
                                        <div class="precipitation" title="Độ ẩm">
                                            <i class="bi bi-droplet"></i> ${avghumidity} %
                                        </div>
                                        <p class="mb-0">
                                            ${textforecast}
                                        </p>
                                    </div>
                                    <div class="weather-item-footer">
                                        <span>${min_temp}°</span> /
                                        <span>${max_temp}°</span>
                                    </div>
                                </div>
                    `;
                strHTML += str;
            }
            $("#ThreeDayForecast").html(strHTML);
            */
        },
        error: function () {
            alert("Không thể lấy thông tin thời tiết.");
        }

    });
}

$(document).ready(function () {
    getCurrentWeatherDetail();
})
