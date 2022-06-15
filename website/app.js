let form = document.getElementById("myForm");
function handleForm(event) {
  // prevent default behaviors 
  // In this case, won't submit form 
  event.preventDefault();
  let zip = event.target.elements.zip.value

  if(zip !== "") {
    //API calling
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${zip}&limit=5&appid=8af8da93c536a6e913fb9ed73ea948d8`)
    .then(response => {
      //console.log(response)
      if(response.data.length > 0) {
          const lat = response.data[0].lat
          const lon = response.data[0].lon
          //console.log(lat)
          //console.log(lon)
          //using lat & lon ,getting temp & content
          axios.get(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=8af8da93c536a6e913fb9ed73ea948d8`)
          .then(output=> {
            //console.log('output', output)
            const weather = {
                temp: output.data.main.temp,
                content: output.data.main.feels_like
            }
            //console.log(weather.temp)
            document.getElementById('temp').innerHTML = `${Math.round(weather.temp)} degrees`;
            document.getElementById('content').innerHTML = `${Math.round(weather.content)} degrees`;
              let d = new Date();
              let newDate = `${d.getDate()} / ${d.getMonth()+1} / ${d.getFullYear()}`;
              document.getElementById('date').innerHTML =newDate;
              //send data to backend
              const data = {
                  temp:weather.temp,
                  content:weather.content,
                  date:newDate,
                  
              }
            
              axios.post('http://localhost:3000/getWeather', data)
               .then(result => {
                  console.log(result)

                
               });
        
        }
    )
 

      }});

  }


} 
form.addEventListener('submit', handleForm);




    // Call API
      //  axios.post('http://localhost:3000/getWeather', data)
      // .then(response => {

      //   // Write updated data to DOM elements
      //   document.getElementById('temp').innerHTML = `${Math.round(response.data.weather.temp)} degrees`;
      //   document.getElementById('content').innerHTML = `${Math.round(response.data.weather.content)} degrees`;

      //   let d = new Date();
      //   let newDate = `${d.getDate()} / ${d.getMonth()+1} / ${d.getFullYear()}`;
      //   document.getElementById('date').innerHTML =newDate;
        
      // });