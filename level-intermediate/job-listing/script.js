const endpoint = './data.json'
const companies = new Array
const cardsTable = document.querySelector('.cards-table')

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => {
        companies.push(...data)
        setCompanies(companies)
    })

function setCompanies(array) {
    cardsTable.innerHTML = array.map(item => {
        const tools = [item.role].concat(item.level, item.languages, item.tools)
            .map(tool => `<li class="card-tool">${tool}</li>`)
            .join('')

        return `<div class="card">
        <div class="card-avatar">
            <img src="${item.logo}" alt="">
        </div>
        <div class="card-content">
          <div class="card-header">
            <h2 class="card-user">${item.company}</h2>
            ${verifyParam(item, 'new')}
            ${verifyParam(item, 'featured')}
          </div>
          <a href="#" class="card-position">${item.position}</a>
          <ul class="card-informations">
            <li class="card-postedAt">${item.postedAt}</h4>
            <li class="card-contract">${item.contract}</h4>
            <li class="card-location">${item.location}</h4>
          </ul>
        </div>
        <ul class="card-tools">
            ${tools}
        </ul>
      </div>`
    }).join('')

}

function verifyParam(user, param) {
    return user[param] ? `<span class="card-${param} card-hl">${param}</span>` : ''
}

const tagClear = document.querySelector('.tag-clear')
const tagsWrapper = document.querySelector('.tags-wrapper')
const tagList = document.querySelector('.tags')
const tags = []

cardsTable.addEventListener('click', e => {
    if (!e.target.classList.contains('card-tool')) return
    addTag(e.target.textContent)
})

function addTag(tag) {
    if (!tags.includes(tag)) tags.push(tag)
    setTags()
}

tagList.addEventListener('click', e => {
    if (!e.target.closest('.tag-bttn')) return
    removeTag(e.target.closest('.tag').querySelector('.tag-content').textContent)
})

function removeTag(tag) {
    if (tags.includes(tag)) tags.splice(tags.indexOf(tag), 1)
    setTags()
}

function setTags() {
    tagList.innerHTML = tags
        .map(tag => {
            return `<li class="tag">
            <span class="tag-content">${tag}</span>
            <button class="tag-bttn">
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </li>`
        }).join('')

    tags.length ? tagsWrapper.classList.add('active') : tagsWrapper.classList.remove('active')
    verifyTools()
}

tagClear.addEventListener('click', clearTags)

function clearTags(){
    tags.length = 0
    setTags()
}

function verifyTools(){
    const companiesFiltered = companies
        .filter(company => {
            const concat = company.languages.concat(company.tools, company.role, company.level)
            return tags.every(tag => concat.includes(tag)) ? company : null
        })

    setCompanies(companiesFiltered)
}