/*========== Nav bar ==========*/
class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();


/*========== Animações ==========*/

// Animação crescente 
let valueDisplays = document.querySelectorAll(".num");
let interval = 4000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue +=1;
    valueDisplay.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});

$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });
     $('.scroll-up-btn').click(function(){
         $('html').animate({scrollTop: 0});
     });

     var typed = new Typed(".typing", {
         strings:["Segurança", "Inovação", "Agilidade"],
         typeSpeed:100,
         backSpeed:60,
         loop:true
     });

    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
});

/*========== Modelo de serviços ==========*/
const modalViews = document.querySelectorAll('.services-modal'),
      modalBtns = document.querySelectorAll('.services-button'),
      modalCloses = document.querySelectorAll('.services-modal-close')

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

// Swiper Feedbacks 
let swiperTestimonial = new Swiper('.testimonial-container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },

    breakpoints: {
        568: {
            slidesPerView: 2,
        }
    }

}) 



// Formulário 

class FormSubmit {
    constructor(settings) {
        this.settings = settings
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);

        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displySuccess() {
        this.form.innerHTML = this.settings.success;
    }

    displyError() {
        this.form.innerHTML = this.settings.error;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]")
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Se tornando um parceiro...";
    }

    async sendForm(event) {
        try {
            this.onSubmission(event)
            await fetch(this.url, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displySuccess();  
        } catch (error){
            this.displyError();
            throw new Error(error);
        }
    }

    init() {
        if (this.form) this.formButton.addEventListener("click", this.sendForm)
        return this;
    }
}

const formSubmit = new FormSubmit ({
    form:"[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Cadastro efeutado!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>"
});

formSubmit.init();