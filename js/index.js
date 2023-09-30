document.addEventListener("DOMContentLoaded", () => {
    //1. search users by login
    //let searchAtribute = document.querySelector('input[name=search]').value
    function information(data) {
        const users = document.querySelector('#user-list');
        users.innerHTML = "";
        data.items.forEach(user => {
            const userName = document.createElement('h2');
            const avatar = document.createElement('img');
            const link = document.createElement('a');

            userName.textContent = user.login;
            userName.id = 'username';
            avatar.src = user.avatar_url;
            link.href = user.html_url;
            link.text = "Profile";

            const userContainer = document.createElement('li')
            userContainer.appendChild(userName)
            userContainer.appendChild(avatar)
            userContainer.appendChild(link);
            users.appendChild(userContainer)
        })
    }
    document.querySelector('#github-form').addEventListener('submit', userSearch);
    function userSearch(event) {
        event.preventDefault();
        let searchAtribute = document.querySelector('input[name=search]').value;
        fetch(`https://api.github.com/search/users?q=${searchAtribute}`)
            .then(res => res.json())
            .then(data => {
                //2. Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
                information(data)
            })
    }

    
document.querySelector('#user-list').addEventListener('click', getRepos)
function getRepos(){
    let searchAtribute = document.querySelector('input[name=search]').value
    fetch(`https://api.github.com/users/${searchAtribute}/repos`)
    .then(resp=>resp.json())
    .then(data=>{
        const reposList = document.querySelector('#repos-list');
        data.forEach(repo => {
            const repoName = document.createElement('h2');
            const repoLink = document.createElement('a');

            repoName.textContent = repo.name;
            repoLink.href = repo.html_url;
            repoLink.textContent = 'View Repo';

            const repoContainer = document.createElement('li');
            repoContainer.appendChild(repoName);
            repoContainer.appendChild(repoLink);
            reposList.appendChild(repoContainer)
        })


    })

}
})