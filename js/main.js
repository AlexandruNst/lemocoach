// Blob
const blob = document.querySelector(".tk-blob");
var parallax = document.getElementsByClassName("-parallax")[0];
var flag = true;
var inMenu = false;

parallax.addEventListener("scroll", (e) => {
  if (parallax.scrollTop === 0) {
    blobActive(e, "SCROLL");
    console.log("scroll");
    flag = true;
  } else if (flag) {
    blobNormal();
    flag = false;
    console.log("normal");
  }
});

document.addEventListener("mousemove", (e) => {
  //   blob.setAttribute(
  //     "style",
  //     "top: calc(" +
  //       e.clientY +
  //       "px - 2rem); left: calc(" +
  //       e.clientX +
  //       "px - 2rem); --fill: #ebebeb; --amount: 5; --time: 10s"
  //   );
  // blob.style.top = "calc(" + e.clientY + "px - 2rem);"
  // blob.style.left = "calc(" + e.clientX + "px - 2rem);"document.getElementById('id').getBoundingClientRect()

  //   if (parallax.scrollTop < 1000) {
  //     //// CHANGE
  //     if (parallax.scrollTop < 20) {
  //       blobActive(e, "SCROLL");
  //     } else {
  //       blobNormal();
  //     }
  //   }

  if (parallax.scrollTop === 0 && !inMenu) {
    blobActive(e, "SCROLL");
    console.log("scroll");
    flag = true;
  } else if (flag) {
    blobNormal();
    flag = false;
    console.log("normal");
  }

  var blobHalfWidth = blob.getBoundingClientRect().width / 2;
  //   blob.style.setProperty("top", "calc(" + e.clientY + "px - 2rem)");
  //   blob.style.setProperty("left", "calc(" + e.clientX + "px - 2rem)");
  blob.style.setProperty("top", "" + (e.clientY - blobHalfWidth * 1.4) + "px");
  blob.style.setProperty("left", "" + (e.clientX - blobHalfWidth) + "px");
  //   console.log("mouseee");
  //   console.log(e.pageY);
  //   console.log(e.pageX);
});

// Awards auto scroll
var lastScrollTop = 0;
parallax.addEventListener("scroll", function (e) {
  var someDiv = document.getElementById("awards");
  var distanceToTop = someDiv.getBoundingClientRect().top;
  var distanceToBottom = distanceToTop - window.innerHeight;

  var st = lastScrollTop - distanceToBottom;
  if (distanceToBottom < 0) {
    if (st < 0) {
      document.getElementById("awards").scrollLeft += distanceToBottom / 30;
      // console.log("up");
    } else {
      document.getElementById("awards").scrollLeft -= distanceToBottom / 30;

      // console.log("down");
    }
  }

  lastScrollTop = distanceToBottom; // For Mobile or negative scrolling

  //   console.log("DTB");
  //   console.log(distanceToBottom);
});

//Coaches animation

parallax.addEventListener("scroll", function (e) {
  const someDiv = document.getElementById("-coaches-drag");
  var distanceToTop = someDiv.getBoundingClientRect().top;
  var distanceToBottom = distanceToTop - window.innerHeight;

  // var st = lastScrollTop - distanceToBottom;
  // if (st < 0) {
  //     document.getElementById("awards").scrollLeft += distanceToBottom / 50;
  //     console.log("up");
  // } else {
  //     document.getElementById("awards").scrollLeft -= distanceToBottom / 50;
  //     console.log("down");
  // }

  //   console.log("coaches distance to bottom");
  //   console.log(distanceToBottom);
  if (distanceToBottom < -400) {
    someDiv.style.animation =
      "coaches-animation 2s cubic-bezier(0.21, 0.58, 0.32, 0.96) forwards";
  }
});

// Coaches drag

