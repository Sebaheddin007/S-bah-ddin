document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.main .collapsible').forEach(section => {
    const content = section.querySelector(':not(h2)');
    if (content) {
      content.style.display = 'none';
      section.querySelector('h2').style.cursor = 'pointer';
      section.querySelector('h2').addEventListener('click', () => {
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
      });
    }
  });
  document.querySelectorAll(".editable-content").forEach((content, index) => {
    const saved = localStorage.getItem("editable_" + index);
    if (saved) {
      content.innerHTML = saved;
    }
    attachEditor(content, index);
  });
  function attachEditor(content, index) {
    const parent = content.parentElement;
    parent.addEventListener("dblclick", () => {
      const input = document.createElement("textarea");
      input.style.width = "100%";
      input.style.height = "auto";
      input.value = content.innerHTML;
      parent.replaceChild(input, content);
      input.focus();
      const saveContent = () => {
        const newContent = document.createElement("p");
        newContent.className = "editable-content";
        newContent.innerHTML = input.value;
        localStorage.setItem("editable_" + index, input.value);
        parent.replaceChild(newContent, input);
        attachEditor(newContent, index);
      };
      input.addEventListener("blur", saveContent);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          input.blur();
        }
      });
    });
  }
  document.getElementById("resetStorage").addEventListener("click", () => {
    if (confirm("Bütün redaktələri silmək istədiyinizə əminsiniz?")) {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith("editable_")) {
          localStorage.removeItem(key);
        }
      });
      location.reload();
    }
  });
});