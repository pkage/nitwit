Template.dm.rendered = function() {
	Session.set('dm-selected-user', null);
	var resizeHandler = function() {
		console.log('resized window')
	}
	$(window).on('resize', resizeHandler);
}

Template.dm.helpers({
	'users': function() {
		return Meteor.users.find({}, {sort: {username: 1}});
	},
	'selecteduser': function() {
		if (this._id == Meteor.userId()) {
			return 'hidden';
		}
		return (this._id == Session.get('dm-selected-user')) ? 'active' : '';
	},
	'ownmessage': function() {
		return (this.from == Meteor.userId()) ? 'dm-ownmessage' : 'dm-othermessage';
	},
	'validatemessagetarget': function() {
		if (Session.get('dm-selected-user') == null) {
			return 'disabled'
		} else {
			Meteor.setTimeout(function() {
				$('.dm-input-box').focus();
			}, 100);
		}
	},
	'relevantmessage': function() {
		return Messages.find({
			$or: [
				{
					to: Meteor.userId(),
					from: Session.get('dm-selected-user')
				},
				{
					to: Session.get('dm-selected-user'),
					from: Meteor.userId()
				}
				]
			}, {sort: {timestamp: -1}});
	}
});

Template.dm.events({
	'click .selectuser': function() {
		Session.set('dm-selected-user', this._id);
	},
	'submit .dm-input': function(ev) {
		ev.preventDefault();
		Meteor.call('direct_message', Session.get('dm-selected-user'), $('.dm-input-box').val(), function(err, ret) {
			if (err != null) {
				sAlert.error('something broke');
			} else {
				$('.dm-input-box').val('');
			}
		})
	}
})