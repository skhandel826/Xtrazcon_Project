// ===== CHATBOT ======
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const chatbot = document.getElementById("chatbot");
const chatToggle = document.getElementById("chatToggle");
const closeChat = document.getElementById("closeChat");

// Chatbot toggle functionality
chatToggle.addEventListener("click", () => {
  chatbot.classList.toggle("open");
  if (chatbot.classList.contains("open")) {
    userInput.focus();
    chatToggle.classList.add("active");
  } else {
    chatToggle.classList.remove("active");
  }
});

closeChat.addEventListener("click", () => {
  chatbot.classList.remove("open");
  chatToggle.classList.remove("active");
});

// Send message on button click or Enter key
document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Add user message
  addMessage("user", text);
  userInput.value = "";

  // Remove welcome message if present
  const welcome = document.querySelector(".welcome-message");
  if (welcome) welcome.remove();

  // Show typing indicator
  showTyping();

  // Simulate response delay
  setTimeout(() => {
    removeTyping();
    const reply = getReply(text);
    addMessage("bot", reply);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800);
}

function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "msg user-msg" : "msg bot-msg";
  msgDiv.innerHTML = text;
  chatBody.appendChild(msgDiv);
  
  // Scroll to bottom
  setTimeout(() => {
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 10);
}

function showTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "msg bot-msg typing-indicator";
  typingDiv.id = "typing";
  typingDiv.innerHTML = '<span></span><span></span><span></span>';
  chatBody.appendChild(typingDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

function getReply(msg) {
  msg = msg.toLowerCase().trim();

  // Jobs-related queries
  if (msg.includes("job") || msg.includes("opening") || msg.includes("hiring")) {
    return "📋 <strong>Available Positions:</strong><br>• Software Engineer (Google) - Bangalore<br>• Frontend Developer (Microsoft) - Delhi<br>• System Engineer (Infosys) - Pune<br>• Cloud Architect (Amazon) - Delhi<br><br>Check our Jobs section for more openings!";
  }

  // Apply-related queries
  if (msg.includes("apply") || msg.includes("application") || msg.includes("how to apply")) {
    return "📝 <strong>How to Apply:</strong><br>1. Browse jobs in the Jobs section<br>2. Click 'Apply Now' on your desired role<br>3. Fill in your details and upload resume<br>4. Submit and we'll review!<br><br>Need help? Feel free to ask!";
  }

  // Location-related queries
  if (msg.includes("location") || msg.includes("city") || msg.includes("where") || msg.includes("available")) {
    return "📍 <strong>Job Locations:</strong><br>• Bangalore<br>• Hyderabad<br>• Pune<br>• Delhi<br><br>Let me know your preferred city!";
  }

  // Company queries
  if (msg.includes("company") || msg.includes("partner") || msg.includes("client")) {
    return "🏢 <strong>Our Partner Companies:</strong><br>Google, Microsoft, Amazon, Apple, Meta, Tesla, IBM, Oracle, Infosys, TCS, Wipro, Accenture and 40+ more!<br><br>We work with industry leaders to bring you best opportunities.";
  }

  // Skills/Requirements queries
  if (msg.includes("skill") || msg.includes("requirement") || msg.includes("qualification") || msg.includes("technical")) {
    return "🎯 <strong>Required Skills by Role:</strong><br>• Software Engineer: Java, Python, DSA, SQL<br>• Frontend: React, JavaScript, CSS, HTML<br>• System Engineer: Linux, AWS, Networking<br>• Cloud Architect: AWS, Kubernetes, Docker<br><br>Check individual job descriptions for specifics!";
  }

  // Experience queries
  if (msg.includes("experience") || msg.includes("fresher") || msg.includes("experience needed")) {
    return "💼 <strong>Experience Levels:</strong><br>• Fresher (0 years)<br>• Junior (0-2 years)<br>• Mid-level (2-5 years)<br>• Senior (5+ years)<br><br>We have opportunities for all levels!";
  }

  // Salary queries
  if (msg.includes("salary") || msg.includes("lpa") || msg.includes("pay") || msg.includes("compensation")) {
    return "💰 <strong>Salary Ranges:</strong><br>• Fresher: ₹4-6 LPA<br>• Junior (1-2 yrs): ₹6-8 LPA<br>• Mid-level (2-5 yrs): ₹8-12 LPA<br>• Senior (5+ yrs): ₹12-18+ LPA<br><br>Exact salary depends on role and company.";
  }

  // Interview/preparation
  if (msg.includes("interview") || msg.includes("prepare") || msg.includes("interview prep")) {
    return "🎤 <strong>Interview Preparation:</strong><br>We offer:<br>• Technical interview coaching<br>• Resume optimization<br>• Mock interviews<br>• HR round guidance<br><br>Check our Services section!";
  }

  // Contact queries
  if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("support")) {
    return "📞 <strong>Contact Us:</strong><br>📱 Phone: +91 9876543210<br>📧 Email: info@hirepoint.com<br>📍 Location: Bangalore, India<br><br>Or visit our Contact section for more details!";
  }

  // Services queries
  if (msg.includes("service") || msg.includes("what do you offer")) {
    return "✨ <strong>Our Services:</strong><br>• Job Search & Placement<br>• Resume Optimization<br>• Interview Preparation<br>• Corporate Matching<br>• Career Counseling<br><br>How can we help you today?";
  }

  // Greeting
  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey") || msg.includes("greet")) {
    return "👋 Hello! I'm your HR Assistant. I'm here to help with:<br>• Finding jobs<br>• Company information<br>• Application process<br>• Salary details<br>• Interview tips<br><br>What would you like to know?";
  }

  // Default/Help
  return "🤔 I can help with:<br>• Jobs & openings<br>• Companies & partners<br>• Locations<br>• Skills & requirements<br>• Salary info<br>• How to apply<br>• Interview prep<br>• Contact details<br><br>What would you like to know?";
}

