function toggleform(id) {
    const form =
        document.getElementById('form-' + id);
    document.querySelectorAll(' .form-container').forEach(f => {
        if (f.id !== 'form-' + id) f.classList.add('hidden');
    });
    if (form) {
        form.classList.toggle('hidden');
    }
}
function validerVote(id) {
    alert("Merci ! Votre vote pour le candidat " + id + "est pris en compte.");

    const countSpan =
        document.getElementById('count-' + id);
    if (countSpan) {
        let actuel = parseInt(countSpan.innerText) || 0;
        countSpan.innerText = actuel + 1;
    }
    const form = document.getElementById('form-' + id);
    if (form) {
        form.classList.add('hidden');
    }
}
function scrollMenu(direction){
    const menu = 
    document.getElementById('category-Menu');
    const scrollAmount = 300;
    if (direction === 'left'){
        menu.scrollBy({ left:-scrollAmount,behavior:'smooth'});     
    }else{
        menu.scrollBy({ left:scrollAmount,behavior:'smooth'});
    }
    console.log("bouton clique,direction:"+ direction);
}
function toggleMenu() {
    const nav = document.getElementById('side-nav');
    // On ajoute ou retire la classe "active" définie dans le CSS
    nav.classList.toggle('active');
}

// Optionnel : Fermer le menu si on clique en dehors
window.onclick = function(event) {
    const nav = document.getElementById('side-nav');
    const burger = document.getElementById('burger-icon');
    if (!nav.contains(event.target) && !burger.contains(event.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
}
function toggleMenu(){
    const menu =
    document.getElementById('side-menu');
    menu.classList.toggle('active');
}
function toggleMenu() {
    const nav = document.getElementById('side-nav');
    nav.classList.toggle('active'); // active est définie dans ton CSS
}

// Soumission du formulaire
document.getElementById('candidateForm').addEventListener('submit', function(e){
    e.preventDefault();
    alert("Merci ! Votre candidature a été enregistrée avec succès.");
    this.reset();
});
