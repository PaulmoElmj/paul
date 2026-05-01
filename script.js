function toggleform(id){
   const modal = document.getElementById('form-'+ id) ;
   if (modal){
    modal.classList.toggle('hidden');
    console.log("fenetre"+ id + "ouverte!");
   }else{
    console.error("ID form-" + id + "introuble!")
   }
}
// Fonction pour enregistrer le vote de N'IMPORTE QUEL candidat
function enregistrerVote(id) {
    const matriculeInput = document.getElementById('matricule-' + id);
    if (!matriculeInput) return;

    const matricule = matriculeInput.value;

    if (matricule === "") {
        alert("Veuillez entrer votre matricule !");
        return;
    }

    // Vérifie si ce matricule a déjà voté TOUT COURT (un seul vote autorisé)
    if (localStorage.getItem('deja_vote_' + matricule)) {
        alert("Désolé, ce matricule a déjà servi pour un vote !");
        return;
    }

    // Récupérer, incrémenter et sauvegarder
    let votes = parseInt(localStorage.getItem('votes_cand_' + id) || 0);
    votes++;
    
    localStorage.setItem('votes_cand_' + id, votes);
    localStorage.setItem('deja_vote_' + matricule, 'true');

    // Mise à jour visuelle du bon compteur
    document.getElementById('count-' + id).innerText = votes;

    alert("Vote enregistré pour le candidat n°" + id);
    toggleform(id);
}

// Charger TOUS les scores au démarrage
window.onload = function() {
    // Si tu as 10 candidats, on boucle de 1 à 10
    for (let i = 1; i <= 10; i++) {
        const score = localStorage.getItem('votes_cand_' + i) || 0;
        const element = document.getElementById('count-' + i);
        if (element) {
            element.innerText = score;
        }
    }
};

function scrollMenu(direction){
    const menu = 
    document.getElementById('category-menu');
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
