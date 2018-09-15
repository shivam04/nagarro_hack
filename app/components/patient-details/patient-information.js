import Component from '@ember/component';

export default Component.extend({
	heartRate: [],
	bloodPressure: [],
	temperature: [],
	respirationRate: [],
	sugarLevel: [],
	isVisited: false,
	checkVisitStatus: function(param){

	},
	clearGraph: function(){
		$('#heartRateContainer').val('');
		$('#bloodPressureContainer').val('');
		$('#temperatureContainer').val('');
		$('#respirationRateContainer').val('');
		$('#sugarLevelContainer').val('');
		this.set('heartRate',[]);
		this.set('bloodPressure',[]);
		this.set('temperature',[]);
		this.set('respirationRate',[]);
		this.set('sugarLevel',[]);
	},
	createGraph: function(id, val, str, yTitle){
		var data_point = [];
		for(var i=0;i<this.get(val).length;i++){
			data_point.push({x:(this.get(val)[i][0]/60),y:this.get(val)[i][1]});			
		}
		var options = {
		animationEnabled: true,  
		title:{
			text: str
		},
		axisX: {
			title: "Time (in minutes)"
		},
		axisY: {
			title: yTitle,
			includeZero: false
		},
		data: [{
			xValueFormatString: "###.##",
			type: "spline",
			dataPoints: data_point
			}]
		};
		$("#"+id).CanvasJSChart(options);
	},
	makeData: function(param){
		this.clearGraph();
		var data = $.ajax({
	        	type: "POST",
	        	url: "http://34.199.49.88:3000/api/get_patient_logs",
	        	async: false,
	        	data: {"pid":param.pid,"time":param.time},
	    	}).responseText;
		data = JSON.parse(data);
		data = data.data;
		var date = new Date();
		for(var i=0;i<data.length;i++){
			this.get('heartRate').push([-1*(parseFloat(data[i].timestamp)-(date.getTime()))/1000,data[i].heart_rate]);
			this.get('bloodPressure').push([-1*(parseFloat(data[i].timestamp)-(date.getTime()))/1000,data[i].blood_pressure]);
			this.get('temperature').push([-1*(parseFloat(data[i].timestamp)-(date.getTime()))/1000,data[i].temperature]);
			this.get('respirationRate').push([-1*(parseFloat(data[i].timestamp)-(date.getTime()))/1000,data[i].respiration_rate]);
			this.get('sugarLevel').push([-1*(parseFloat(data[i].timestamp)-(date.getTime()))/1000,data[i].sugar_level]);
		}
		//console.log(this.get('heartRate'));
		//console.log(this.get('bloodPressure'));
		//console.log(this.get('temperature'));
		//console.log(this.get('respirationRate'));
		//console.log(this.get('sugarLevel'));
		this.createGraph('heartRateContainer',"heartRate","Heart Rate","bpm");
		this.createGraph('bloodPressureContainer',"bloodPressure","Blood Pressure","mm/Hg");
		this.createGraph('temperatureContainer',"temperature","Temperature","Fahrenheit");
		this.createGraph('respirationRateContainer',"respirationRate","Respiration Rate","rpm");
		this.createGraph('sugarLevelContainer',"sugarLevel","Suger Level","mmol/L");
	},
	didInsertElement: function(){
		this.checkVisitStatus(this.get('params'));
		this.makeData(this.get('params'));
	},
	actions:{
		setSelectionRange: function(selected) {
			console.log(selected);
			this.get('params').time = parseInt(selected);
      		//this.makeData(this.get('params'));
    	},
    	showGraph: function(){
    		this.makeData(this.get('params'));
    	},
    	markVisit: function(){
    		$.post("http://34.199.49.88:3000/api/mark_visit",
    			{
					did : 1001,
					pid : this.get("params").pid
				},
				function(data,status){
					console.log(status);
				}
				);
    	}
	}
});
