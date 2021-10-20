const Item = require('../../models/item')
function homeController() {
    return {
        index(req, res) {
            Item.find().then(function(groceries){
				
				return res.render('home', { groceries: groceries })
			})
         
        }
    }
}

module.exports = homeController