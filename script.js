// ===========================
// SCRIPT PRINCIPAL
// ===========================



document.addEventListener("DOMContentLoaded", () => {

  // ===========================
  // VARIABLES GENERALES
  // ===========================
  const inicio = document.getElementById("inicio");
  const primanas = document.getElementById("rimana");
  const clrmk = document.getElementById("galeriaCLMK");
  const volverPriBtn = document.getElementById("volverpri");
  const flechaVolver = document.getElementById("flechaVolver");
  const videoTrigger = document.getElementById("videoTrigger");
  const boxes = document.querySelectorAll(".proyecto-box");

  // ===========================
  // INICIALIZACIÓN SECCIONES
  // ===========================
  if (inicio) inicio.style.display = "block";
  if (primanas) primanas.style.display = "none";
  if (clrmk) clrmk.style.display = "none";

  // ===========================
  // FUNCIONES GENERALES
  // ===========================
  function ocultarSecciones(callback) {
    [inicio, primanas, clrmk].forEach(sec => {
      if (sec && sec.style.display !== "none") sec.classList.add("blur-out");
    });
    setTimeout(() => {
      [inicio, primanas, clrmk].forEach(sec => {
        if (sec) {
          sec.style.display = "none";
          sec.classList.remove("blur-out");
        }
      });
      if (callback) callback();
    }, 800);
  }

  function mostrarSeccion(seccion) {
    if (!seccion) return;
    seccion.style.display = "block";
    seccion.classList.add("blur-in");
    setTimeout(() => seccion.classList.remove("blur-in"), 800);
  }

  // ===========================
  // NAVEGACIÓN PROYECTOS
  // ===========================
  boxes.forEach(box => {
    box.addEventListener("click", () => {
      const target = box.getAttribute("data-section");
      if (target === "primanas") ocultarSecciones(() => mostrarSeccion(primanas));
      else if (target === "clrmk") ocultarSecciones(() => mostrarSeccion(clrmk));
      else if (target === "disgusto") {
        box.classList.add("bloqueado");
        setTimeout(() => box.classList.remove("bloqueado"), 600);
      }
    });
  });

  if (videoTrigger) videoTrigger.addEventListener("click", () => {
    ocultarSecciones(() => mostrarSeccion(clrmk));
  });

  if (volverPriBtn) volverPriBtn.addEventListener("click", () => {
    ocultarSecciones(() => mostrarSeccion(inicio));
  });

  if (flechaVolver) flechaVolver.addEventListener("click", () => {
    ocultarSecciones(() => mostrarSeccion(inicio));
  });

  // ===========================
  // EFECTO TIPEO
  // ===========================
  function efectoTipoEscribir() {
    const texto = `CLRMK(2025) es un book de fotos realizado en Claromecó, donde se explora lo incorrecto desde lo estético. Se juega con lo simple, lo cotidiano y lo que no necesariamente "tiene sentido", con el objetivo de demostrar que la creatividad no requiere grandes recursos, sino solo el deseo de crear, divertirse y ser.`;
    let i = 0;
    const velocidad = 20;
    const contenedor = document.getElementById("typewriter");
    function escribir() {
      if (i < texto.length) {
        contenedor.innerHTML += texto.charAt(i);
        i++;
        setTimeout(escribir, velocidad);
      }
    }
    escribir();
  }
  efectoTipoEscribir();

  // ===========================
  // MODELO 3D - REVISTA
  // ===========================
  const visor3D = document.querySelector('#modelo-libro');
  const modal = document.getElementById('modal-flipbook');
  let mouseDownTime = 0;
  const CLICK_THRESHOLD = 250;

  if (visor3D) {
    visor3D.addEventListener('mousedown', () => mouseDownTime = new Date().getTime());
    visor3D.addEventListener('mouseup', () => {
      if (new Date().getTime() - mouseDownTime < CLICK_THRESHOLD) {
        modal.classList.remove('oculto');
        document.body.classList.add('modal-abierto');
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.add('oculto');
        document.body.classList.remove('modal-abierto');
      }
    });
  }

  // ===========================
  // GALERÍA CLRMK
  // ===========================
  const contenedor = document.querySelector(".contenedor-imagenes");
const cubo = document.getElementById("cuboZoom");
const overlay = document.getElementById("overlay");
const introTyped = document.querySelector(".intro-typed");

// Función máquina de escribir
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";
  const interval = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

// Texto de introducción
const textoIntro = "¡Bienvenido a CLRMK! Aquí exploramos la creatividad sin límites, distorsionando e interpretando imágenes como puntos de partida.";

// Activar escritura al cargar la sección CLRMK
window.addEventListener("load", () => {
  typeWriter(introTyped, textoIntro, 40);
});

// Abrir overlay al hacer clic en el cubo
cubo.addEventListener("click", () => {
  overlay.classList.remove("oculto");
});

// Cerrar overlay al hacer clic fuera de la hoja
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.add("oculto");
  }
});



