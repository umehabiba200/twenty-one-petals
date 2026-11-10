
// ==========================================
// ELEMENTS
// ==========================================

const entranceScreen = document.getElementById("entranceScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const gardenScreen = document.getElementById("gardenScreen");
const letterScreen = document.getElementById("letterScreen");

const yesButton = document.getElementById("yesButton");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const exploreButton = document.getElementById("exploreButton");

const polaroidCards = document.querySelectorAll(".polaroid-card");
const flowerCount = document.getElementById("flowerCount");
const flowerMessage = document.getElementById("flowerMessage");

const letterUnlock = document.getElementById("letterUnlock");
const openLetterButton = document.getElementById("openLetterButton");

const envelopeContainer = document.getElementById("envelopeContainer");
const revealLetterButton = document.getElementById("revealLetterButton");
const letterPaper = document.getElementById("letterPaper");


// ==========================================
// SCREEN TRANSITIONS
// ==========================================

function showScreen(currentScreen, nextScreen) {

    currentScreen.hidden = true;
    nextScreen.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// Invitation to birthday screen

yesButton.addEventListener("click", () => {

    entranceScreen.classList.add("screen-exit");

    setTimeout(() => {

        showScreen(entranceScreen, birthdayScreen);
        entranceScreen.classList.remove("screen-exit");

    }, 450);

});


// Birthday screen to Polaroid wall

exploreButton.addEventListener("click", () => {

    showScreen(birthdayScreen, gardenScreen);

});


// Polaroid wall to secret letter

openLetterButton.addEventListener("click", () => {

    showScreen(gardenScreen, letterScreen);

});


// ==========================================
// THEME TOGGLE
// ==========================================

function applyTheme(theme) {

    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    themeIcon.textContent = isDark ? "☀" : "☾";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );

}

const savedTheme = localStorage.getItem("raween-theme") || "light";

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {

    const isDark = document.body.classList.contains("dark-mode");

    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);

    localStorage.setItem("raween-theme", newTheme);

});


// ==========================================
// POLAROID COLLECTION
// ==========================================

let openedCards = 0;

polaroidCards.forEach((card, index) => {

    card.setAttribute("aria-pressed", "false");

    card.addEventListener("click", () => {

        // Prevent opening the same card twice

        if (card.classList.contains("collected")) {
            return;
        }

        // Mark the card as opened

        card.classList.add("collected");

        card.disabled = true;

        card.setAttribute("aria-pressed", "true");

        // Update the counter

        openedCards++;

        flowerCount.textContent = openedCards;
        const progressPetals = document.querySelectorAll(
    "#polaroidProgressPetals span"
);

progressPetals[openedCards - 1].classList.add("active");

document.getElementById("polaroidProgressPetals")
    .setAttribute("aria-label", `${openedCards} of 8 cards opened`);

        // Display the card's message

        const cardMessage = card.querySelector(".polaroid-message");

        flowerMessage.textContent =
            `A little reminder for you: ${cardMessage.textContent.trim()}`;

        // Unlock the birthday letter after all eight cards

       if (openedCards === polaroidCards.length) {
    letterUnlock.hidden = false;

    flowerMessage.textContent =
        "You read every little note! Now there's one last surprise waiting for you.";

    launchSunflowerShower();

    letterUnlock.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

        

    });

});

function launchSunflowerShower() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    for (let i = 0; i < 14; i++) {
        const flower = document.createElement("span");

        flower.classList.add("sunflower-shower-piece");
        flower.setAttribute("aria-hidden", "true");

        flower.style.left = Math.random() * 100 + "vw";
        flower.style.animationDelay = Math.random() * 1.5 + "s";
        flower.style.animationDuration = (3 + Math.random() * 2) + "s";

        document.body.appendChild(flower);

        setTimeout(() => {
            flower.remove();
        }, 6000);
    }
}


function launchConfetti() {
    const colors = [
        "#e8b7cb",
        "#c8b6dc",
        "#e8bd61",
        "#f5d995",
        "#bd819f",
        "#fff0e5"
    ];

    // No animation if the visitor prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    for (let i = 0; i < 100; i++) {
        const piece = document.createElement("span");

        piece.classList.add("confetti-piece");

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (2.5 + Math.random() * 2) + "s";

        piece.style.animationDelay =
            (Math.random() * 0.7) + "s";

        piece.style.setProperty(
            "--confetti-drift",
            (Math.random() * 200 - 100) + "px"
        );

        piece.style.setProperty(
            "--confetti-rotation",
            (Math.random() * 900 - 450) + "deg"
        );

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 5500);
    }
}

revealLetterButton.addEventListener("click", () => {
    envelopeContainer.classList.add("open");
    revealLetterButton.hidden = true;

    launchConfetti();

    setTimeout(() => {
        letterPaper.hidden = false;

        letterPaper.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 650);
});
