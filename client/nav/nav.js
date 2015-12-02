Template.navigation.rendered = function() {
	$('.navlink').parent().removeClass('active');
	$('[data-link=' + Router.current().route.getName() + ']').parent().addClass('active');
}

Template.navigation.events({
	'click #logout': function() {
		Meteor.logout();
	}
})