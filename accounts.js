var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
{
	_id: "username",
	type: "text",
	displayName: "username",
	required: true,
	minLength: 5,
	func: function(value){
		if (Meteor.isClient) {
			console.log("Validating username...");
			var self = this;
			Meteor.call("userExists", value, function(err, userExists){
				if (!userExists)
					self.setSuccess();
				else
					self.setError(userExists);
				self.setValidating(false);
			});
			return;
		}
        // server
        return Meteor.call("userExists", value);
    },
},
{
	_id: "name",
	type: "text",
	displayName: "Full name",
	required: true,
},
{
	_id: 'email',
	type: 'email',
	required: true,
	displayName: "email",
	re: /.+@(.+){2,}\.(.+){2,}/,
	errStr: 'Invalid email',
},
pwd
]);

AccountsTemplates.configure({
	preSignUpHook: function(pw, info) {
		
		var getRandomColor = function() {
			var letters = '0123456789abcder'.split('');
			var color = '#';
			for (var i = 0; i < 6; i++ ) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}
		info.profile.color = getRandomColor();
		console.log(info);
		info.bio = "";
		info.site = "";
		return info;
	}
})