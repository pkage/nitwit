Template.home.helpers({
	'homeselector': function() {
		return Twits.find({}, {sort: {timestamp: -1}});
	}
})