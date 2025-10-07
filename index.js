const categorycontainer = document.getElementById('categories-container');
const newsContainer = document.getElementById('news-container');
const bookmarkContainer = document.getElementById("Bookmark-container");

const modalContainer = document.getElementById('modal-container');
const viewmodal = document.getElementById('news-details-modal');

let bookmarks = [];

const loadcategory = () => {
  fetch('https://news-api-fs.vercel.app/api/categories')
    .then(res => res.json())
    .then(data => showcategory(data.categories))
    .catch(err => console.log('Error loading categories:', err));
};

const showcategory = (categories) => {
  categorycontainer.innerHTML = '';
  categories.forEach(element => {
    categorycontainer.innerHTML += `
      <li id="${element.id}" class="hover:border-b-4 border-red-600 cursor-pointer px-2 py-1">
        ${element.title}
      </li>`;
  });

  categorycontainer.addEventListener('click', (e) => {
    const allLi = document.querySelectorAll('#categories-container li');
    allLi.forEach(li => li.classList.remove('border-b-4'));

    if (e.target.localName === 'li') {
      e.target.classList.add('border-b-4');
      loadnewscontainer(e.target.id);
    }
  });
};

const loadnewscontainer = (categoriesId) => {
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoriesId}`)
    .then(res => res.json())
    .then(data => shownewsarticles(data.articles))
    .catch(err => console.log('Error loading news:', err));
};

const shownewsarticles = (articles) => {
  newsContainer.innerHTML = '';
  articles.forEach(art => {
    newsContainer.innerHTML += `
    <div class="border border-gray-300 rounded-lg mb-4">
      <div><img src="${art.image.srcset[5].url}" alt="news image" class="w-full"/></div>
      <div id="${art.id}" class="p-2">
        <h1 class="font-bold">${art.title}</h1>
        <p class="text-sm text-gray-600">${art.time}</p>
        <button class="btn">Bookmark</button>
        <button class="btn">View Details</button>
      </div>
    </div>`;
  });
};

newsContainer.addEventListener('click', (e) => {
  if (e.target.innerText === "Bookmark") {
    handlebookmars(e);
  }
  if (e.target.innerText === "View Details") {
    handleviewdetails(e);
  }
});

const handlebookmars = (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const id = e.target.parentNode.id;
  bookmarks.push({ title, id });
  showbookmarks(bookmarks);
};

const showbookmarks = (bookmarks) => {
  bookmarkContainer.innerHTML = "";
  bookmarks.forEach(bookmark => {
    bookmarkContainer.innerHTML += `
    <div class="border my-2 p-1">
      <h1>${bookmark.title}</h1>
      <button onclick="handledeletebookark('${bookmark.id}')" class="btn btn-xs">Delete</button>
    </div>`;
  });
};

const handledeletebookark = (bookmarkId) => {
  const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
  bookmarks = filteredBookmarks;
  showbookmarks(bookmarks);
};

const handleviewdetails = (e) => {
  const id = e.target.parentNode.id;
  fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
    .then(res => res.json())
    .then(data => {
      showdetailesnews(data.news || data.article);
    })
    .catch(err => console.log('Error loading details:', err));
};

const showdetailesnews = (article) => {
  if (!article) return;
  
  // If you are using <dialog> tag
  if (viewmodal.showModal) {
    viewmodal.innerHTML = `
      <h2 class="text-xl font-bold mb-2">${article.title}</h2>
      <p>${article.details || "No details available."}</p>
      <button onclick="viewmodal.close()" class="btn mt-3">Close</button>
    `;
    viewmodal.showModal();
  } 
  // If using a hidden <div> modal
  else {
    viewmodal.innerHTML = `
      <div class="bg-white p-4 rounded shadow-lg">
        <h2 class="text-xl font-bold mb-2">${article.title}</h2>
        <p>${article.details || "No details available."}</p>
        <button onclick="viewmodal.classList.add('hidden')" class="btn mt-3">Close</button>
      </div>
    `;
    viewmodal.classList.remove('hidden');
  }
};

loadcategory();
loadnewscontainer('main');