// Abrir overlay con animación
cubo.addEventListener("click", () => {
  overlay.classList.add("mostrar");
});

// Cerrar overlay con animación cuando se hace clic fuera de la hoja
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("mostrar");
  }
});

  function cargarContenidoCLMK() {
    if (!contenedor) return;
    contenedor.innerHTML = "";
    contenidoCLMK.forEach((item, i) => {
      if (item.startsWith("img:")) {
        const nombre = item.slice(4);
        const img = document.createElement("img");
        img.src = `imagenes/${nombre}.jpg`;
        img.className = `img-scroll ${i % 2 === 0 ? 'img-left' : 'img-right'}`;
        contenedor.appendChild(img);
      } else if (item.startsWith("txt:")) {
        const texto = item.slice(4);
        const div = document.createElement("div");
        div.className = `text-scroll ${i % 2 === 0 ? 'text-left' : 'text-right'}`;
        div.innerHTML = `<p>${texto}</p>`;
        contenedor.appendChild(div);
      }
    });
    aplicarEfectoScroll();
  }

  function aplicarEfectoScroll() {
    const elementos = document.querySelectorAll(".img-scroll, .text-scroll");
    function revisarScroll() {
      elementos.forEach(el => {
        const rect = el.getBoundingClientRect();
        el.classList.toggle("visible", rect.top <= window.innerHeight && rect.bottom >= 0);
      });
    }
    window.addEventListener("scroll", revisarScroll);
    revisarScroll();
  }

  if (videoTrigger) {
    videoTrigger.addEventListener("click", () => {
      if (inicio) inicio.style.display = "none";
      if (clrmk) {
        clrmk.classList.remove("galeria-oculta");
        clrmk.classList.add("galeria-activa");
      }
      cargarContenidoCLMK();
    });
  }

  if (flechaVolver) {
    flechaVolver.addEventListener("click", () => {
      if (clrmk) {
        clrmk.classList.remove("galeria-activa");
        clrmk.classList.add("galeria-oculta");
      }
      if (inicio) inicio.style.display = "block";
    });
  }
;

function activarGaleria() {
  galeria.classList.remove("galeria-oculta");
  galeria.classList.add("galeria-activa");

  // Ejecutar la escritura de textos
  typeWriter(introTyped, textoIntro, 40);
  typeWriter(textoCubo, textoCuboContenido, 40);

  // Mostrar automáticamente la hoja al aparecer el cubo
  overlay.classList.remove("oculto");
}
// MANZANA


const slices = document.querySelectorAll('.slice');
const section = document.querySelector('#manzanita');
const container = document.querySelector('.apple-container');
let active = false;
let clicked = false;

// Posicionar cada trozo
slices.forEach((slice, i) => {
  slice.style.top = `${(100 / 6) * i}%`;
  slice.style.backgroundImage = `url(${slice.dataset.trozo})`;
  slice.style.backgroundPosition = `center -${(250 / 6) * i}px`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !active) {
      active = true;
      separateSlices();
    } else if (!entry.isIntersecting && active) {
      resetApple();
    }
  });
}, { threshold: 0.6 });

observer.observe(section);

function separateSlices() {
  slices.forEach((slice, i) => {
    slice.style.transform = `translateY(${(i - 2.5) * 20}px)`;
  });
}

