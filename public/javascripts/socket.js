var socket = new WebSocket('ws://localhost:8888');
        socket.addEventListener("open", ()=>console.log("You are connected"));
        socket.onmessage=function(event) {//Recuperation des messages envoyé par le serveur
          var tmp = document.getElementById('tmp')
          var hum = document.getElementById('humidity')

          var heure = new Date()
          let my_temp = event.data
          var temp = my_temp.slice(0,5)
          var humidite = my_temp.slice(5,10)
          var tempMoy = []
          var humpMoy = []

          tmp.innerHTML = temp + "°C";
          hum.innerHTML = humidite + "%";              

            console.log(my_temp);

          //temperature et humidite 8h, 12h et 19
            var temp_moyenne = document.getElementById('temp_moyenne')
              var hum_moyenne = document.getElementById('hum_moyenne')
          if (heure.getHours() == 08 && heure.getMinutes()== 00) {
              var tmp8h = document.getElementById('tmp8h')
              var humidity8h = document.getElementById('humidity8h') 
              tmp8h.innerHTML = temp + "°C";
              humidity8h.innerHTML = humidite + "%";
              tempMoy.push(temp)  
              humpMoy.push(humidite)

          }else if (heure.getHours() == 12 && heure.getMinutes()== 00) {
              var tmp12h = document.getElementById('tmp12h')
              var humidity12h = document.getElementById('humidity12h') 
              tmp12h.innerHTML = temp + "°C";
              humidity12h.innerHTML = humidite + "%"; 
              tempMoy.push(temp)  
              humpMoy.push(humidite)

          }else if (heure.getHours() == 19 && heure.getMinutes()== 00) {
              var tmp19h = document.getElementById('tmp19h')
              var humidity19h = document.getElementById('humidity19h') 
              tmp19h.innerHTML = temp + "°C";
              humidity19h.innerHTML = humidite + "%"; 
              tempMoy.push(temp)  
              humpMoy.push(humidite)

              //temperature et humidite moyenne
              for (let i = 0; i < 3; i++) {
                let somme1 = 0;
                var moy_tmp = 0;
                somme1 = somme1 + tempMoy[i]
                moy_tmp = somme1 / 3;
              }
              for (let i = 0; i < 3; i++) {
                let somme2 = 0;
                var moy_hum = 0;
                somme2 = somme2 + humpMoy[i]
                moy_hum = somme2 / 3;
              }
              temp_moyenne.innerHTML = moy_tmp + "°C"
              hum_moyenne.innerHTML = moy_hum + "%"

              tempMoy.splice(0,3)  
              humpMoy.splice(0,3)
          }
        }