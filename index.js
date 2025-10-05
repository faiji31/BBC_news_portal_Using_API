fetch("https://news-api-fs.vercel.app/api/categories")
.then(res=>res.json())
.then(data=>{

})
.catch(err=>{
    console.log(err)
})