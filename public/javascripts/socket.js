var socket = new WebSocket('ws://localhost:8081');
        socket.addEventListener("open", ()=>console.log("You are connected"));
        socket.onmessage=function(event) {//Recuperation des messages envoyé par le serveur
          var tmp = document.getElementById('tmp')
          var hum = document.getElementById('humidity')

          let my_temp = event.data
          var temp = my_temp.slice(0,5)
          var humidite = my_temp.slice(5,10)

          tmp.innerHTML = temp + "°C";
          hum.innerHTML = humidite + "%";              

            console.log(temp);
        }