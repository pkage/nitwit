Template.user.helpers({
	'sselector': function() {
		console.log(this)
		return Twits.find({$or: [
				{'author': this._id},
				{'mentions': {$in: [this.username]}}
			]
		}, {sort: {timestamp: -1}});
	}
})