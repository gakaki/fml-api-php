
Employee = Ext.extend(Ext.util.Observable, {
	
	out_value  : 'out',
    constructor: function(config){
		
    	this.in_value  =  'in';
    	
        this.addEvents({
            "change_value" : true
        });

        this.listeners = config.listeners;
        Employee.superclass.constructor.call(this, config)
    },
    
    set_zu:function(){
  
    	this.fireEvent('change_value','zu',this.out_value,this.in_value);
    },
    set_mai:function(){
    	this.fireEvent('change_value','mai',this.out_value,this.in_value);
    }
    
});


var newEmployee = new Employee({

    listeners: {
        change_value: function(zu_or_mai,out_value,in_value) {
            console.log(zu_or_mai,out_value,in_value);
        }
    }
});


newEmployee.on({
	'change_value' : function(zu_or_mai,out_value,in_value){
		console.log(zu_or_mai,out_value,in_value);	
	}	
});


//完全没有问题 public private
console.log(newEmployee.out_value);
console.log(newEmployee.in_value);
newEmployee.out_value = 'out_set';
newEmployee.in_value = 'in_set';
console.log(newEmployee.out_value);
console.log(newEmployee.in_value);


newEmployee.set_zu();
newEmployee.set_mai();





console.log('emplayeee out value',Employee.out_value);
console.log('emplayeee in value', Employee.in_value);
Employee.out_value = 'out_set';
Employee.in_value = 'in_set';
console.log(Employee.out_value);
console.log(Employee.in_value);

