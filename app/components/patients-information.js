import Component from '@ember/component';

export default Component.extend({
	severity: "1",
	actions: {
		setSelection: function(selected) {
      		this.set('severity', selected);
      		console.log(this.get('severity'));
    	},
    	signUp: function(){
    		$.post("http://34.199.49.88:3000/api/register",
				{
					name: this.get('name'),
					email: this.get('email'),
					password: this.get('password'),
					age: this.get('age'),
					sex: this.get('sex'),
					address: this.get('address'),
					contact: this.get('contact'),
					doa: this.get('date_of_admission'),
					weight: this.get('weight'),
					height: this.get('height'),
					severity: this.get('severity'),
					blood_pressure: this.get('blood_pressure'),
					suger_level: this.get('sugar_level'),
					blood_group: this.get('blood_group'),
					temperature: this.get('temperature'),
					heart_rate: this.get('heart_rate'),
					respirationrate: this.get('respirationrate'),
					disease_diagnosed: this.get('disease_diagnosed'),
					threshold_bp: this.get('threshold_bp'),
					threshold_temp: this.get('threshold_temp'),
					threshold_rr: this.get('threshold_rr'),
					threshold_heartrate: this.get('threshold_heartrate'),
					threshold_sugar: this.get('threshold_sugar'),
					type: 1,

				}
				,
				function(data,status){
					console.log(status);
				}
			);
    	}
    }
});
