window.addEventListener('DOMContentLoaded', (e) =>{
  const searchForm = document.querySelector('#github-form')
  searchForm.addEventListener('submit', handleSubmit)
})

function handleSubmit(e){
  e.preventDefault()
  const searchFor = e.target[0].value
  searchUser(searchFor)
  document.querySelector('form').reset()
}

function searchUser(user){
  fetch(`https://api.github.com/search/users?q=${user}`)
  .then(resp => resp.json())
  .then(data => displayUsers(data))

  function displayUsers(userObj){
    const userList = document.querySelector('#user-list')
    userList.innerHTML = ''
    userList.style.cursor = 'pointer'
    userList.style.textAlign = 'left'

    userObj.items.forEach(item => {
      const li = document.createElement('li')
      const userName = item.login 
      const profileLink = item.html_url 
      const profilePic = item.avatar_url
      li.textContent = item.login
      li.setAttribute('href', profileLink)
      li.addEventListener('click', () => {
        userList.hidden = true
        const returnBtn = document.createElement('button')
        const userCard = document.createElement('div')
        const br = document.createElement('br')
        const header = document.createElement('h2')
        const a = document.createElement('a')
        const img = document.createElement('img')
        const repos = document.createElement('a')
        userCard.id = userName
        header.textContent = userName
        a.href = profileLink
        a.textContent = 'Profile Page'
        a.target = '_blank'
        img.src = profilePic
        repos.textContent = "View Repositories"
        repos.href = "#"
        repos.addEventListener('click', fetchRepoList)
        returnBtn.textContent = 'Return to User List'
        returnBtn.addEventListener('click', () => {
          userList.hidden =  false 
          userCard.remove()
        })
        document.querySelector('#github-container').appendChild(userCard)
        userCard.append(returnBtn, br, header, a, br, repos, img)
      })
      userList.appendChild(li)
    })

  }
}

function fetchRepoList(e){
  header = e.target.previousSibling.previousSibling.previousSibling
  userName = header.textContent
  fetch(`https://api.github.com/users/${userName}/repos`)
  .then(resp => resp.json())
  .then(data => createRepoList(data))
}

function createRepoList(e){
  console.log(e)
  const userName = document.querySelector('#github-container div h2').textContent
  const userCard = document.querySelector('#github-container div')
  const userPic = document.querySelector('#github-container div img')
  userPic.style.height = '200px'
  userPic.style.width = '200px'
  e.forEach(repo => {
    const a = document.createElement('a')
    const br = document.createElement('br')
    a.textContent = repo.name
    a.target = "_blank"
    a.href = repo.clone_url
    userCard.append(a, br)
})

}