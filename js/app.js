

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