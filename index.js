// ===== DOM Elements =====
const categorycontainer = document.getElementById('categories-container');
const newsContainer = document.getElementById('news-container');
const bookmarkContainer = document.getElementById("Bookmark-container");
const viewmodal = document.getElementById('news-details-modal');

// ===== Global Bookmark Array =====
let bookmarks = [];

// ===== Load All Categories =====
const loadcategory = () => {
  fetch('https://news-api-fs.vercel.app/api/categories')
    .then(res => res.json())
    .then(data => showcategory(data.categories))
    .catch(err => console.log('Error loading categories:', err));
};

// ===== Display Categories =====
const showcategory = (categories) => {
  categorycontainer.innerHTML = '';
  categories.forEach(element => {
    categorycontainer.innerHTML += `
      <li id="${element.id}" 
          class="hover:border-b-4 border-red-600 cursor-pointer px-2 py-1">
        ${element.title}
      </li>`;
  });

  // Click Event for Category Switching
  categorycontainer.addEventListener('click', (e) => {
    const allLi = document.querySelectorAll('#categories-container li');
    allLi.forEach(li => li.classList.remove('border-b-4'));

    if (e.target.localName === 'li') {
      e.target.classList.add('border-b-4');
      loadnewscontainer(e.target.id);
    }
  });
};

// ===== Load News by Category =====
const loadnewscontainer = (categoriesId) => {
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoriesId}`)
    .then(res => res.json())
    .then(data => shownewsarticles(data.articles))
    .catch(err => console.log('Error loading news:', err));
};

// ===== Display News Articles =====
const shownewsarticles = (articles) => {
  newsContainer.innerHTML = '';
  articles.forEach(art => {
    newsContainer.innerHTML += `
      <div class="border border-gray-300 rounded-lg mb-4">
        <div><img src="${art.image?.srcset?.[5]?.url || art.image?.src || ''}" 
                  alt="news image" class="w-full rounded-t-lg"/></div>
        <div id="${art.id}" class="p-2">
          <h1 class="font-bold">${art.title}</h1>
          <p class="text-sm text-gray-600">${art.time || ''}</p>
          <div class="flex gap-2 mt-2">
            <button class="btn bg-blue-500 text-white px-2 py-1 rounded">Bookmark</button>
            <button class="btn bg-green-500 text-white px-2 py-1 rounded">View Details</button>
          </div>
        </div>
      </div>`;
  });
};

// ===== Handle Clicks in News Container =====
newsContainer.addEventListener('click', (e) => {
  if (e.target.innerText === "Bookmark") {
    handlebookmars(e);
  }
  if (e.target.innerText === "View Details") {
    handleviewdetails(e);
  }
});

// ===== Bookmark Handling =====
const handlebookmars = (e) => {
  const title = e.target.parentNode.parentNode.children[0].innerText;
  const id = e.target.parentNode.parentNode.id;

  // Prevent duplicates
  if (bookmarks.some(b => b.id === id)) {
    alert("Already bookmarked!");
    return;
  }

  bookmarks.push({ title, id });
  showbookmarks(bookmarks);
};

const showbookmarks = (bookmarks) => {
  bookmarkContainer.innerHTML = "";
  bookmarks.forEach(bookmark => {
    bookmarkContainer.innerHTML += `
      <div class="border my-2 p-1 flex justify-between items-center">
        <h1>${bookmark.title}</h1>
        <button onclick="handledeletebookark('${bookmark.id}')" 
                class="btn bg-red-500 text-white btn-xs px-2 py-1 rounded">
          Delete
        </button>
      </div>`;
  });
};

const handledeletebookark = (bookmarkId) => {
  bookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
  showbookmarks(bookmarks);
};

// ===== View Details Section =====
const handleviewdetails = (e) => {
  const id = e.target.parentNode.parentNode.id;

  fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
    .then(res => res.json())
    .then(data => {
      const article = data.news || data.article || data;
      showdetailesnews(article);
    })
    .catch(err => console.log('Error loading details:', err));
};

const showdetailesnews = (article) => {
  if (!article) {
    console.log("No article details found.");
    return;
  }

  // ===== If your modal is a <dialog> element =====
  if (typeof viewmodal.showModal === "function") {
    viewmodal.innerHTML = `
      <article class="p-4 max-w-lg">
        <img src="${article.image?.src || ''}" alt="" class="w-full rounded mb-3">
        <h2 class="text-xl font-bold mb-2">${article.title}</h2>
        <p class="text-gray-600">${article.details || article.description || "No details available."}</p>
        <button onclick="viewmodal.close()" class="btn bg-gray-800 text-white mt-3 px-3 py-1 rounded">Close</button>
      </article>
    `;
    viewmodal.showModal();
  } 
  // ===== If your modal is a hidden <div> =====
  else {
    viewmodal.innerHTML = `
      <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded-lg w-96 shadow-lg">
          <img src="${article.image?.src || ''}" alt="" class="w-full rounded mb-3">
          <h2 class="text-xl font-bold mb-2">${article.title}</h2>
          <p class="text-gray-600">${article.details || article.description || "No details available."}</p>
          <button onclick="viewmodal.classList.add('hidden')" 
                  class="btn bg-gray-800 text-white mt-3 px-3 py-1 rounded">
            Close
          </button>
        </div>
      </div>
    `;
    viewmodal.classList.remove('hidden');
  }
};

// ===== Initialize =====
loadcategory();
loadnewscontainer('main');