function resetApple() {
  active = false;
  clicked = false;
  container.classList.remove('grid-active');
  container.style.width = '250px';
  container.style.height = '250px';
  container.style.backgroundImage = "url('imagenes/clrmk/manzana.png')";

  slices.forEach((slice, i) => {
    slice.classList.remove('grid-layout');
    slice.style.position = 'absolute';
    slice.style.top = `${(100 / 6) * i}%`;
    slice.style.left = '0';
    slice.style.width = '100%';
    slice.style.height = `calc(100% / 6)`;
    slice.style.transform = `translateY(0) rotateY(0deg)`;
    slice.style.backgroundImage = `url(${slice.dataset.trozo})`;
  });
}
section.addEventListener('click', () => {
  if (!clicked) {
    clicked = true;
    container.style.backgroundImage = 'none';
    container.style.width = 'auto';
    container.style.height = 'auto';

    slices.forEach((slice) => {
      slice.style.backgroundImage = `url(${slice.dataset.img})`;
      slice.style.position = 'absolute';
      slice.style.top = `${(100 / 6) * [...slices].indexOf(slice)}%`;
      slice.style.left = '0';
      slice.style.width = '100%';
      slice.style.height = `calc(100% / 6)`;
      slice.style.transform = 'translateY(0) rotateY(0deg) rotateX(0deg) translateZ(0)';
      slice.classList.remove('grid-layout');
    });

    container.classList.add('grid-active');

    slices.forEach((slice, i) => {
      slice.classList.add('grid-layout');

      let row = i < 3 ? 0 : 1;
      let col = i % 3;

      const width = 200;
      const height = 150;

      // Ángulos variables para cada trozo para que parezca que rotan diferente
      const rotY = (col - 1) * 15; // -15°, 0°, 15° por columna
      const rotX = (row === 0 ? 10 : -10); // +10° arriba, -10° abajo
      const translateZ = 30; // Un poco de profundidad

      slice.style.position = 'absolute';
      slice.style.width = `${width}px`;
      slice.style.height = `${height}px`;
      slice.style.top = `${row * (height + 20)}px`;
      slice.style.left = `${col * (width + 20)}px`;

      slice.style.transform = `
        rotateY(${rotY}deg)
        rotateX(${rotX}deg)
        translateZ(${translateZ}px)
        scale(1.1)
      `;

      slice.style.backgroundImage = `url(${slice.dataset.img})`;
      slice.style.zIndex = 10;
    });

    container.style.width = `${3 * 200 + 2 * 20}px`;
    container.style.height = `${2 * 150 + 20}px`;
  }
});

const leandroSection = document.querySelector('#leandro');
const mantaBg = document.querySelector('.manta-bg');
const leandroImg = document.querySelector('.leandro-img');
const typingText = document.querySelector('.typing-text');

const leandroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animar fondo deslizando de derecha a izquierda
      mantaBg.style.left = '0';

      // Animar imagen deslizando de izquierda a derecha
      leandroImg.style.left = '0';

      // Animar texto (la animación CSS se activará al estar visible)
      typingText.style.width = '15ch';
    } else {
      // Resetear para que pueda volver a animarse si se vuelve a entrar en la sección
      mantaBg.style.left = '100%';
      leandroImg.style.left = '-100%';
      typingText.style.width = '0';
    }
  });
}, { threshold: 0.6 });

leandroObserver.observe(leandroSection);

// LOLA

const lolaImages = Array.from({ length: 11 }, (_, i) => `imagenes/clrmk/lola/lolucha/l${i + 1}.png`);
const bg = document.querySelector('.lola-bg');
const glitchesContainer = document.querySelector('.lola-glitches');

function randomImage() {
  return lolaImages[Math.floor(Math.random() * lolaImages.length)];
}

function randomBlend() {
  const blends = ['difference', 'exclusion', 'lighten', 'screen', 'overlay', 'color-dodge'];
  return blends[Math.floor(Math.random() * blends.length)];
}

