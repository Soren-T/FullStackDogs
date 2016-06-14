



	function pirateShower(){
		Pirate.find(function(err, pirate, cb){
		if(pirate.smarmy){
			pirate.shower(function(err, pirate){
				pirate.save(function (err, pirate))
				cb()
			})
		}

	})
	}


	var PirateFindPromise = function(){
		return new Promise(function(resolve, reject){
			Pirate.find(function(err, pirates){
				if(err){
					reject(err)
				} else {
					resolve(pirates)
				}
			})
	}



	PirateFindPromise()
		.then(function(pirate){
			return pirate.shower()
		})
		.then(function(showeredPirate){
			return showeredPirate.save()
		})
		.then(function(savedPirate){
			res.send(JSON.stringify(savedPirate))
		})