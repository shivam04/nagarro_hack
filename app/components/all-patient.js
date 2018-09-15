import Component from '@ember/component';

export default Component.extend({
	model: null,
	patients: Ember.inject.service(),
	init: function(){
		this._super();
		this.set('model',this.get('patients').getPatients());
		var data = this.get('model');
		data = JSON.parse(data);
		this.set('model',data.data);

	}
});
