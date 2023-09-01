if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      console.log(`Registrado com sucesso, escopo é: ${registration.scope}`);
    })
    .catch(function (err) {
      console.log(`Registro falhou, erro: ${err}`);
    });
}


let deferredPrompt; 
let setupButton;
const modalElement = document.getElementById('box-alert');



////////////////////////////////////////
let backdrop = document.createElement('div');
// const openModalButton = document.querySelector("#open-modal");
const closeModalButtonIphone = document.querySelector('#close-modal');
const modalContent = document.querySelector('#box-alert .modal-content');
const modalContentIphone = document.querySelector('#box-alert .modal-content .iphone');
const modalContentAndroid = document.querySelector('#box-alert .modal-content .android');

let closeModalFade;

// implantando versão nova - 21/08/2023

window.addEventListener("load", async () => {

  if (!(isRunningStandalone())) {
  
    setTimeout( () => {
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
      const userAgent = window.navigator.userAgent;

      if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
        
        modalElement.classList.add('show');
        modalElement.setAttribute('aria-modal', 'true');
        modalElement.style.display = 'block';
        modalContentIphone.classList.remove('d-none');
  
        closeModalFade = document.querySelector(".show");
        closeModalFade.addEventListener("click", toggleModalIphone);
  
      } else {
  
        if (userAgent.includes("Android")) {
          
          modalElement.classList.add('show');
          modalElement.setAttribute('aria-modal', 'true');
          modalElement.style.display = 'block';
          modalContentAndroid.classList.remove('d-none');
  
          closeModalFade = document.querySelector(".show");
          closeModalFade.addEventListener("click", toggleModalIphone);
  
          window.onbeforeinstallprompt = (e) => {
            //e.preventDefault();
            console.log("ate tu? ate tu que me chamaste de amigo? ate tu me trai?");
            deferredPrompt = e;
          };
  
          if (setupButton == undefined) {
            setupButton = document.getElementById("setup_button");
            setupButton.style.display = "inline";
            setupButton.disabled = false;
          }
  
        } else {
  
          let backdrop = document.querySelector('.modal-backdrop');
          
          if (backdrop) {
            backdrop.remove();
          }
  
          console.log(userAgent);
        }
      }

    }, "3000");
  } else {
    let backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
});

function installApp() {
  if(deferredPrompt == null){
    alert("Aplicativo já instalado");
  } else {
    // Show the prompt
  deferredPrompt.prompt();

  setupButton.disabled = true;
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("PWA setup accepted");
      // hide our user interface that shows our A2HS button
      setupButton.style.display = "none";
    } else {
      console.log("PWA setup rejected");
      setupButton.style.display = "inline";
      setupButton.disabled = false;
    }
    deferredPrompt = null;
  });
  }
}

window.addEventListener("appinstalled", (evt) => {
  console.log("appinstalled fired", evt);
});

const toggleModalIphone = () => {
  
  modalElement.classList.remove('show');
  modalElement.removeAttribute('aria-modal');
  modalElement.style.display = 'none';

  let backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
};

closeModalButtonIphone.addEventListener("click", toggleModalIphone);

modalContent.addEventListener('click', (bloqueio) => {
 
  if(bloqueio.target != document.getElementById("close-modal-android")){
    bloqueio.stopPropagation();
  } else{
    toggleModalIphone;
  }
});


const isRunningStandalone = () => {
  
  if ('standalone' in window.navigator && window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
      return true;
  }
  return false;
  }