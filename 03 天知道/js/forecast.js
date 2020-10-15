/*
需求：
  请求地址:http://wthrcdn.etouch.cn/weather_mini
  请求方法:get
  请求参数:city(城市名)
  响应内容:天气信息

  1. 回车/点击
  2. 查询数据
  3. 渲染数据
  */
var app = new Vue({
    el: "#app",
    data: {
        city: "",
        weatherList: [],
        hotCitys: ["北京", "上海", "广州", "深圳"]
    },
    methods: {
        // 回车查询
        searchWeather() {
            // 判断城市是否为空
            let city = this.city.trim();
            if (!city) {
                alert('请输入城市名');
                return false;
            }
            // 发送请求
            axios.get(`http://wthrcdn.etouch.cn/weather_mini?city=${this.city}`)
                // 成功
                .then(response => {
                    this.weatherList = response.data.data.forecast;
                })
                // 失败
                .catch(error => {
                    console.log(error);
                })
                // 不管成功还是失败都会执行
                .finally(() => { });
        },
        // 点击 hotCitys 查询
        clickSearch(city) {
            this.city = city;
            this.searchWeather();
        }
    }
})