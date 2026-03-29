# Guide de votre site — Nail Paris

## Accès à votre site

| Élément | URL / Info |
|---------|-----------|
| **Site** | https://client-nail.vercel.app |
| **Admin** | https://client-nail.vercel.app/admin |
| **Mot de passe admin** | `NailParis2024!` |
| **GitHub** | https://github.com/Bilelbettaieb97/client-nail |

---

## Votre espace d'administration

Rendez-vous sur `/admin` et entrez votre mot de passe pour accéder au tableau de bord.

### Dashboard
Vue d'ensemble : nombre de services, d'avis clients, messages non lus.

### Messages (`/admin/contacts`)
Tous les messages reçus via le formulaire de contact de votre site.
Cliquez sur un message pour voir le contenu complet.

### Services (`/admin/services`)
Modifiez vos prestations, tarifs et descriptions directement depuis cette page.
Vos changements seront visibles sur le site en moins d'une minute.

### Avis clients (`/admin/testimonials`)
Ajoutez, modifiez ou masquez les témoignages affichés sur votre site.

### Paramètres (`/admin/settings`)
**Important :** Configurez ici l'email sur lequel vous recevrez les notifications de nouveaux messages.

---

## Paramétrer votre email de notification

1. Connectez-vous à `/admin`
2. Cliquez sur **Paramètres** dans le menu gauche
3. Saisissez votre email (ex: `contact@nail-paris.fr`)
4. Cliquez **Sauvegarder**

Dorénavant, chaque message du formulaire de contact vous sera envoyé par email.

---

## Questions fréquentes

**Je ne vois pas mes modifications sur le site.**
→ Attendez 1 à 2 minutes — le site se met à jour automatiquement après chaque sauvegarde.

**J'ai oublié mon mot de passe admin.**
→ Contactez votre prestataire pour réinitialiser le mot de passe dans les variables d'environnement Vercel.

**Puis-je changer les photos de la galerie ?**
→ Oui, via la section Galerie dans l'admin. Vous pouvez ajouter des liens d'images (Unsplash, ou votre propre hébergeur).

**Le site s'affiche-t-il bien sur mobile ?**
→ Oui, il est conçu "mobile first" et fonctionne sur tous les appareils et navigateurs.

---

## Déploiements automatiques

Votre site est connecté à GitHub. Chaque modification approuvée sur la branche `main` déclenche automatiquement un nouveau déploiement sur Vercel en moins de 2 minutes.

---

*Site réalisé par Convertilab · contact@convertilab.fr*
