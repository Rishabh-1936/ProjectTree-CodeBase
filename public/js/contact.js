gsap.registerPlugin(ScrollTrigger);

document.getElementsByClassName('navbar-brand')[0].style.display = "none";
document.getElementsByTagName('nav')[0].style.backgroundColor = "#f3f3f3";
document.getElementsByTagName('nav')[0].classList.remove('bg-light');
document.getElementsByTagName('nav')[0].classList.add('about-nav');
document.getElementsByTagName('nav')[0].style.position = "sticky";


var t1 = gsap.timeline({ defaults: { transformOrigin: "50% 50%", duration: 1.5} });
t1
      .to('#location', { scaleX: 1.3, scaleY: 1.3 })
      .to('#location', { scaleX: 1, scaleY: 1 }, ">0.1")
      .to('#message', { scaleX: 1.3, scaleY: 1.3 }, ">0.3")
      .to('#message', { scaleX: 1, scaleY: 1 }, ">0.1")
      .to('#phone', { scaleX: 1.3, scaleY: 1.3 }, ">0.3")
      .to('#phone', { scaleX: 1, scaleY: 1 }, ">0.1");


var th=new TimelineMax()
.to('.contact-header-text',1,{autoAlpha:1,ease: Linear.easeNone})
.to('.contact-header-text > h1',1,{letterSpacing:2,ease: Linear.easeNone},0.1)


gsap.from('.contact-info-container',{
      scrollTrigger:{
            trigger:'.contact-info > [class*="-info"]',
            start:"top bottom",
      },
      width:"0px",
      duration:3,
      ease:"back.out(1.5)"
});

gsap.to('.contact-info p', {
      opacity: 1,
      duration: 2
});

function ShowHideDiv() {
      let reason = document.getElementById('hire');
      let roleDiv = document.getElementById('hire-role');
      roleDiv.style.display = reason.checked ? "block" : "none";
}

document.getElementById('submit').addEventListener('click', (e) => {
      console.log('h')
      e.preventDefault();
      let name   = document.getElementById('contact-name').value,
          email  = document.getElementById('contact-email').value,
          reason = document.querySelector('input[name=reason]:checked').value,
          role   = document.getElementById('role').value,
          msg    = document.getElementById('contact-message').value

      if( name == "" || email == "" || msg == "" ){
            inputError('block','rgba(212,39,39)')
      }
      else{
            $.ajax({
                  global   : false,
                  type     : 'POST',
                  url      : '/contactInfo',
                  dataType : 'json',
                  data: {
                        name   : name   , 
                        email  : email  ,
                        reason : reason ,
                        role   :  role  ,
                        msg    :  msg   ,
                  },
                  success: function (result) {
                        console.log('success', result);
                  },
                  error: function (request, status, error) {
                        console.log('error', error);
                  }
            });
            document.getElementsByTagName('form')[0].reset();
            inputError('none','#111')

            $('#toast-container').show('slow',function () {
                  console.log('hi')
                  $(this).fadeOut(4000);
            })
            $('#toast').toast('show')           
      }
});

function inputError(input_error_display,border_color){

    $('.hire-us-form .input-box input').css('borderColor',border_color)
    $('#contact-message').css('borderColor',border_color)
    $('.input-error').css('display',input_error_display)
}
