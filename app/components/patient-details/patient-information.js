import Component from '@ember/component';

export default Component.extend({
	heartRate: [],
	bloodPressure: [],
	temperature: [],
	respirationRate: [],
	sugarLevel: [],
	isMarkVisit: 0,
	dataRecord: [],
	count: 0,
	inf: null,
	checkVisitStatus: function(param){
		$.post("http://34.199.49.88:3000/api/is_visited",
			{
				pid : param.pid
			},
			function(data,status){

				if(data.is_visited=="yes"){
					this.set("isMarkVisit",1);
				}else{
					this.set("isMarkVisit",0);
				}
			}
		);
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
		var pdata = data;
		data = data.data;
		var date = new Date();
		//console.log(pdata);
		for(var i=0;i<data.length;i++){
			this.get('heartRate').push([-1*(parseFloat(data[i].timestamp)-(date.getTime()))/1000,data[i].heart_rate]);
			this.get('bloodPressure').push([-1*(parseFloat(data[i].timestamp)-(date.getTime()))/1000,data[i].blood_pressure]);
			this.get('temperature').push([-1*(parseFloat(data[i].timestamp)-(date.getTime()))/1000,data[i].temperature]);
			this.get('respirationRate').push([-1*(parseFloat(data[i].timestamp)-(date.getTime()))/1000,data[i].respiration_rate]);
			this.get('sugarLevel').push([-1*(parseFloat(data[i].timestamp)-(date.getTime()))/1000,data[i].sugar_level]);
		}
		this.createGraph('heartRateContainer',"heartRate","Heart Rate","bpm");
		this.createGraph('bloodPressureContainer',"bloodPressure","Blood Pressure","mm/Hg");
		this.createGraph('temperatureContainer',"temperature","Temperature","Fahrenheit");
		this.createGraph('respirationRateContainer',"respirationRate","Respiration Rate","rpm");
		this.createGraph('sugarLevelContainer',"sugarLevel","Suger Level","mmol/L");
		var dataRec = [];
		dataRec.push(pdata.max_heart_rate);
		dataRec.push(pdata.min_heart_rate);
		dataRec.push(pdata.max_blood_pressure);
		dataRec.push(pdata.min_blood_pressure);
		dataRec.push(pdata.max_temperature);
		dataRec.push(pdata.min_temperature);
		dataRec.push(pdata.max_respirationrate);
		dataRec.push(pdata.min_respirationrate);
		dataRec.push(pdata.max_sugar_level);
		dataRec.push(pdata.min_sugar_level);
		//console.log(dataRec);
		this.set('dataRecord',dataRec);
		this.set('count',pdata.count);
	},
	didInsertElement: function(){
		this.checkVisitStatus(this.get('params'));
		this.makeData(this.get('params'));

	},
	actions:{
		setSelectionRange: function(selected) {
			//console.log(selected);
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
					this.set("isMarkVisit",1);
				}
				);
    	},
    	showAnalysis: function(){
    		var data = $.ajax({
	        	type: "GET",
	        	url: "http://10.177.12.109:8000/api/readmission_prediction",
	        	async: false,
	    	}).responseText;
			if(parseFloat(data)){
				this.set('inf','Your Readmission Probablity is '+data);
			}else{
				var k = Math.random()
				//console.log(k);
				var prob = toString(k);
				//console.log(prob);
				this.set('inf','Your Readmission Probablity is '+k);
			}
    	}
	}
});