// ===== GENERAL INTERACTIVITY ======
// Job card filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const jobCards = document.querySelectorAll(".job-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    jobCards.forEach(card => {
      const category = card.getAttribute("data-category");
      
      if (filter === "all" || category === filter) {
        card.style.display = "block";
        card.style.animation = "slideUp 0.5s ease";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Apply button alerts
const applyBtns = document.querySelectorAll(".apply-btn");
applyBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const jobTitle = btn.closest(".job-card").querySelector(".job-meta h3").textContent;
    alert(`Thank you! You've applied for ${jobTitle}. We'll review your application and contact you soon.`);
  });
});

// Contact form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll("input, textarea");
    
    // Show success message
    const btn = contactForm.querySelector(".submit-btn");
    const originalText = btn.innerHTML;
    btn.innerHTML = "✓ Message Sent Successfully!";
    btn.style.background = "linear-gradient(135deg, #10b981, #059669)";
    
    // Clear form
    inputs.forEach(input => input.value = "");
    
    // Reset button after 3 seconds
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
    }, 3000);
  });
}

// Scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Mobile hamburger menu
const hamburgerNav = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburgerNav) {
  hamburgerNav.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
    navMenu.style.flexDirection = "column";
    navMenu.style.position = "absolute";
    navMenu.style.top = "60px";
    navMenu.style.left = "0";
    navMenu.style.background = "#0f172a";
    navMenu.style.width = "100%";
    navMenu.style.padding = "20px";
    navMenu.style.gap = "10px";
  });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth"
      });
      // Close mobile menu if open
      if (navMenu) navMenu.style.display = "none";
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in-left, .fade-in-right, .fade-in-up, .slide-in, .bounce-in").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ===== FAQs FUNCTIONALITY =====
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  
  question.addEventListener("click", () => {
    // Close all other FAQs
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });
    
    // Toggle current FAQ
    item.classList.toggle("active");
  });
});
