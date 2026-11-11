/* contact.js — contact form for rafixbo.github.io
   Static site, so there is no backend. The form validates locally,
   then opens the visitor's mail client with a pre-filled message to
   Rafi's GitHub profile (the public contact route), and copies a
   ready-to-send message to the clipboard as a fallback.
   Nothing is sent automatically, and nothing is stored anywhere.
*/
(function () {
  "use strict";
  var form = document.getElementById("contactForm");
  if (!form) return;

  var nameInput = form.querySelector('[name="name"]');
  var typeInput = form.querySelector('[name="type"]');
  var messageInput = form.querySelector('[name="message"]');
  var statusEl = document.getElementById("contactStatus");
  var copyBtn = document.getElementById("copyMessageBtn");

  function setStatus(text, ok) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.style.color = ok ? "#15803d" : "#b91c1c";
  }

  function compose() {
    var name = (nameInput.value || "").trim();
    var type = typeInput.value || "a project";
    var message = (messageInput.value || "").trim();
    return {
      subject: "Portfolio enquiry — " + type + (name ? " from " + name : ""),
      body: "Hi Rafi,\n\n" + message + "\n\n— " + (name || "a visitor") + " (via rafixbo.github.io)"
    };
  }

  function validate() {
    if (!nameInput.value.trim()) { setStatus("Please add your name first.", false); nameInput.focus(); return false; }
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setStatus("Please write a little more — at least a sentence about your idea.", false);
      messageInput.focus(); return false;
    }
    return true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    var c = compose();
    var url = "https://github.com/rafixbo?tab=overview";
    setStatus("Opening GitHub so you can reach Rafi — your message is ready to paste.", true);
    window.open(url, "_blank", "noopener");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(c.subject + "\n\n" + c.body).catch(function () {});
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      if (!validate()) return;
      var c = compose();
      var text = c.subject + "\n\n" + c.body;
      function done() { setStatus("Message copied — paste it anywhere to send it to Rafi.", true); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
      } else { fallbackCopy(text); done(); }
    });
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (err) {}
    document.body.removeChild(ta);
  }

  /* Live character count — keeps messages readable, not essays. */
  var countEl = document.getElementById("messageCount");
  if (messageInput && countEl) {
    messageInput.addEventListener("input", function () {
      countEl.textContent = messageInput.value.length + " / 500 characters";
    });
    messageInput.setAttribute("maxlength", "500");
  }
})();
