export function deleteList($delBtn, db, deleteDoc, doc) {
    $delBtn.addEventListener('click', (e) => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        let data = deleteDoc(doc(db, 'task', id));
    });
}