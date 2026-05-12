<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
// Code pour traiter le clic sur les boutons de clôture
if (isset($_GET['action'])) {
    $nouveau_statut = ($_GET['action'] == 'cloturer') ? 'ferme' : 'ouvert';
    $update = $pdo->prepare("UPDATE configuration SET statut_scrutin = ? WHERE id = 1");
    $update->execute([$nouveau_statut]);
    header("Location: admin.php"); // Rafraîchit la page
}

// On récupère le statut actuel pour l'affichage
$status_actuel = $pdo->query("SELECT statut_scrutin FROM configuration WHERE id = 1")->fetchColumn();
?>

<div style="background: #333; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 20px; border: 1px solid #444;">
    <h3>Statut du scrutin : 
        <span style="color: <?php echo ($status_actuel == 'ouvert') ? '#00ff88' : '#ff4444'; ?>;">
            <?php echo strtoupper($status_actuel); ?>
        </span>
    </h3>
    
    <?php if ($status_actuel == 'ouvert'): ?>
        <a href="admin.php?action=cloturer" onclick="return confirm('Êtes-vous sûr de vouloir fermer les votes ?')" 
           style="background: #ff4444; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
           🔒 CLÔTURER LES VOTES
        </a>
    <?php else: ?>
        <a href="admin.php?action=ouvrir" 
           style="background: #0099ff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
           🔓 RÉOUVRIR LES VOTES
        </a>
    <?php endif; ?>
</div>
    
</body>
</html>