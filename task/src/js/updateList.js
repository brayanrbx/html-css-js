export function updateList($updateBtn, update, db, doc, updateDoc) {
    $updateBtn.addEventListener('click', (e) => {
        update.newTitle = document.getElementsByName('newTitle')[0].value;
        let data = doc(db, 'task', update.updateId);
        updateDoc(data, {title: update.newTitle});
        document.getElementsByName('newTitle')[0].value = '';
    });
}