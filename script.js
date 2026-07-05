/* ==========================
   TYPING EFFECT
========================== */

const typing = document.querySelector(".typing");

const words = [

    "Frontend Developer",

    "AI Enthusiast"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type(){

    const current = words[wordIndex];

    if(!deleting){

        typing.textContent = current.substring(0,charIndex++);

        if(charIndex > current.length){

            deleting = true;

            setTimeout(type,1200);

            return;

        }

    }else{

        typing.textContent = current.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex = (wordIndex+1)%words.length;

        }

    }

    setTimeout(type,deleting?40:90);

}

type();

/* ==========================
   COUNTER ANIMATION
========================== */

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const update = ()=>{

                const increment = Math.ceil(target / 100);

                count += increment;

                if(count >= target){

                    counter.textContent = target + "+";
                }else{
                    counter.textContent = count;
                    requestAnimationFrame(update);
                }

            };

            update();

            observer.unobserve(counter);

        }

    });

});

counters.forEach(counter=>observer.observe(counter));

/* ==========================
   SCROLL REVEAL
========================== */

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{
    threshold:0.2
});

reveals.forEach(section=>{

    revealObserver.observe(section);

});

/* ==========================
   ACTIVE NAVIGATION
========================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ==========================
   BACK TO TOP
========================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/* ==========================
   NAVBAR SCROLL EFFECT
========================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});

/* ==========================
   MOBILE MENU
========================== */

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-links");

menuBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    navMenu.classList.toggle("active");

});

// Close when clicking a menu link
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});

// Close when clicking anywhere outside
document.addEventListener("click", (e) => {

    if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {

        navMenu.classList.remove("active");

    }

});