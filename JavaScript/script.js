function afficherCV(profil) {
    const cv = document.createElement("div");
    cv.id = "cv";

    const titre = document.createElement("h1");
    titre.id = "titre";
    titre.textContent = profil.nom;

    const soustitre = document.createElement("h2");
    soustitre.id = "soustitre";
    soustitre.textContent = profil.poste;

    const infos = document.createElement("div");
    infos.id = "infos";
    infos.textContent = profil.infos;

    const resume = document.createElement("div");
    resume.id = "resume";
    resume.textContent = profil.resume;

    const competences = document.createElement("ul");
    competences.id = "competences";
    profil.competences.forEach(c => {
        const li = document.createElement("li");
        li.textContent = c;
        competences.appendChild(li);
    });

    cv.append(titre, soustitre, infos, resume, competences);
    document.body.appendChild(cv);
}

function formatUnixTimestamp(ts) {
    const d = new Date(ts * 1000);
    return d.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
}

function afficherGitHub(username) {
    const base = 'https://api.github.com/users/' + encodeURIComponent(username);

    const userReq = fetch(base, { headers: { 'Accept': 'application/vnd.github+json' } });
    const repoReq = fetch(base + '/repos?sort=updated&per_page=1', { headers: { 'Accept': 'application/vnd.github+json' } });

    Promise.all([userReq, repoReq])
        .then(async ([resUser, resRepo]) => {
            if (!resUser.ok) throw { type: 'user', res: resUser };
            if (!resRepo.ok) throw { type: 'repo', res: resRepo };

            const user = await resUser.json();
            const repos = await resRepo.json();

            const ancienGithub = document.getElementById("github");
            if (ancienGithub) ancienGithub.remove();

            const githubBloc = document.createElement("div");
            githubBloc.id = "github";

            let lastRepoHtml = '<p class="small">Aucun dépôt récent.</p>';
            if (Array.isArray(repos) && repos.length > 0) {
                const repo = repos[0];
                lastRepoHtml = `
                    <p><strong>Dernier dépôt :</strong> <a href="${repo.html_url}" target="_blank">${repo.name}</a></p>
                    <p class="small">${repo.description || ''} • ${repo.language || 'Langue non renseignée'}</p>
                    <p class="small">Mise à jour : ${formatUnixTimestamp(new Date(repo.updated_at).getTime() / 1000)}</p>
                `;
            }

            githubBloc.innerHTML = `
                <div class="meta">
                    <img class="avatar" src="${user.avatar_url}" alt="avatar">
                    <div>
                        <div><strong><a href="${user.html_url}" target="_blank">${user.login}</a></strong></div>
                        <div class="small">${user.name || ''} • ${user.public_repos} repos • ${user.followers} followers</div>
                    </div>
                </div>
                <div>
                    <p>${user.bio || ''}</p>
                    ${lastRepoHtml}
                </div>
            `;

            document.getElementById("cv").appendChild(githubBloc);
        })
        .catch(async err => {
            let message = 'Erreur lors de la récupération GitHub.';
            if (err && err.res instanceof Response) {
                const r = err.res;
                if (r.status === 403) {
                    const remaining = r.headers.get('X-RateLimit-Remaining');
                    const reset = r.headers.get('X-RateLimit-Reset');
                    if (remaining === '0' && reset) {
                        const resetTime = formatUnixTimestamp(parseInt(reset, 10));
                        message = `Quota API dépassé. Réinitialisation à ${resetTime}.`;
                    } else {
                        message = `Accès refusé (403).`;
                    }
                } else if (r.status === 404) {
                    message = 'Utilisateur GitHub introuvable.';
                } else {
                    message = `Erreur HTTP ${r.status}`;
                }
            } else if (err && err.message) {
                message = err.message;
            }

            const ancienGithub = document.getElementById("github");
            if (ancienGithub) ancienGithub.remove();
            const githubBloc = document.createElement("div");
            githubBloc.id = "github";
            githubBloc.innerHTML = `<p style="color:red">${message}</p>`;
            const container = document.getElementById("cv");
            if (container) container.appendChild(githubBloc);
            else document.body.appendChild(githubBloc);
            console.error('Erreur GitHub :', err);
        });
}

fetch("profil.json")
    .then(response => response.json())
    .then(data => {
        afficherCV(data);
        afficherGitHub('ChefPhoque');
    })
    .catch(error => console.error("Erreur lors du chargement du profil :", error));