document.addEventListener("DOMContentLoaded", function () {
  const ele = document.getElementById("-coaches-drag");
  ele.style.cursor = "grab";

  let pos = { left: 0, x: 0 };

  const mouseDownHandler = function (e) {
    ele.style.cursor = "grabbing";
    ele.style.userSelect = "none";
    pos = {
      left: ele.scrollLeft,
      // Get the current mouse position
      x: e.clientX,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    // e.preventDefault();
    // Scroll the element
    ele.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    ele.style.cursor = "grab";
    ele.style.removeProperty("user-select");
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  // Attach the handler
  ele.addEventListener("mousedown", mouseDownHandler);
});

// Coaches blob
document.getElementById("-coaches-drag").addEventListener("mouseover", (e) => {
  blobActive(e, "DRAG");
});
document.getElementById("-coaches-drag").addEventListener("mouseout", (e) => {
  blobNormal();
});

// Awards blob
document.getElementById("awards").addEventListener("mouseover", (e) => {
  blobActive(e, "SCROLL");
});
document.getElementById("awards").addEventListener("mouseout", (e) => {
  blobNormal();
});

// Anchor blobs
var anchors = document.getElementsByTagName("a");
for (var i = 0; i < anchors.length; i++) {
  anchors[i].addEventListener("mousemove", (e) => {
    blobSmall(e);
    console.log("smallllll");
    e.stopPropagation();
  });
  anchors[i].addEventListener("mouseout", (e) => {
    blobNormal();
  });
}

function blobActive(e, text) {
  blob.style.setProperty("--time", "3s");
  // blob.style.setProperty("--amount", "100");
  blob.style.setProperty("width", "8rem");
  blob.style.setProperty("top", "calc(" + e.clientY + "px - 2rem)");
  blob.style.setProperty("left", "calc(" + e.clientX + "px - 2rem)");
  blob.children[1].style.setProperty("opacity", "1");
  blob.children[1].innerHTML = text;
}

function blobNormal() {
  blob.style.setProperty("--time", "10s");
  blob.style.setProperty("width", "4rem");
  blob.children[1].style.setProperty("opacity", "0");
}

function blobSmall(e) {
  blob.style.setProperty("--time", "3s");
  blob.style.setProperty("width", "0rem");
  blob.style.setProperty("top", e.clientY + "px");
  blob.style.setProperty("left", e.clientX + "px");
  blob.children[1].style.setProperty("opacity", "0");
}

// Blob links
const blobLinks = document.getElementsByClassName("-blob-link");
for (var i = 0; i < blobLinks.length; i++) {
  for (var j = 0; j < 4; j++) {
    blobLinks[i].appendChild(document.createElement("span"));
  }
}

// Smooth Scrolling

// $('a[href*="#"]')
//   // Remove links that don't actually link to anything
//   .not('[href="#"]')
//   .not('[href="#0"]')
//   .click(function (event) {
//     // On-page links
//     if (
//       location.pathname.replace(/^\//, "") ==
//         this.pathname.replace(/^\//, "") &&
//       location.hostname == this.hostname
//     ) {
//       // Figure out element to scroll to
//       var target = $(this.hash);
//       target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
//       // Does a scroll target exist?
//       if (target.length) {
//         // Only prevent default if animation is actually gonna happen
//         event.preventDefault();
//         $(".-parallax").animate(
//           {
//             scrollTop: target.offset().top,
//           },
//           1000,
//           function () {
//             // Callback after animation
//             // Must change focus!
//             var $target = $(target);
//             $target.focus();
//             if ($target.is(":focus")) {
//               // Checking if the target was focused
//               return false;
//             } else {
//               $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
//               $target.focus(); // Set focus again
//             }
//           }
//         );
//       }
//     }
//   });

// Menu
const menu = document.querySelector("#menu");
const closeMenu = document.querySelector(".-close-menu");
const hamburger = document.querySelector(".-hamburger");
const intro = document.querySelector(".-intro");
const menuLinks = document.getElementsByClassName("-menu-link");

hamburger.addEventListener("click", (e) => {
  inMenu = true;
  blobNormal();
  intro.style.display = "none";
  setTimeout(() => {
    intro.style.display = "inline";
  }, 100);
  setTimeout(() => {
    menu.style.display = "flex";
  }, 800);
});

closeMenu.addEventListener("click", (e) => {
  inMenu = false;
  // blobNormal();
  intro.style.display = "none";
  setTimeout(() => {
    intro.style.display = "inline";
  }, 10);
  setTimeout(() => {
    menu.style.display = "none";
  }, 800);
});

for (var i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener("click", (e) => {
    inMenu = false;
    // blobNormal();
    intro.style.display = "none";
    setTimeout(() => {
      intro.style.display = "inline";
    }, 10);
    setTimeout(() => {
      menu.style.display = "none";
    }, 800);
  });
}

// Blob links scroll smooth
const yellowBlobLinks = document.getElementsByClassName("-blob-link");
for (var i = 0; i < blobLinks.length; i++) {
  yellowBlobLinks[i].addEventListener("mouseenter", (e) => {
    parallax.style.scrollBehavior = "smooth";
    console.log("smooooooth");
  });
  yellowBlobLinks[i].addEventListener("mouseout", (e) => {
    parallax.style.scrollBehavior = "auto";
    console.log("auto");
  });
}