function createGlitch() {
  const img = document.createElement('div');
  img.classList.add('glitch-img');

  const size = Math.floor(Math.random() * 400) + 200;
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;
  img.style.top = `${Math.random() * 100}%`;
  img.style.left = `${Math.random() * 100}%`;
  img.style.backgroundImage = `url(${randomImage()})`;
  img.style.mixBlendMode = randomBlend();
  img.style.filter = `
    brightness(${0.6 + Math.random() * 1.8})
    contrast(${1.2 + Math.random() * 1.5})
    saturate(${0.9 + Math.random() * 1.1})
  `;
  img.style.animation = 'glitchNoise 0.12s infinite alternate';
  img.style.transform = `scale(${1 + Math.random() * 2.2}) rotate(${Math.random() * 360}deg)`;

  glitchesContainer.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, 450);
}

function loopGlitch() {
  bg.style.backgroundImage = `url(${randomImage()})`;
  for (let i = 0; i < 10; i++) {
    setTimeout(createGlitch, i * 30);
  }
}

setInterval(loopGlitch, 600);


//VERDE

  const images = document.querySelectorAll('.verde-img');
  let current = 0;

  function showNextImage() {
    images[current].classList.remove('active');

    current = (current + 1) % images.length;

    images[current].classList.add('active');
  }

  // Mostrar la primera imagen al inicio
  images[current].classList.add('active');

  // Cambiar cada 3 segundos
  setInterval(showNextImage, 3000);


  // BANANAS 
// Slider automático de pelea (igual que verde)
const peleaImgs = document.querySelectorAll('.pelea-img');
let peleaIndex = 0;

function showNextPeleaImage() {
  peleaImgs[peleaIndex].classList.remove('active');
  peleaIndex = (peleaIndex + 1) % peleaImgs.length;
  peleaImgs[peleaIndex].classList.add('active');
}

// Mostrar primera imagen al cargar
peleaImgs[peleaIndex].classList.add('active');

// Cambiar cada 3 segundos
setInterval(showNextPeleaImage, 3000);



// CUBO3 — Slider automático central
const cubo3Imgs = document.querySelectorAll('.cubo3-img');
let cubo3Index = 0;

function showNextCubo3Image() {
  cubo3Imgs[cubo3Index].classList.remove('active');
  cubo3Index = (cubo3Index + 1) % cubo3Imgs.length;
  cubo3Imgs[cubo3Index].classList.add('active');
}

// Mostrar primera imagen al cargar
cubo3Imgs[cubo3Index].classList.add('active');

// Cambiar cada 3 segundos
setInterval(showNextCubo3Image, 3000);

// FINAL
const textoCompleto = `Las estrellas son cuerpos celestes que brillan con luz propia, generalmente en el cielo nocturno. Son gigantescas esferas de plasma, compuestas principalmente de hidrógeno y helio, que producen energía a través de reacciones nucleares en su interior. La luz y calor que vemos de las estrellas provienen de estas reacciones.`;
let index = 0;
let yaEscribio = false;

function escribirTexto() {
  if (index < textoCompleto.length) {
    document.getElementById("typewriter-text").textContent += textoCompleto.charAt(index);
    index++;
    setTimeout(escribirTexto, 35); // velocidad de escritura
  }
}

// Detectar scroll hasta la sección final
window.addEventListener("scroll", () => {
  const section = document.getElementById("final-section");
  const rect = section.getBoundingClientRect();

  // Solo cuando la sección está más o menos en el centro de la pantalla
  if (rect.top < window.innerHeight / 2 && rect.bottom > 0 && !yaEscribio) {
    yaEscribio = true;
    escribirTexto();
  }
});

//MOFRLOD
const banana = document.getElementById("banana");

window.addEventListener("scroll", () => {
  const section = document.getElementById("modelos");
  const rect = section.getBoundingClientRect();

  if (rect.top < window.innerHeight * 0.75) {
    banana.classList.add("banana-visible");
  }
});




    if (target === "disgusto") {
      // 🎯 Animación de bloqueado
      box.classList.add("bloqueado");
      setTimeout(() => box.classList.remove("bloqueado"), 600); // quitar clase después
      return; // 🚫 no deja abrir la sección
    }

    // --- lógica normal ---
    inicio.classList.add("oculto");
    sections.forEach(sec => sec.classList.remove("active"));
    const targetSection = document.getElementById(target);
    if (targetSection) {
      setTimeout(() => {
        targetSection.classList.add("active");
      }, 800);
    }
  });



