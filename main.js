let play = document.querySelector('.play'),
	gameField = document.querySelector('#tic-tac-toe'),
	newGame = document.querySelector('.new_game');

	// Выбор режима игры (1 или 2 игрока)
	play.addEventListener('click', event => {
		
	});

	// Выбор режима игры (1 или 2 игрока)
	play.addEventListener('click', event => {
		let target = event.target;
		let mode = target.classList.item(0);
		play.setAttribute('hidden', 'hidden');

		newGame.removeAttribute('hidden');

		new TicTacToe(gameField, mode);
	});

class TicTacToe{
	constructor(elem, mode){
		this.elem = elem;
		this.mode = mode;
		this.clickCount = 0;

		this._init();

		let id1 = document.querySelector('#id1'),
			id2 = document.querySelector('#id2'),
			id3 = document.querySelector('#id3'),
			id4 = document.querySelector('#id4'),
			id5 = document.querySelector('#id5'),
			id6 = document.querySelector('#id6'),
			id7 = document.querySelector('#id7'),
			id8 = document.querySelector('#id8'),
			id9 = document.querySelector('#id9');

		this.addTicTac = this.addTicTac.bind(this);
		this.elem.addEventListener('click', this.addTicTac);

		// Начать игру заново
		newGame.addEventListener('click', event => {
			newGame.setAttribute('hidden', 'hidden');
			gameField.innerHTML = '';
			play.removeAttribute('hidden');
		} );
	}

	// Построение поля
	_init(){
		for(let i=1; i<=9; i++){
			let field = document.createElement('div');
			field.setAttribute('id', 'id'+i);
			field.classList.add('field');
			this.elem.append(field);
		}
	}

	// Добавление крестика или нолика по клику
	addTicTac(){

		let target = event.target;

		if(this.mode == 'alone'){
			if(target.innerHTML == ''){
				target.innerHTML = 'X';
				if(this.checkWinner(target)){
					return;
				}

				this.cpuTurn();
			}
		}

		if(this.mode == 'together'){
			if(target.innerHTML == ''){
				if(this.clickCount % 2 === 0){
					target.innerHTML = 'X';
				} else {
					target.innerHTML = 'O';
				}
				this.clickCount++;
				this.checkWinner(target);
			}
		}
	}

	// Ход компьютера
	cpuTurn(){
		let fields = Array.from(document.querySelectorAll('.field'));
		let emptyFields = fields.filter( field => { return field.innerHTML == ''; } );

		let min = 0,
			max = emptyFields.length - 1,
			rand = min + Math.floor(Math.random() * (max + 1 - min));

		emptyFields[rand].innerHTML = 'O';
		if(this.checkWinner(emptyFields[rand])){
			return;
		}
	}

	// Проверка кто выиграл, крестики или нолики
	whoWins(target){
		(target.innerHTML === 'X') ?
			setTimeout( function() { alert('Победили крестики') }, 0) :
			setTimeout(function() { alert('Победили нолики') }, 0);
		this.elem.removeEventListener('click', this.addTicTac);
	}

	// Проверка выигрышной комбинации
	checkWinner(target){

		if(id5.innerHTML !== ''){
			if(
				(id4.innerHTML === id5.innerHTML && id4.innerHTML === id6.innerHTML) ||
				(id2.innerHTML === id5.innerHTML && id2.innerHTML === id8.innerHTML) ||
				(id1.innerHTML === id5.innerHTML && id1.innerHTML === id9.innerHTML) ||
				(id3.innerHTML === id5.innerHTML && id3.innerHTML === id7.innerHTML)
			  )
			  {	this.whoWins(target); return target; }
		}

		if(id1.innerHTML !== ''){
			if(
			   (id1.innerHTML === id2.innerHTML && id1.innerHTML === id3.innerHTML) ||
			   (id1.innerHTML === id4.innerHTML && id1.innerHTML === id7.innerHTML)
			  )
			  {	this.whoWins(target); return target; }
		}

		if(id9.innerHTML !== ''){
			if(
			   (id7.innerHTML === id8.innerHTML && id7.innerHTML === id9.innerHTML) ||
			   (id3.innerHTML === id6.innerHTML && id3.innerHTML === id9.innerHTML)
			  )
			  {	this.whoWins(target); return target; }
		}
	}

}