/**
 * 目标1：默认显示-北京市天气  /api/weather city: code110100
 *  1.1 获取北京市天气数据 /api/weather/city city: str
 *  1.2 数据展示到页面
 */

document.querySelector('.search-city').addEventListener('input', _.debounce(function(e) {
  if (this.value.trim() === '') return
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather/city',
    params: {city: this.value}
  }).then(res => {
    if (!res.data.length) {
      document.querySelector('.search-list').classList.remove('show')
      return  
    }
    document.querySelector('.search-list').innerHTML = res.data.map(item => `
      <li class="city-item" data-code="${item.code}">${item.name}</li>
    `).join('')
  })
}, 1000))

document.querySelector('.search-list').addEventListener('click', function(e) {
  if (e.target.tagName !== 'LI' ) retrun
  render(e.target.dataset.code)
})

render('110100')

function render(city) {
  myAxios({
    url: 'http://hmajax.itheima.net/api/weather',
    params: {city}
  }).then(res => {
    const data = res.data
    document.querySelector('.top-box .title').innerHTML = `
      <span class="dateShort">${data.dateShort}</span>
      <span class="calendar">农历&nbsp;
      <span class="dateLunar">${data.dateLunar}</span>
      </span>
    `
    document.querySelector('.weather-box').innerHTML = `
      <div class="tem-box">
        <span class="temp">
          <span class="temperature">${data.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${data.psPm25}</span>
          <span class="psPm25Level">${data.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="${data.weatherImg}" class="weatherImg" alt="">
            <span class="weather">${data.weather}</span>
          </li>
          <li class="windDirection">${data.windDirection}</li>
          <li class="windPower">${data.windPower}</li>
        </ul>
      </div>
    `
    document.querySelector('.today-weather').innerHTML = `
      <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${data.todayWeather.weather}</span>
          <span class="temNight">${data.todayWeather.temNight}</span>
          <span>-</span>
          <span class="temDay">${data.todayWeather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${data.todayWeather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${data.todayWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${data.todayWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${data.todayWeather.sunsetTime}</span>
        </li>
      </ul>
    `
    document.querySelector('.week-wrap').innerHTML = data.dayForecast.map(item => `
      <li class="item">
        <div class="date-box">
          <span class="dateFormat">${item.dateFormat}</span>
          <span class="date">${item.date}</span>
        </div>
        <img src="${item.weatherImg}" alt="" class="weatherImg">
        <span class="weather">${item.weather}</span>
        <div class="temp">
          <span class="temNight">${item.temNight}</span>-
          <span class="temDay">${item.temDay}</span>
          <span>℃</span>
        </div>
        <div class="wind">
          <span class="windDirection">${item.windDirection}</span>
          <span class="windPower">&lt;${item.windPower}</span>
        </div>
      </li>
    `).join('')
  })
}

