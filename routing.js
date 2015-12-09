Router.route('/', {
	template: 'splash'
})

Router.route('/home');
Router.route('/dm');
Router.route('/settings');
Router.route('/user/:user', {
	template: 'user',
	data: function() {
		return Meteor.users.findOne({'username': this.params['user']});
	}
}) 
