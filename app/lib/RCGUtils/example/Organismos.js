'use strict';
/*
The library is allready loaded
var DynamicObjectUtils = require('../lib/RCGUtils/DynamicObjectUtils');

 */
class Organismos{
	constructor(dynobjBase){
		dynobjBase.funciones.add("isFamilia",this.isFamilia);
		dynobjBase.trazaItem=this.trazaItem;
		dynobjBase.creaDGA=this.creaDGA;
	}
	
	trazaItem(obj,iProf){
		var sLeft=fillLetrasLeft(3*iProf,""," ");
		var objPadre=obj.getOrgPadre();
		log(sLeft+obj.id + " " + obj.nombre + (objPadre!=""?" ["+ objPadre.id+"]":""));
		var objHijos=obj.getOrganismos();
		objHijos.recorrer(obj.factoria.trazaItem,iProf+1);
	}

	isFamilia(hsFamiliares){
	//organismos.funciones.add("isFamilia",function(hsFamiliares){
		var orgAux=this;
		while (true) {
			if (orgAux==""){
				return false;
			} else if (hsFamiliares.exists(orgAux.id)){
				return true;
			} else {
				orgAux=orgAux.getOrgPadre();
			}
		}
	}
	childConstructor(){
		// this es el objeto nuevo que se construye en una funcion nuevo();
		var obj=this;
		
//		obj.setOrgPadreAntiguaFuncion=obj.setOrgPadre;
//		obj.setOrgPadre=obj.setOrgPadreFuncionEspecifica;
	/*	var factoria=obj.getFactoria();
		if (typeof factoria.todosOrgs==="undefined"){
			factoria.todosOrgs=factoriaHashMaps.newHashMap();
		}
		factoria.todosOrgs.add(this.id,this);
		*/
	}
	creaDGA(){
		var orgAux=this.nuevo("Departamento de Hacienda","HAAP");
		orgAux.addSubOrganismo(this.nuevo("Secretaría General Técnica","SGT"));
		orgAux.addSubOrganismo(this.nuevo("Intervención General","INTERV"));
		orgAux.addSubOrganismo(this.nuevo("Direccion General de Presupuestos, Financiación y Tesorería","DGPFT"));
		orgAux.addSubOrganismo(this.nuevo("Dirección General de Tributos","DGTRIB"));
		var nSubOrg=this.nuevo("Dirección General de Función Pública y Calidad de los Servicios","DGFPCS");
		var orgAux2=orgAux.addSubOrganismo(nSubOrg);
		orgAux.addSubOrganismo(this.nuevo("Dirección General de Contratación, Patrimonio y Organización","DGCPO"));
		orgAux2.addSubOrganismo(this.nuevo("Inspección General de Servicios","IGS"));
		orgAux2.addSubOrganismo(this.nuevo("Servicio de Gestión de Personal","SGP"));
		orgAux2.addSubOrganismo(this.nuevo("Servicio de Clasificación y Provisión de Puestos de Trabajo","SCPPT"));
		orgAux2.addSubOrganismo(this.nuevo("Servicio de Relaciones Laborales y Asuntos Sociales","SRLAS"));
		orgAux2.addSubOrganismo(this.nuevo("Servicio de Regimen Jurídico","SRJ"));
		orgAux2.addSubOrganismo(this.nuevo("Instituto Aragonés de Administración Pública","IAAP"));
	}
}
module.exports=Organismos;


