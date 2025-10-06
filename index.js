const categorycontainer= document.getElementById('categories-container')

const loadcategory=()=>{
    fetch('https://news-api-fs.vercel.app/api/categories')
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data.categories)
        const categories = data.categories
        showcategory(categories)
        
    })

    .catch=(err)=>{
        console.log(err)
    }


};

const showcategory=(categories)=>{

categories.forEach(element => {
categorycontainer.innerHTML+=`
            <li id="${element.id}" class="hover:border-b-4 hover:border-red-600 cursor-pointer">${element.title}</li>`
            
        });
        categorycontainer.addEventListener('click',(e)=>{
            const allLi = document.querySelectorAll('li')
            allLi.forEach=(li=>{
                li.classList.remove('border-b-4')
            })

            
           if(e.target.localName==='li'){
            console.log(e.target)
            e.target.classList.add('border-b-4 ');
           }
        })
}
loadcategory()