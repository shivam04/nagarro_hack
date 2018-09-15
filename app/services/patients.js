import Service from '@ember/service';

export default Service.extend({
	getPatients(){
		return $.ajax({
        	type: "GET",
        	url: "http://34.199.49.88:3000/api/patient",
        	async: false,
        	data: 'json',
    	}).responseText;
	}
});
