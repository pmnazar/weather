;(function () {
	var form = document.getElementsByTagName( 'form' )[ 0 ],
		listResult = document.getElementById( 'list-result' ),
		clear = document.getElementById( 'clear' ),
		apiId = '00b583506a2dbf0afc436c56fe82b4eb';
	
	form.addEventListener( 'submit', function ( e ) {
		e.preventDefault();
		
		var city = document.getElementById( 'city' ),
			search = document.getElementById( 'search' ),
			xhr = new XMLHttpRequest(),
			apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city.value + '&appid=' + apiId + '&units=metric';
		
		xhr.open( 'POST', apiUrl, true );
		
		xhr.send();
		
		xhr.onreadystatechange = function () {
			if ( this.readyState !== 4 ) return false;
			
			if ( this.status === 200 ) {
				var res = JSON.parse( this.responseText ),
					li = document.createElement( 'li' ),
					span = document.createElement( 'span' );
				
				span.innerHTML = res.name; // set city name
				
				li.className = 'weather__list-result-item';
				li.appendChild(span);
				
				li.innerHTML = '— ' + li.innerHTML + ', ' + res.sys.country + ': ' + res.main.temp + '°C, ' + res.weather[ 0 ].description;
				
				listResult.appendChild( li );
			} else {
				console.error( 'Error: ' + (this.status ? this.statusText : 'request failed') );
				return false;
			}
		}
	} );
	
	clear.addEventListener( 'click', function () {
		listResult.innerHTML = '';
	} );
}());