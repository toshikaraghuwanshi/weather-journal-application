var form = document.getElementById("myForm");
function handleForm(event) {
  // prevent default behaviors 
  // In this case, won't submit form 
  event.preventDefault();
  var zip = event.target.elements.zip.value
  var data = {
    zip: zip
  }

  if(zip !== "") {
      // Call API
      axios.post('http://localhost:3000/getWeather', data)
      .then(response => {

        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = `${Math.round(response.data.weather.temp)} degrees`;
        document.getElementById('content').innerHTML = `${Math.round(response.data.weather.content)} degrees`;

        let d = new Date();
        let newDate = `${d.getDate()} / ${d.getMonth()+1} / ${d.getFullYear()}`;
        document.getElementById('date').innerHTML =newDate;
        
      });
  }


} 
form.addEventListener('submit', handleForm);
