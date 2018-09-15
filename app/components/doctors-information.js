import Component from '@ember/component';

export default Component.extend({
	actions:{
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
					joined_date: this.get('joined_date'),
					field: this.get('field'),
					type: 0
				}
				,
				function(data,status){
					console.log(status);
					console.log(data);
				}
			);
		}
	}
});
