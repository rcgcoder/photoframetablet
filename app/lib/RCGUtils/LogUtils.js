'use strict';
var process = require('process');
var BaseUtils = require('./BaseUtils.js');

class LoggerFactory{
	constructor(){
		var self=this;
		self.loggers={};
	}
	getLogger(){
	   var self=this;
	   var sPID=process.pid;
	   if (isUndefined(self.loggers[sPID])){
		   var newLogger=new LogUtils();
		   newLogger.pid=sPID;
		   self.loggers[sPID]=newLogger;
	   }
	   return self.loggers[sPID];
	}
	removeLooger(){
		var logger=getLogger();
		self.loggers[logger.pid]=vUndefined;
	}
}

global.loggerFactory=new LoggerFactory(); 	
class LogUtils{
    constructor() {
    	var self=this;
    	self.logToBuffer=false;
    	self.logBuffers=[];
    	self.logText="";
    	self.bAutoTrace=false;
    	self.fncAutoTrace="";
    }
	logClear(){
		var self=loggerFactory.getLogger();
		self.logText="";
	}
/*	logUpdate(sCad){
		this.logClear();
		this.log(sCad);	
		var areaLog=$("#log");
		areaLog.val(logText);
		if(areaLog.length){
	       areaLog.scrollTop(areaLog[0].scrollHeight - areaLog.height());
		}
	}
	function fncAutoTrace(){
		var areaLog=$("#log");
		areaLog.val(logText);
		if(areaLog.length){
	       areaLog.scrollTop(areaLog[0].scrollHeight - areaLog.height());
		}
		if (bAutoTrace){
			setTimeout(fncAutoTrace,3000);
		}
	}
	*/
	setLogToBuffer(bVal){
		var self=loggerFactory.getLogger();
		self.logToBuffer=bVal;
		if (bVal){
			if (!self.bAutoTrace){
				self.bAutoTrace=true;
				if (self.fncAutoTrace!=""){
					self.fncAutoTrace();
				}
			}
		} else {
			self.bAutoTrace=false;
		}
	}
	log(sTraza){
		var self=loggerFactory.getLogger();
		if (self.logToBuffer){
			self.logText+="\n"+sTraza;
		} else {
			console.log(sTraza);
		}
	}
	logPush(){
		var self=loggerFactory.getLogger();
		self.logBuffers.push(self.logText);
		self.logText="";
		self.setLogToBuffer(true);
		self.logToBuffer=true;
	}
	logPop(bNextToBuffer){
		var self=loggerFactory.getLogger();
		var sResult=self.logText;
		self.logText=self.logBuffers.pop();
		if (typeof bNextToBuffer!=="undefined"){
			self.setLogToBuffer(bNextToBuffer);
			if (bNextToBuffer){
				console.log(sResult);
			}
		}
		return sResult;
	}
}
module.exports=LogUtils;
