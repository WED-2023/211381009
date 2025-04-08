// Smooth scroll when clicking on navigation links
$(function() {
    $("#nav a").click(function(e) {
      e.preventDefault();
      $('html,body').scrollTo(this.hash, this.hash); 
    });
  });
  
  // Toggle visibility of the menu based on scroll position
  $(document).scroll(function() {
    $('#menu').toggle($(this).scrollTop() > 1000);
  });
  
  // Initialize like count and like status from localStorage
  let likes = localStorage.getItem("likeCount") || 0;
  let hasLiked = localStorage.getItem("hasLiked") === "true";
  
  // On page load, update the like count in the DOM
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("like-count").textContent = likes;
  });
  
  /**
   * Increments the like counter and shows a thank-you message.
   * Prevents the user from liking more than once using localStorage.
   */
  function addLike() {
    const message = document.getElementById("like-message");
  
    if (hasLiked) {
      message.textContent = "כבר נתת לייק אחד בעבר 😊";
      message.style.display = "block";
      return;
    }
  
    likes++;
    hasLiked = true;
  
    document.getElementById("like-count").textContent = likes;
    message.textContent = "תודה על הלייק! ❤️";
    message.style.display = "block";
  
    localStorage.setItem("likeCount", likes);
    localStorage.setItem("hasLiked", true);
  }
  
  // Get DOM elements for emoji selection display
  const emojiSelect = document.getElementById('emoji');
  const selectedEmojiParagraph = document.getElementById('selected-emoji');
  
  // Update the paragraph text when an emoji is selected
  emojiSelect.addEventListener('change', function() {
    selectedEmojiParagraph.textContent = 'אימוג\'י נבחר: ' + this.value;
  });
  
  // Form validation and submission logic
  const form = document.getElementById('contact-form');
  const submitButton = document.getElementById('submit-button');
  
  // List of required form fields
  const requiredFields = ['email', 'subject', 'message', 'emoji'];
  
  /**
   * Checks if all required fields are filled.
   * Enables or disables the submit button accordingly.
   */
  function checkFormValidity() {
    const isValid = requiredFields.every(id => {
      const el = document.getElementById(id);
      return el.value.trim() !== '';
    });
    submitButton.disabled = !isValid;
  }
  
  // Add event listeners to update form validity on input/change
  requiredFields.forEach(id => {
    document.getElementById(id).addEventListener('input', checkFormValidity);
    document.getElementById(id).addEventListener('change', checkFormValidity);
  });
  
  // Update emoji display when selection changes
  document.getElementById('emoji').addEventListener('change', function () {
    document.getElementById('selected-emoji').textContent = 'אימוג\'י נבחר: ' + this.value;
  });
  
  /**
   * Handles form submission.
   * Prevents default behavior and constructs a combined message with the emoji.
   */
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = encodeURIComponent(document.getElementById('email').value);
    const subject = encodeURIComponent(document.getElementById('subject').value);
    const message = encodeURIComponent(document.getElementById('message').value);
    const emoji = encodeURIComponent(document.getElementById('emoji').value);
  
    if (!email || !subject || !message) {
        e.preventDefault();
        alert('You must fill the email, subject and message fields');
        return false;
      }
          
      // Handle emoji (optional)
      const originalMessage = document.getElementById('message').value;
          
      if (emoji) {
        document.getElementById('message').value = originalMessage + " " + emoji;
      }
          
      // Don't display an alert here - the email server will handle confirmation
      return true;


  });