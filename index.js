const categorycontainer = document.getElementById('categories-container');
const newsContainer = document.getElementById('news-container');

const loadcategory = () => {
  fetch('https://news-api-fs.vercel.app/api/categories')
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showcategory(categories);
    })
    .catch((err) => {
      console.log('Error loading categories:', err);
    });
};

const showcategory = (categories) => {
  categorycontainer.innerHTML = '';
  categories.forEach((element) => {
    categorycontainer.innerHTML += `
      <li id="${element.id}" class="hover:border-b-4 border-red-600 cursor-pointer px-2 py-1">
        ${element.title}
      </li>`;
  });

  // Add click event
  categorycontainer.addEventListener('click', (e) => {
    const allLi = document.querySelectorAll('#categories-container li');
    allLi.forEach((li) => li.classList.remove('border-b-4'));

    if (e.target.localName === 'li') {
      e.target.classList.add('border-b-4');
      loadnewscontainer(e.target.id);
    }
  });
};

const loadnewscontainer = (categoriesId) => {
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoriesId}`)
    .then((res) => res.json())
    .then((data) => {
      const newscategories = data.articles;
      shownewsarticles(newscategories);
    })
    .catch((err) => {
      console.log('Error loading news:', err);
    });
};

const shownewsarticles = (articles) => {
  newsContainer.innerHTML = '';
  articles.forEach((art) => {
    newsContainer.innerHTML += `
    <div class="border border-gray-300 rounded-lg">
    <div><img src="${art.image.srcset[5].url}"/></div>
      <div class="p-2">
        <h1">${art.title}</h1>
        <p class="text-[12px">${art.time}</p>
        
      </div>
      </div>
      
    `;
  });
};

loadcategory();
loadnewscontainer('main')
