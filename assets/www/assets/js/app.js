// 
//  --- our app behavior logic ---
//
run(function () {
	var results;
	var not;
    // Se invoca en la primera ejecuci�n
    var init = (function () {
        if (navigator.network.connection.type == Connection.NONE) {
            x$('#ico_conn').attr('src',"assets/img/dconn.png")
        } else {
            x$('#ico_conn').attr('src',"assets/img/conn.png")
        }
        x$('.notificacion').xhr('https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=near%20technologies&rsz=5',
    	        { callback: function(){
    	            results = eval("("+this.responseText+")").responseData.results;
    	            for (i=0;i<5;i++){
    	            	if (i<results.length)    	            		
    	            		x$("#not"+i+"_button").html("<p>"+results[i].title+"</p>");
    	            	else{
    	            		x$("#not"+i+"_button").addClass('notificacion_vacia');
    	            		x$("#not"+i+"_button").removeClass('notificacion');
    	            	}	
    	        	}
    	          }
    	        }}
    		);
            //Sustituye a when('#save')
        	//Codigo necesario para saltarnos el bug de android que casca cuando mandas '?' en la url
        	x$('#save_b').on('touchstart', function () {
        		store.save({
                    key:'config',
                    geo:ui('geo'),
                    tema:ui('tema')
            	});
        		store.get('config', function (saved) {
            		var geo  = saved ? saved.geo || ui('geo') : ui('geo')
            		        ,   tema = saved ? saved.tema || ui('tema') : ui('tema')
            		        ,   path = "https://ajax.googleapis.com/ajax/services/search/news?v=1.0";
            		        x$('.notificacion').xhr(path + "&q=" + tema + "&geo=" + geo+ "&rsz=5",
            	     	        { callback: function(){     	        	
            	     	            results = eval("("+this.responseText+")").responseData.results;
            	     	            for (i=0;i<5;i++){
            	     	            	if (i<results.length)    	            		
            	     	            		x$("#not"+i+"_button").html("<p>"+results[i].title+"</p>");
            	     	            	else{
            	     	            		x$("#not"+i+"_button").addClass('notificacion_vacia');
            	     	            		x$("#not"+i+"_button").removeClass('notificacion');
            	     	            	}	
            	     	        	}
            	     	         }
             	        });
            	        display('#welcome');
        		})
        });	
    })();
    //Se invoca siempre
    if (navigator.network.connection.type == Connection.NONE) {
        x$('#ico_conn').attr('src',"assets/img/dconn.png")
    } else {
        x$('#ico_conn').attr('src',"assets/img/conn.png")
    }
    
    // a little inline controller
    when('#welcome', function(){
    	for (i=0;i<5;i++){
        	if (i<results.length)
        		x$("#not"+i+"_button").html("<p>"+results[i].title+"</p>");
        	else
        		x$("#not"+i+"_button").css({display:'none'});
    	}    	
    	/*x$('.notificacion').each(function(not, index, xui) {
			if (x$(not).html() == ''){
				x$(not).addClass('notificacion_vacia');
				x$(not).removeClass('notificacion');
			}
		});*/
    });

    when('#not0', function(){
    	x$('#not0_button').hasClass('notificacion',function(){not=0;display('#detalle');})
    	x$('#not_titulo').html("<p><b>"+results[0].title+"</b></p>");
    	x$('#not_contenido').html("<p>"+results[0].content+"</p>");
    	x$('#not_url').html("<a href="+ results[0].unescapedUrl +">"+results[0].unescapedUrl+"</a>");
    });
    when('#not1', function(){
    	x$('#not1_button').hasClass('notificacion',function(){not=1;display('#detalle');})
    	x$('#not_titulo').html("<p><b>"+results[1].title+"</b></p>");
    	x$('#not_contenido').html("<p>"+results[1].content+"</p>");
    	x$('#not_url').html("<a href="+ results[1].unescapedUrl +">"+results[1].unescapedUrl+"</a>");
    });
    when('#not2', function(){
    	x$('#not2_button').hasClass('notificacion',function(){not=2;display('#detalle');})
    	x$('#not_titulo').html("<p><b>"+results[2].title+"</b></p>");
    	x$('#not_contenido').html("<p>"+results[2].content+"</p>");
    	x$('#not_url').html("<a href="+ results[2].unescapedUrl +">"+results[2].unescapedUrl+"</a>");
    });
    when('#not3', function(){
    	x$('#not3_button').hasClass('notificacion',function(){not=3;display('#detalle');})
    	x$('#not_titulo').html("<p><b>"+results[3].title+"</b></p>");
    	x$('#not_contenido').html("<p>"+results[3].content+"</p>");
    	x$('#not_url').html("<a href="+ results[3].unescapedUrl +">"+results[3].unescapedUrl+"</a>");
    });
    when('#not4', function(){
    	x$('#not4_button').hasClass('notificacion',function(){not=4;display('#detalle');})
    	x$('#not_titulo').html("<p><b>"+results[4].title+"</b></p>");
    	x$('#not_contenido').html("<p>"+results[4].content+"</p>");
    	x$('#not_url').html("<a href="+ results[4].unescapedUrl +">"+results[4].unescapedUrl+"</a>");
    });
    when('#settings', function() {
		// load settings from store and make sure we persist radio buttons.
		store.get('config', function(saved) {
			if (saved) {
				if (saved.geo) {
					x$('input[value=' + saved.geo + ']').attr('checked',true);
				}else{
					x$('input[value=global]').attr('checked',true);
				}
				if (saved.tema) {
					x$('input[name=tema]').attr('value',saved.tema);
				}
			}
		});
	});
    when('#detalle', function () {
    	x$('#not_titulo').html(results[not].title);
    	x$('#not_contenido').html(results[not].content);
    	x$('#not_url').html(results[not].url);
    	/*x$('#imagen').attr('src', path);*/
        /*store.get('config', function (saved) {
            // construct a gmap str
            var map  = saved ? saved.map || ui('map') : ui('map')
            ,   zoom = saved ? saved.zoom || ui('zoom') : ui('zoom')
            ,   path = "http://maps.google.com/maps/api/staticmap?center=";
			
            navigator.geolocation.getCurrentPosition(function (position) {
                var location = "" + position.coords.latitude + "," + position.coords.longitude;
                path += location + "&zoom=" + zoom;
                path += "&size=250x250&maptype=" + map + "&markers=color:red|label:P|";
                path += location + "&sensor=false";

                x$('img#static_map').attr('src', path);
            }, function () {
                x$('img#static_map').attr('src', "assets/img/gpsfailed.png");
            });
        });*/
    });
    /*when('#save', function () {
        store.save({
            key:'config',
            geo:ui('geo'),
            tema:ui('tema')
        });
        display('#welcome');
    });*/
});
