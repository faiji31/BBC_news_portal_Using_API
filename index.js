const categorycontainer = document.getElementById('categories-container')

const loadCategory=()=>{
    fetch('https://news-api-fs.vercel.app/api/categories')
.then(res=>res.json())
.then(data=>{
    console.log(data.categories)

    const categories = data.categories
    categories.forEach(element => {
       categorycontainer.innerHTML +=`

        <li class="hover:border-b-4 hover:border-red-600 cursor-pointer">${element.title}</li>
       `;
        
    });

})
.catch(err=>{
    console.log(err)
})
};
loadCategory();