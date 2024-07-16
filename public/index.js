window.addEventListener("scroll", function () {
  var navbar = document.getElementById("nav");
  var offer = document.getElementById("offer");

  if (window.scrollY === 0) {
    navbar.style.marginLeft = "80px";
    navbar.style.marginRight = "80px";
    offer.classList.remove("fixed");
  } else {
    offer.classList.add("fixed");
    navbar.style.marginLeft = "0";
    navbar.style.marginRight = "0";
  }
});
let currentIndex = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.remove("active");
    if (i === index) {
      testimonial.classList.add("active");
    }
  });
}

function nextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}

setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds

// Initial display
showTestimonial(currentIndex);
document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to all elements with class "enroll"
  const enrollButtons = document.querySelectorAll(".enroll");
  enrollButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Scroll to .section-8
      const section8 = document.querySelector(".section-8");
      if (section8) {
        section8.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });
});

document.querySelector(" .enrolls").addEventListener("click", function (e) {
  e.preventDefault();

  // Scroll to .section-8
  const section8 = document.querySelector(".section-8");
  if (section8) {
    section8.scrollIntoView({
      behavior: "smooth"
    });
  }
});
document.querySelector(".course").addEventListener("click", function (e) {
  e.preventDefault();
  const target = document.querySelector(".section-3");
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
    });
  }
});

document
  .getElementById("enrollmentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("name");
    const mobile = document.getElementById("mobile");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    let isValid = true;

    // Reset previous error states
    resetErrorState(name, "nameLabel");
    resetErrorState(mobile, "mobileLabel");
    resetErrorState(email, "emailLabel");
    resetErrorState(message, "messageLabel");

    // Check if all fields are filled
    if (!name.value) {
      setErrorState(name, "nameLabel");
      isValid = false;
    }
    if (!mobile.value) {
      setErrorState(mobile, "mobileLabel");
      isValid = false;
    }
    if (!email.value) {
      setErrorState(email, "emailLabel");
      isValid = false;
    }
    if (!message.value) {
      setErrorState(message, "messageLabel");
      isValid = false;
    }

    if (isValid) {
      fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          mobile: mobile.value,
          email: email.value,
          message: message.value,
        }),
      })
        .then((response) => response.text())
        .then((data) => {
          alert(data);
          document.getElementById("enrollmentForm").reset(); // Reset the form fields
        })
        .catch((error) => console.error("Error:", error));
    }
  });

  function setErrorState(element, labelId) {
    element.classList.add("error-input");
    document.getElementById(labelId).classList.add("error-label");
}

function resetErrorState(element, labelId) {
    element.classList.remove("error-input");
    document.getElementById(labelId).classList.remove("error-label");
}

document.getElementById("enrollmentForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission for now, we'll handle validation

    // Reset error states
    resetErrorState(document.getElementById("name"), "nameLabel");
    resetErrorState(document.getElementById("mobile"), "mobileLabel");
    resetErrorState(document.getElementById("email"), "emailLabel");
    resetErrorState(document.getElementById("message"), "messageLabel");

    // Validate form fields
    let name = document.getElementById("name").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let isValid = true;

    // Check if fields are empty
    if (name === "") {
        setErrorState(document.getElementById("name"), "nameLabel");
        isValid = false;
    }
    if (mobile === "") {
        setErrorState(document.getElementById("mobile"), "mobileLabel");
        isValid = false;
    }
    if (email === "") {
        setErrorState(document.getElementById("email"), "emailLabel");
        isValid = false;
    }
    if (message === "") {
        setErrorState(document.getElementById("message"), "messageLabel");
        isValid = false;
    }

    // If form is valid, proceed with submission
    if (isValid) {
        // You can submit the form here if needed
        console.log("Form submitted!");
        // Example: document.getElementById("enrollmentForm").submit();
    } else {
        // Form has errors, do not submit
        console.log("Form has errors. Please fill in all required fields.");
    }
});