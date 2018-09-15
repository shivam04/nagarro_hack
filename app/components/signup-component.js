import Component from '@ember/component';

export default Component.extend({
	User: 'Doctor',
	otherUser: 'Patient',
	doctor: true,
	actions: {
		changeSignupForm: function(){
			if(this.get('doctor')){
				this.set('User','Patient');
				this.set('otherUser','Doctor');
				this.set('doctor',false);
			}else{
				this.set('User','Doctor');
				this.set('otherUser','Patient');
				this.set('doctor',true);
			}
		}
	}
});