// PRIMANAS
const starsContainer = document.getElementById("stars");
const boxesContainer = document.getElementById("boxes");
const codesContainer = document.getElementById("codes");

// Generar estrellas (⭐)
function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  star.innerHTML = "★"; // estrella 5 puntas
  star.style.top = Math.random() * 100 + "vh";
  star.style.left = Math.random() * 100 + "vw";
  star.style.fontSize = (10 + Math.random() * 30) + "px";
  starsContainer.appendChild(star);
  setTimeout(() => star.remove(), 4000);
}
setInterval(createStar, 300);

// Generar marcos rojos
function createBox() {
  const box = document.createElement("div");
  box.classList.add("box");
  const size = 50 + Math.random() * 150;
  box.style.width = size + "px";
  box.style.height = size + "px";
  box.style.top = Math.random() * 90 + "vh";
  box.style.left = Math.random() * 90 + "vw";
  boxesContainer.appendChild(box);
  setTimeout(() => box.remove(), 2000);
}
setInterval(createBox, 1200);
setInterval(createBox, 1500);

// Generar códigos random
function randomCodeLine() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let line = "";
  for (let i = 0; i < 8 + Math.random() * 15; i++) {
    line += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return line;
}

function createCode() {
  const code = document.createElement("div");
  code.classList.add("code");
  code.innerText = randomCodeLine();
  code.style.top = Math.random() * 95 + "vh";
  code.style.left = Math.random() * 95 + "vw";
  code.style.fontSize = (10 + Math.random() * 24) + "px";
  codesContainer.appendChild(code);
  setTimeout(() => code.remove(), 5000);
}
setInterval(createCode, 500);




// YOUTUBE 
const box = document.getElementById('youtubeBox');
const videoURL = "https://youtu.be/DSBwOkcH2Og"; // o perfil: https://www.youtube.com/c/TU_CANAL

box.addEventListener('click', () => {
  window.open("https://youtu.be/DSBwOkcH2Og", '_blank'); // abre el video en nueva pestaña
});

// -------------------- VARIABLES --------------------
const inicio = document.getElementById("inicio");
const primanas = document.getElementById("rimana");
const clrmk = document.getElementById("galeriaCLMK");
const volverPriBtn = document.getElementById("volverpri");
const flechaVolver = document.getElementById("flechaVolver");
const boxes = document.querySelectorAll(".proyecto-box");

// -------------------- FUNCIONES AUX --------------------
// Función para mostrar una sección con animación
function mostrarSeccion(seccion) {
  seccion.classList.remove("primanas-oculta", "galeria-oculta");
  // pequeña espera para forzar animación
  setTimeout(() => {
    seccion.classList.add("primanas-activa", "galeria-activa");
  }, 20);
}

// Función para ocultar una sección con animación
function ocultarSeccion(seccion) {
  seccion.classList.remove("primanas-activa", "galeria-activa");
  seccion.classList.add("primanas-oculta", "galeria-oculta");
}

// -------------------- EVENTOS --------------------
// Al hacer click en proyecto-box que corresponde a Primanas
boxes.forEach(box => {
  box.addEventListener("click", () => {
    const section = box.getAttribute("data-section");
    if (section === "primanas") {
      // Ocultar otras secciones
      inicio.classList.remove("galeria-activa");
      inicio.classList.add("galeria-oculta");
      clrmk.classList.remove("galeria-activa");
      clrmk.classList.add("galeria-oculta");

      // Mostrar Primanas con animación
      mostrarSeccion(primanas);
    }
  });
});

// Botón volver de Primanas
volverPriBtn.addEventListener("click", () => {
  // Inicia animación de salida
  primanas.classList.remove("primanas-activa", "galeria-activa");
  primanas.classList.add("primanas-oculta", "galeria-oculta");

  // Después de la transición (800ms), mostrar inicio de nuevo
  setTimeout(() => {
    inicio.classList.remove("galeria-oculta");
    inicio.classList.add("galeria-activa");
  }, 800);
});


