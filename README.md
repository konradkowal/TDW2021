Para que funcione correctamente la web, es necesario que se aloje en un servidor como el servidor live de Visual Studio Code.

El motivo de esto es por que bajo la carpeta ./data/ se encuentran los .json que dan vida a la estructura de datos y, como se puede ver en el fichero utils.js entre las lineas 252 y 266, hace un get hacia el recurso local con los .json. 

Sé que esto se podia arreglar metiendo los json en los javascript, pero me parecía mas elegante tener separadas las estrucutras de datos.

