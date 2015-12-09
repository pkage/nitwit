// universal ui helpers
Template.registerHelper('userName', function(kw) {
	id = (kw && kw.hash.id) ? kw.hash.id : Meteor.userId();
	try {
		if (Meteor.userId() != null) {
			if (Meteor.users.findOne({_id: id}).profile != undefined) {
				return Meteor.users.findOne({_id: id}).username;
			}
			return "anonymous";
		}
	} catch(err) {
		// ignore, probably fine
	}
});

Template.registerHelper('userFullName', function(kw) {
	id = (kw && kw.hash.id) ? kw.hash.id : Meteor.userId();
	try {
		if (Meteor.userId() != null) {
			if (Meteor.users.findOne({_id: id}).profile != undefined) {
				return Meteor.users.findOne({_id: id}).profile.name;
			}
			return "anonymous";
		}
	} catch(err) {
		// ignore, probably fine
	}
});

Template.registerHelper('userEmail', function(kw) {
	id = (kw && kw.hash.id) ? kw.hash.id : Meteor.userId();
	try {
		if (Meteor.userId() != null) {
			return Meteor.users.findOne({_id: id}).emails[0].address;
		}
	} catch(err) {
		// ignore, probably also fine
	}
});

Template.registerHelper('bounceLoggedOutUsers', function() {
	if (Meteor.userId() == null) {
		Router.go('/');
	}
});

Template.registerHelper('userImage', function(kw) {
	id = (kw && kw.hash.id) ? kw.hash.id : Meteor.userId();
	try {
		if (Meteor.userId() != null) {
			return Gravatar.imageUrl(Meteor.users.findOne({_id: id}).profile.grav_hash, {secure: true});
		}
	} catch(err) {
		// ignore
	}
});

Template.registerHelper('userColor', function(kw) {
	id = (kw && kw.hash.id) ? kw.hash.id : Meteor.userId();
	try {
		if (Meteor.userId() != null) {
			return Meteor.users.findOne({_id: id}).profile.color;
		}
	} catch(err) {
		// ignore, probably also fine
	}
});


Template.registerHelper('userBio', function(kw) {
	id = (kw && kw.hash.id) ? kw.hash.id : Meteor.userId();
	try {
		if (Meteor.userId() != null) {
			return Meteor.users.findOne({_id: id}).profile.bio.original;
		}
	} catch(err) {
		// ignore, probably also fine
	}
})

Template.registerHelper('userEscapedBio', function(kw) {
	id = (kw && kw.hash.id) ? kw.hash.id : Meteor.userId();
	try {
		if (Meteor.userId() != null) {
			return Meteor.users.findOne({_id: id}).profile.bio.escaped;
		}
	} catch(err) {
		// ignore, probably also fine
	}
})

// startup code
Meteor.startup(function() {
	// configure s-alert
	sAlert.config({
        effect: 'stackslide',
        position: 'bottom',
        timeout: 5000,
    });
});