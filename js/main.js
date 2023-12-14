(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").css("top", "0px");
    } else {
      $(".sticky-top").css("top", "-100px");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

/////////////////////////////////////////////////////////////////////////////////////////////////
// Open/Close modals

const boxesParentElement = document.querySelector(".parentt");
const modalList = document.querySelectorAll(".my-modal");
const overlay = document.querySelector(".overlay");
let closeModalBtn;

function openModal(element) {
  element.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal(ml) {
  ml.forEach((model) => model.classList.add("hidden"));
  overlay.classList.add("hidden");
}

boxesParentElement.addEventListener("click", function (e) {
  if (e.target.closest(".plann")) {
    const number = e.target.closest(".plann").dataset.number;
    //
    modalList.forEach((modal) => {
      if (modal.dataset.number === number) {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        // select button
        closeModalBtn = modal.querySelector(".close-modal");
      }
    });
    document.body.classList.add("no-scroll");
    closeModalBtn.addEventListener("click", function () {
      closeModal(modalList);
      document.body.classList.remove("no-scroll");
    });
  }
});

overlay.addEventListener("click", function () {
  closeModal(modalList);
  document.body.classList.remove("no-scroll");
});

/*  */

paypal
  .Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "1",
            },
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert("Transaction OK: " + details.payer.name.given_name);
      });
    },
    onError: function (err) {
      console.error("Payment Error", err);
    },
  })
  .render("#paypal-button-container");
