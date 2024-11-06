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
    document.querySelector('.title').innerHTML = `
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

oo = {
  "date": "2024-11-06",
  "area": "北京市",
  "dateShort": "11月06日",
  "dateLunar": "十月初六",
  "temperature": "11",
  "weather": "多云",
  "weatherImg": "https://hmajax.itheima.net/weather/duoyunline.png",
  "windPower": "2级",
  "windDirection": "东风",
  "psPm25Level": "优",
  "psPm25": "47",
  "todayWeather": {
      "humidity": "41",
      "sunriseTime": "06:49",
      "sunsetTime": "17:07",
      "ultraviolet": "",
      "weather": "多云",
      "temDay": "13",
      "temNight": "2"
  },
  "dayForecast": [
      {
          "date": "11月06日",
          "temDay": "13",
          "weather": "多云",
          "temNight": "2",
          "windPower": "2级",
          "dateFormat": "今天",
          "weatherImg": "https://hmajax.itheima.net/weather/duoyun.png",
          "windDirection": "东北风"
      },
      {
          "date": "11月07日",
          "temDay": "14",
          "weather": "晴",
          "temNight": "4",
          "windPower": "2级",
          "dateFormat": "明天",
          "weatherImg": "https://hmajax.itheima.net/weather/qing.png",
          "windDirection": "东北风"
      },
      {
          "date": "11月08日",
          "temDay": "14",
          "weather": "阴",
          "temNight": "5",
          "windPower": "2级",
          "dateFormat": "后天",
          "weatherImg": "https://hmajax.itheima.net/weather/yin.png",
          "windDirection": "东北风"
      },
      {
          "date": "11月09日",
          "temDay": "15",
          "weather": "晴",
          "temNight": "6",
          "windPower": "2级",
          "dateFormat": "周六",
          "weatherImg": "https://hmajax.itheima.net/weather/qing.png",
          "windDirection": "南风"
      },
      {
          "date": "11月10日",
          "temDay": "15",
          "weather": "阴",
          "temNight": "5",
          "windPower": "2级",
          "dateFormat": "周日",
          "weatherImg": "https://hmajax.itheima.net/weather/yin.png",
          "windDirection": "东北风"
      },
      {
          "date": "11月11日",
          "temDay": "15",
          "weather": "阴",
          "temNight": "7",
          "windPower": "2级",
          "dateFormat": "周一",
          "weatherImg": "https://hmajax.itheima.net/weather/yin.png",
          "windDirection": "南风"
      },
      {
          "date": "11月12日",
          "temDay": "12",
          "weather": "阴",
          "temNight": "7",
          "windPower": "2级",
          "dateFormat": "周二",
          "weatherImg": "https://hmajax.itheima.net/weather/yin.png",
          "windDirection": "东南风"
      }
  ]
}