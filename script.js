// Variables
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");

// Function that resets the size of the notes
function recize_notes() {
  notes.forEach(note => {
    if (note.classList.contains("active")) {
      note.classList.remove("active");
      gsap.set(note, {
        height: "30%",
        clearProps: "all"
      });
    }
  });
}

// Main function that enables all the notes
function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5
  });

  notes.forEach((note, i) => {
    note.addEventListener("click", function () {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        gsap.set(this, {
          height: "30%",
          clearProps: "all"
        });
      } else {
        recize_notes();
        this.classList.add("active");

        let newHeight;
        if (mobile_media_query.matches) {
          newHeight = 125 + 40 * i + "%";
        } else if (tablet_media_query.matches) {
          newHeight = 80 + 21 * i + "%";
        } else {
          newHeight = 70 + 20 * i + "%";
        }

        gsap.set(this, {
          height: newHeight
        });
      }
    });
  });
}

// Function that sets up the up paper of the envelope
function set_up_paper() {
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath: "polygon(0% 0%, 0% 100%, 100% 50%)",
    onComplete: notes_ready
  });
}

// Function that starts the up paper transition
function envelop_transition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: set_up_paper
  });
  document.querySelector(".js-up-paper").removeEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

// Function that allows cutting the sticker
function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", sticker);
  document.querySelector(".js-up-paper").addEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

// Initialize the sticker click event
document.querySelector(".js-sticker").addEventListener("click", sticker);

// Reset notes when resizing the window
window.onresize = function () {
  recize_notes();
};
