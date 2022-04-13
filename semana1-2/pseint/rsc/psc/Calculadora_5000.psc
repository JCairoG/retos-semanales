Proceso Calculadora_5000
	definir num1 			Como Real;
	definir num2 			Como Real;
	definir valores 		Como Caracter;
	definir oper 			Como Caracter;
	definir i 				Como Entero;
	definir largocadena 	Como Entero;
	
	Escribir "Ingrese la operacion a realizar"; //por ejem 25*5
	leer valores;
	
	largocadena=Longitud(valores);
	
	para i=1 Hasta largocadena
		oper=subcadena(valores,i,i);	//busca el operador en la cadena valores
		Si oper="+" o oper="-" o oper="*" o oper="/" Entonces
			num1=ConvertirANumero(subcadena(valores,1,i-1));
			num2=ConvertirANumero(subcadena(valores,i+1,largocadena));
			i=largocadena;			
			segun oper hacer
				"+": Escribir "La suma de ",num1,"+",num2," es ",ConvertirATexto(num1+num2);
				"-": Escribir "La resta de ",num1,"-",num2," es ",ConvertirATexto(num1-num2);
				"*": Escribir "La multiplicacion de ",num1,"*",num2," es ",ConvertirATexto(num1*num2);
				"/": 
					si num2<>0 Entonces
						Escribir "La division de ",num1,"/",num2," es ",ConvertirATexto(num1/num2);
					SiNo
						Escribir "La division ",num1,"/",num2," no es valida";
					FinSi
				De Otro modo: Escribir "La operación seleccionada no es valida";
			FinSegun
		FinSi
	FinPara
FinProceso