<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'db.php';

// Fonction pour uploader l'image en toute sécurité
function uploadImage($file) {
    $targetDir = "uploads/"; // Crée ce dossier dans ton projet
    if (!is_dir($targetDir)) mkdir($targetDir, 0755, true);
    
    $fileName = basename($file["name"]);
    $targetFilePath = $targetDir . uniqid() . "_" . $fileName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
    
    // Vérifier le type de fichier (seulement images)
    $allowTypes = array('jpg','png','jpeg','gif');
    if (in_array($fileType, $allowTypes)) {
        if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
            return $targetFilePath;
        }
    }
    return false;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nom = htmlspecialchars($_POST['nom'] ?? '');
    $poste = htmlspecialchars($_POST['poste'] ?? '');
    $promotion = htmlspecialchars($_POST['promotion'] ?? '');
    
    if ($nom && $poste && $promotion && isset($_FILES['photo'])) {
        $photoPath = uploadImage($_FILES['photo']);
        if ($photoPath) {
            // Insérer dans la base (crée une table 'candidatures' avec colonnes : id, nom, poste, promotion, photo_path, date_soumission)
           // On récupère d'abord la connexion via la fonction
              $pdo = db_get_pdo(); 
                // Ensuite on peut préparer la requête
            $stmt = $pdo->prepare("INSERT INTO candidatures (nom, poste, promotion, photo) VALUES (?, ?, ?, ?)");
            if ($stmt->execute([$nom, $poste, $promotion, $photoPath])) {
                $success = "Candidature soumise avec succès !";
            } else {
                $error = "Erreur lors de l'enregistrement.";
            }
        } else {
            $error = "Erreur lors de l'upload de l'image.";
        }
    } else {
        $error = "Tous les champs sont requis.";
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Traitement Candidature</title>
</head>
<body>
    <h2>Résultat de la Candidature</h2>
    <?php if (!empty($error)): ?>
        <p style="color: red;"><?= htmlspecialchars($error) ?></p>
    <?php endif; ?>
    <?php if (!empty($success)): ?>
        <p style="color: green;"><?= htmlspecialchars($success) ?></p>
    <?php endif; ?>
    <a href="candidature.html">Retour au formulaire</a>
</body>
</html>