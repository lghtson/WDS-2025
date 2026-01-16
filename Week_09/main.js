gsap.registerPlugin(ScrollTrigger);

const camera = document.querySelector(".camera");
const scratches = document.querySelector(".scratches");
const background = document.querySelector(".background");
const flash = document.querySelector(".flash");

gsap.to (scratches, {
    opacity: 0.9,
    ease: "none",
    scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
    }
});

const photos = [
    "01.png",
    "02.png",
    "03.png",
    "04.png"
];

let i = -1

function shutter () {
    gsap.timeline()
        .to(camera, { rotate: -2, duration: 0.06, ease: "power2.out" })
        .to(camera, { rotate: 2, duration: 0.06, ease: "power2.out" })
        .to(camera, { rotate: 0, duration: 0.12, ease: "power2.out" }, "<")
        .to(flash, { opacity: 0.8, duration: 0.03}, "<")
        .to(flash, { opacity: 0, duration: 0.25});
}

camera.addEventListener("click", cameraClick);

function cameraClick() {
    i = (i + 1) % photos.length;
    background.style.backgroundImage = "url('" + photos[i] + "')";
    gsap.to(background,{
        opacity: 1,
        duration: 0.25,
        ease: "power2.out"
    });
    shutter();
}