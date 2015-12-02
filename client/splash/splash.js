Template.splash.helpers({
	'checkLoggedIn': function() {
		if (Meteor.userId() != null) {
			Router.go('home');
		}
	}
})