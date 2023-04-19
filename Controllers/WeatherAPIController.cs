using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace BTL_api.Controllers
{

    public class WeatherAPIController : ApiController
    {
        [System.Web.Mvc.HttpGet]
        public async Task<IHttpActionResult> GetWeather()
        {
            string apiUrl = $"http://api.openweathermap.org/data/2.5/forecast?q=Hanoi,VN&units=metric&appid=beb12a9c79cbb1ada4fd8303c5e4deb6&lang=vi&cnt=48";
            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.GetAsync(apiUrl);
                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    return Ok(data); // trả về dữ liệu dưới dạng JSON
                }
                else
                {
                    return BadRequest();
                }
            }
        }
    }
}
