// Capturar evento de submit do formulário

const form = document.querySelector('#form');

form.addEventListener('submit', function(e) {
	e.preventDefault();
	const inputPeso = e.target.querySelector('#peso');
	const inputAltura = e.target.querySelector('#altura');

	const peso = Number(inputPeso.value);
	const altura = Number(inputAltura.value);

	if(!peso){
		setResult('Peso inválido', false);
		return;
	}

	if(!altura){
		setResult('Peso inválido', false);
		return;
	}

	const imc = getImc(peso, altura);
	const { nivel, isValid } = getNivelImc(imc);

	const msg = `Seu IMC é ${imc} (${nivel})`;

	setResult(msg, isValid);
});

function getNivelImc(imc){
	const nivels = 
	[
		'Abaixo do peso',
		'Peso normal',
		'Sobrepeso',
		'Obesidade grau 1',
		'Obesidade grau 2',
		'Obesidade grau 3'
	];

	if(imc >= 39.9) {
		return { nivel: nivels[5], isValid:false }
	};

	if(imc >= 34.9){
		return { nivel: nivels[4], isValid:false }
	};

	if(imc >= 29.9){
		return { nivel: nivels[3], isValid:false }
	};

	if(imc >= 24.9){
		return { nivel: nivels[2], isValid:true }
	};

	if(imc >= 18.5){
		return { nivel: nivels[1], isValid:true }
	};

	if(imc < 18.5){
		return { nivel: nivels[0], isValid:false }
	};
}

function getImc(peso, altura) {
	const imc = peso / altura ** 2;
	return imc.toFixed(2);
}

function pCreate(){
	const p = document.createElement('p');
	return p;
}

function setResult(msg, isValid) {
	const result = document.querySelector('#result');
	result.innerHTML = '';

	const p = pCreate();

	if(isValid) {
		p.classList.add('paragrafo-result');
	} else {
		p.classList.add('bad');
	}

	p.innerHTML = msg;
	result.appendChild(p);
}

