export function setList(db, $form, collection, addDoc) {
    $form.addEventListener('submit', e => {
        e.preventDefault();
        let data = addDoc(collection(db, "task"), {
            title: $form.titulo.value,
        });
        $form.titulo.value = '';
    });
};