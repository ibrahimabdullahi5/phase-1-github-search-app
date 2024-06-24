document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = searchInput.value.trim();
      if (username) {
        fetchUserData(username);
        fetchUserRepos(username);
      }
    });
  
    function fetchUserData(username) {
      fetch(`https://api.github.com/users/${username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('User not found');
          }
          return response.json();
        })
        .then(user => {
          displayUser(user);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          userList.innerHTML = `<li>User not found</li>`;
        });
    }
  
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Repositories not found');
          }
          return response.json();
        })
        .then(repos => {
          displayRepos(repos);
        })
        .catch(error => {
          console.error('Error fetching repositories:', error);
          reposList.innerHTML = `<li>Repositories not found</li>`;
        });
    }
  
    function displayUser(user) {
      userList.innerHTML = `
        <li>
          <img src="${user.avatar_url}" alt="${user.login}" width="100">
          <p><strong>${user.login}</strong></p>
          <p>${user.bio ? user.bio : 'No bio available'}</p>
          <a href="${user.html_url}" target="_blank">View Profile</a>
        </li>
      `;
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = repos
        .map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)
        .join('');
    }
  });
  