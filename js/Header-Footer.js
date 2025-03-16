document.addEventListener("DOMContentLoaded", function() {
  // Enable smooth scrolling for nav links
  const navLinks = document.querySelectorAll('nav ul li a');
  const header = document.querySelector('header');
  
  navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scroll({
          top: targetElement.offsetTop - 60, // Adjust offset for fixed header if needed
          behavior: "smooth"
        });
      }
    });
  });

  // Hide header after scrolling
  let lastScrollTop = 0;
  window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      header.style.top = "-100px"; // Adjust this value if needed
    } else {
      header.style.top = "0";
    }
    lastScrollTop = scrollTop;
  });
});
