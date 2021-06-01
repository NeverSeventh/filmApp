const div = document.querySelector('.star-rating__stars');


if (div) {
    div.addEventListener('click',async(e)=>{
        const rate = e.target
        if (rate.classList.contains('star-rating__input')) {
            const value = rate.value;
            console.log(value);
            await fetch('',{
            method:'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body:JSON.stringify({rating:value})
            }); 
        }
    })
}
