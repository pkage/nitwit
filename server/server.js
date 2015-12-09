bounceLoggedOut = function() {
	if (Meteor.userId() == null) {
		throw Meteor.Error('unauthorized', 'you need to be logged in to do that');
	}
}

Meteor.methods({
	'update_fullname': function(name) {
		bounceLoggedOut();
		check(name, String);
		return Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.name': name}});
	},
	'userExists': function(username){
		check(username, String);
		if (/[^a-zA-Z\d]/.test(username)) {
			return true;
		}
		return !!Meteor.users.findOne({username: username});
	},
	'update_color': function(color) {
		bounceLoggedOut();
		check(color, String);
		return Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.color': color}});
	},
	'post_twit': function(text) {
		bounceLoggedOut();
		check(text, String);
		// process out the hashtags and mentions
		var words = text.split(/\ |(\n)/);
		var hashtags = [];
		var mentions = [];
		for (var i = 0; i < words.length; i++) {
			var word = words[i];
			if (/^(\@)\w/.test(word)) {
				mentions.push(word.substr(1).split(/[^a-zA-Z\d]/)[0]);
			} else if (/^(\#)\w/.test(word)) {
				hashtags.push(word.substr(1).split(/[^a-zA-Z\d]/)[0]);
			}
		}


		// escape the entire string
		var lines = text.split('\n')
		var out = ''

		for (var i = 0; i < lines.length; i++) {
			out += _.escape(lines[i]);
			if (i + 1 != lines.length) {
				out += '<br>';
			}
		}

		return Twits.insert({
			hashtags: hashtags,
			mentions: mentions,
			author: Meteor.userId(),
			body: out,
			original: text,
			timestamp: new Date()
		})
	},
	'toggle_twit_star': function(id) {
		bounceLoggedOut();
		check(id, String);
		if (Stars.find({target: id, from: Meteor.userId()}).count()) {
			Stars.remove({target: id, from: Meteor.userId()});
		} else {
			Stars.insert({target: id, from: Meteor.userId()});
		}
	},
	'delete_twit': function(id) {
		bounceLoggedOut();
		check(id, String);
		// you can only do that to your own twit
		if (Twits.findOne({_id: id}).author != Meteor.userId()) {
			throw Meteor.Error('unauthorized', 'you can\'t do that to another account\'s twit!');
		}
		Twits.remove({_id: id});
		Stars.remove({target: id});
	},
	'update_bio': function(text) {
		bounceLoggedOut();
		check(text, String);
		escaped = _.escape(text).replace(/\n/g, '<br>');
		return Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.bio': {original: text, escaped: escaped}}});
	},
	'direct_message': function(target, text) {
		bounceLoggedOut();
		check(text, String);
		check(target, String);
		return Messages.insert({
			'from': Meteor.userId(),
			'to': target,
			'timestamp': new Date(),
			'msg': text
		})
	}
})