// ===========================
// OVERLAY IMÁGENES CLRMK
// ===========================

const overlayCLRMK = document.getElementById("overlayCLRMK");
const overlayScroll = document.getElementById("overlayScroll");
const cerrarOverlay = document.getElementById("cerrarOverlay");

// Función: abrir overlay con imágenes de carpeta
function abrirOverlay(carpeta, cantidad) {
  if (!overlayCLRMK || !overlayScroll) return;

  // Limpia contenido previo
  overlayScroll.innerHTML = "";

  // Agrega imágenes según la carpeta
  for (let i = 1; i <= cantidad; i++) {
    const img = document.createElement("img");
    img.src = `imagenes/clrmk/${carpeta}/${i}.png`;
    img.alt = `${carpeta} ${i}`;
    overlayScroll.appendChild(img);
  }

  // Mostrar overlay
  overlayCLRMK.classList.add("activo");
}

// Cerrar overlay al clickear la X
if (cerrarOverlay) {
  cerrarOverlay.addEventListener("click", () => {
    overlayCLRMK.classList.remove("activo");
  });
}

// También cerrar si se hace click fuera del scroll (fondo oscuro)
if (overlayCLRMK) {
  overlayCLRMK.addEventListener("click", (e) => {
    if (e.target === overlayCLRMK) {
      overlayCLRMK.classList.remove("activo");
    }
  });
}
// ----------------------
// TRIGGERS POR SECCIÓN
// ----------------------

// ALBA → imagen fondo
document.querySelector(".sectionalba .imagen-fondo")
  .addEventListener("click", () => abrirOverlay("ALBA", 7)); // 10 = cantidad de imágenes

// LEANDRO → manta y la img
document.querySelector("#leandro .manta-bg")
  .addEventListener("click", () => abrirOverlay("leandro", 9));

document.querySelector("#leandro .leandro-img")
  .addEventListener("click", () => abrirOverlay("leandro", 9));

// LOLA → fondo
document.querySelector("#verde")
  .addEventListener("click", () => abrirOverlay("verde", 3));

  // VERRDE
document.querySelector("#lola .lola-bg")
  .addEventListener("click", () => abrirOverlay("lola", 8));

// BANANAS → container entero
document.querySelector("#bananas .bananas-container")
  .addEventListener("click", () => abrirOverlay("BANANAS", 12));

// CUBO3 → container
document.querySelector("#cubo3 .cubo3-container")
  .addEventListener("click", () => abrirOverlay("cubo3", 3));

// LEAN Y ALBA → container
document.querySelector("#leanyalba .leanyalba-container")
  .addEventListener("click", () => abrirOverlay("leandroyalba", 6));

// JS: activar cartas cuando la sección es visible
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cartas = entry.target.querySelectorAll(".carta");
        cartas.forEach((carta, i) => {
          setTimeout(() => carta.classList.add("show"), i * 200);
        });
      }
    });
  }, { threshold: 0.4 });

  observer.observe(document.querySelector("#leanyalba"));
});

// CUBO MANZANA 
const bananasSection = document.getElementById('bananas');
const pistola = document.querySelector('.pistola');
const banana = document.querySelector('.banana');
let duelStarted = false;

window.addEventListener('scroll', () => {
  const sectionTop = bananasSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (!duelStarted && sectionTop < windowHeight * 0.8) {
    iniciarDuelo();
    duelStarted = true;
  }
});

function iniciarDuelo() {
  let pistolaLeft = -150;
  let bananaRight = -150;
  let direction = 1;

  setInterval(() => {
    // intercambiar posiciones horizontalmente
    if (direction === 1) {
      pistolaLeft = window.innerWidth - 150;
      bananaRight = window.innerWidth - 150;
      direction = -1;
    } else {
      pistolaLeft = -150;
      bananaRight = -150;
      direction = 1;
    }

    pistola.style.left = pistolaLeft + 'px';
    banana.style.right = bananaRight + 'px';

  }, 1500); // cada 1.5s intercambia posiciones
}

const estrellaFinal = document.querySelector(".estrellada");


estrellaFinal.addEventListener("click", () => {
  inicio.scrollIntoView({ behavior: "smooth" });
});
