import {setList} from './setList.js';
import {deleteList} from './deleteList.js';
import {updateList} from './updateList.js';
const firebaseConfig = require('./firebaseConfig');

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, collection, doc, updateDoc, addDoc, deleteDoc, query,  orderBy, onSnapshot} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const  app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const update = {
	updateId: null,
	newTitle: "",
}

// global variables
const $lista = document.getElementById('lista-tareas');
const $form = document.getElementById('add-tarea-form');
const $updateBtn = document.getElementById('updateBtn');

// Controlling changes in the database
const data = query(collection(db, "task"), orderBy('title'));

const controllingC = onSnapshot(data, (snapshot) => {
	let cambios = snapshot.docChanges();
	cambios.forEach(cambio => {
		if (cambio.type === 'added') {
			renderList(cambio.doc);
		}
		else if (cambio.type === 'removed') {
			let li = $lista.querySelector(`[data-id=${cambio.doc.id}]`);
			$lista.removeChild(li);
		}
		else {
			let li = $lista.querySelector(`[data-id=${cambio.doc.id}]`);
			li.getElementsByTagName('span')[0].textContent = update.newTitle;
			update.newTitle = '';
			console.log("modified");
		}
	});
});

const renderList = (docu) => {
    let $li = document.createElement('li');
    $li.className = 'collection-item';
    $li.setAttribute('data-id', docu.id);

    let $div = document.createElement('div');
    let $titulo = document.createElement('span');
    $titulo.textContent = docu.data().title;

    let $enlace = document.createElement('a');
    $enlace.href = '#modal1';
    $enlace.className = 'modal-trigger secondary-content';

    let $ediBtn = document.createElement('i');
    $ediBtn.className = 'material-icons';
    $ediBtn.innerText = 'edit';

    let $delBtn = document.createElement('i');
    $delBtn.className = 'material-icons secondary-content';
    $delBtn.innerText = 'delete';

    $enlace.appendChild($ediBtn);
    $div.appendChild($titulo);
    $div.appendChild($delBtn);
    $div.appendChild($enlace);
    $li.appendChild($div);

    deleteList($delBtn, db, deleteDoc, doc);

	$ediBtn.addEventListener('click', (e) => {
		update.updateId = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
	});

    $lista.append($li);
}

updateList($updateBtn, update, db, doc, updateDoc);
const setTask = setList(db, $form, collection, addDoc);


