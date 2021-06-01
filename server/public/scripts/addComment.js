const commentForm = document.querySelector('#addComment');
const commentText = document.querySelector('#comment_text')
const comments = document.querySelector('.comments')
if (commentForm) {
    commentForm.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const responce = await fetch('', {
            method:'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body:JSON.stringify({commentText:commentText.value})
        })

        if(responce.status === 200) {
            const serverResponce = await responce.json();
            console.log(serverResponce);
            const newElId = 'c_' + serverResponce.id;
            let div = document.createElement('div');
            div.id = newElId;
            div.className = 'comment';
            let authorDiv = document.createElement('div');
            authorDiv.innerText = 'Автор:' + serverResponce.nickname;
            let textDiv = document.createElement('div');
            textDiv.innerText = serverResponce.text;
            div.appendChild(authorDiv);
            div.appendChild(textDiv);
            comments.appendChild(div);
        }
        commentText.value = '';
    })
}
