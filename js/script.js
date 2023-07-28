
const loader=document.querySelector('.loader');
const main=document.querySelector('.main');

setTimeout(() => {
    loader.style.display='none';
    main.style.display='block';
}, 5000)


const progressBar=document.querySelector('.progress_bar');

const progress = () => {
    let windowScroll = document.documentElement.scrollTop;
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let per = windowScroll / windowHeight * 100;
    progressBar.style.width = per + "%";
    progressBar.style.display = 'flex';
}

window.addEventListener("scroll", progress);


const optionButton = document.querySelectorAll('.option__button');
const serviceOptions=document.querySelector('.service__options');
const servicePosts=document.querySelector('.service__posts');

const getPostsfromUser=async(id)=>{
    const data=await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    return data;
}
const getPosts=()=>{
    fetch(`https://jsonplaceholder.typicode.com/posts`).then(posts => posts.json()).then(posts => {
        for (let i = 1; i <= 3; i++) {
            let j=0;
            while(posts[j].userId!=i && j<posts.length){
                j++;
            }
            console.log(j);
            servicePosts.innerHTML += genPost(posts[j].title, posts[j].body,i);
        }
    }).catch((error) => console.log(error))
}
const genPost=(title,body,type)=>{
    if(type%2===0){
        return `<div class="service__post brown">
        <div class="service__post-title brown">${title}</div>
        <div class="service__post-body brown">${body}</div>
    </div>`;
    }
    return `<div class="service__post">
        <div class="service__post-title">${title}</div>
        <div class="service__post-body">${body}</div>
    </div>`;
}

serviceOptions.addEventListener('click',(event)=>{
    if(event.target.tagName==='BUTTON') {
        servicePosts.innerHTML = '';
        if (event.target.classList.contains('option__button_active') && event.target.id !== 'all') {
            event.target.classList.remove('option__button_active');
            optionButton[0].classList.add('option__button_active');
            getPosts();
        } else {
            optionButton.forEach((button) => button.classList.remove('option__button_active'));
            if (event.target.id !== 'all') {
                getPostsfromUser(event.target.id).then(posts => posts.json()).then(posts => {
                    for (let i = 0; i < 5; i++) {
                        servicePosts.innerHTML += genPost(posts[i].title, posts[i].body, event.target.id)
                    }
                }).catch((error) => console.log(error))
            } else {
                getPosts();
            }
            event.target.classList.add('option__button_active');
        }
    }
})
optionButton[0].click();
//Swiper

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 70,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".button_green",
        prevEl: ".previous",
    },
});

//Latest News

const isElementInViewport=(elem)=>{
    let rect = elem.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
const checkElementsOnScroll=()=>{
    let elements = document.querySelectorAll(".fade-in");
    elements.forEach((elem) =>{
        if (isElementInViewport(elem) && !elem.classList.contains("show")) {
            elem.classList.add("show");
        }
    });
}
window.addEventListener("scroll", ()=>{
    checkElementsOnScroll();
});

const latestNewsLink = document.querySelector("#blog");
latestNewsLink.addEventListener("click", function(e) {
    e.preventDefault();
    checkElementsOnScroll();
});

//FORM

const form=document.querySelector('.form');
let formInputs=document.querySelectorAll('.form__input-item');
let inputName=document.querySelector('.form__name');
let inputSurname=document.querySelector('.form__sname');
let inputEmail=document.querySelector('.form__email');
let popup=document.querySelector('.popup');
let popupSubtitle=document.querySelector('.popup__subtitle');
let popupClose=document.querySelector('.popup__close');

const validateEmail=(email)=>{
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(String(email).toLowerCase());
}
const validateName=(name)=>{
    return /[A-Z][a-z]{0,}$/.test(String(name));
}


form.onsubmit=()=>{
    let emailVal=inputEmail.value;
    let nameVal=inputName.value;
    let surnameVal=inputSurname.value;
    formInputs.forEach((item)=>{
        if(item.value===''){
            item.classList.add('error');
        }
        else{
            item.classList.remove('error');
        }
    })

    if(!validateEmail(emailVal)){
       inputEmail.classList.add('error');
    }
    else{
        inputEmail.classList.remove('error');
    }
    if(!validateName(nameVal)){
        inputName.classList.add('error');
    }
    else{
        inputName.classList.remove('error');
    }
    if(!validateName(surnameVal)){
        inputSurname.classList.add('error');
    }
    else{
        inputSurname.classList.remove('error');
    }
    let cur=0;
    formInputs.forEach((item)=>{
        if(item.classList.contains('error')){
           cur++;
        }
    })
    if(cur===0 && nameVal==="Sigma"){
        const today=new Date();
        popup.style.visibility='visible';
        popupSubtitle.innerHTML+=`В цей день ${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()} 
        для користувачів з  вашим іменем знижка на замовлення 120%!`;
        setTimeout(()=>{
            popup.style.visibility='hidden';
            popupSubtitle.innerHTML='';
        },5000)
    }
    if(cur==0){
        if(window.localStorage ){
            localStorage["name"] = nameVal;
            localStorage["surname"] = surnameVal;
            localStorage["email"] = emailVal;
            inputName.value='';
            inputSurname.value='';
            inputEmail.value='';
        }
        else alert(" localStorage не підтримує ваш браузер ");
    }
    return false;
}

popupClose.addEventListener('click',(e)=>{
    popup.style.visibility='hidden';
    popupSubtitle.innerHTML='';
})

//FOOTER

const footerSubscription=document.querySelector('.footer__subscription');
const date=new Date();
footerSubscription.innerHTML+=`Copyright @ ${date.getFullYear()} Brandoxide.all right reserved.`




