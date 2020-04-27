import {hello, bye} from "./modules/example"

   
hello();  
bye(); 


(()=>{
	if (document.body.classList.contains('home')) {
		// functions here
	}else if (document.body.classList.contains('portfolio')) {
		// functions here
	}else if (document.body.classList.contains('contact')) {
		// functions here
	}
})();
