// https://api.openweathermap.org/data/2.5/weather?q=rajpura&appid=02c9160f4c47f330f1b100285ec3aa0f
let section=document.getElementById("section");
let darkLightMode=document.getElementById("darkLightMode");
let navbar=document.getElementById("navbar");
let loader=document.getElementById("loader")
const fetchApi=async(url)=>{
    try{
        loader.classList.add("loader")
        section.setAttribute("style","display:flex;align-items:center;justify-content:center")
        let urlObject=await fetch(url);
        let data=await urlObject.text();
        let jsonData=JSON.parse(data);
        let temp=jsonData.main.temp;
        let weatherCondition=jsonData.weather[0].main;
        let img;
        if(weatherCondition=="Clear"){
           img="https://cdn.iconscout.com/icon/free/png-256/cloudy-weather-11-1147979.png";
        }
        else if(weatherCondition=="Clouds"){
            img="https://www.freeiconspng.com/uploads/rain-cloud-icon-4.png";
        }
        let windSpeed=jsonData.wind.speed;
        let country=jsonData.sys.country;
        let city=jsonData.name;
        section.innerHTML=`
        <div class="weatherCard" id="weatherCard">
        <div class="countryAndCity">
        <div class="country">${country}</div>
        <div class="city">${city}</div>
        </div>
        <div class="imageContainer">
        <img src=${img} alt="">
        </div>
        <div class="temprature">
        <h1>${Math.floor(temp-273.15)}&#8451;</h1>
        </div>
                <div class="windSpeed">
                <h3>${windSpeed} m/s</h3>
                </div>
                </div>
                `
                loader.classList.remove("loader")
                section.setAttribute("style","justify-content: space-around;")    
            }
            catch(error){
                console.log("error",error)
            }
        }
        fetchApi(`https://api.openweathermap.org/data/2.5/weather?q=rajpura&appid=02c9160f4c47f330f1b100285ec3aa0f`);
        let weatherCard=document.getElementsByClassName("weatherCard");
        darkLightMode.addEventListener("click",function(){
            if(!weatherCard[0].classList.contains("darkMode")){
                weatherCard[0].classList.add("darkMode");
                darkLightMode.innerText="Light";
                section.style.backgroundColor="black"
                navbar.classList.remove("bg-light");
                navbar.classList.add("bg-dark");
                navbar.style.color="white";
            }
            else{
                weatherCard[0].classList.remove("darkMode");
                darkLightMode.innerText="Dark";
                section.style.backgroundColor="white";
                navbar.classList.add("bg-light");
                navbar.classList.remove("bg-dark");
            }
        })
        
