const contactform=document.querySelector('.contact-form');

contactform.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('submit button clicked');
})