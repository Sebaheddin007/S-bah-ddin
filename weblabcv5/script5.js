document.addEventListener("DOMContentLoaded", function () {
  let isEditMode = false;
  let originalData = null;
  async function fetchProfileData() {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            name: "RÜSTƏMLİ SƏBAHƏDDİN",
            title: "Informasiya Təhlükəsizliyi Tələbəsi",
            contact: {
              title: "Əlaqə",
              items: [
                "📞 010 371 16 17",
                "✉ sebaheddinrustemli08@gmail.com",
                "📍 Bakı şəhəri, Nəsimi rayonu, Cavadxan 73"
              ]
            },
            education: {
              title: "Təhsil",
              items: [
                "<strong>2024 - davam edir</strong><br />Azərbaycan Texniki Universiteti<br />Informasiya Təhlükəsizliyi (Bakalavr)"
              ]
            },
            skillsMain: {
              title: "Əsas Bacarıqlar",
              items: [
                "Şəbəkə təhlükəsizliyi, Firewall konfiqurasiyası",
                "Sistem zəifliklərinin skanı və analizi",
                "Linux və Windows təhlükəsizlik konfiqurasiyası",
                "Git və GitHub ilə versiya nəzarəti"
              ]
            },
            languages: {
              title: "Dil Bilikləri",
              items: [
                "Azərbaycan dili – Ana dili",
                "İngilis dili – Orta səviyyə (B1-B2)",
                "Rus dili – Başlanğıc səviyyə"
              ]
            },
            about: {
              title: "Haqqımda",
              content: "<p>\"Təhlükəsizlik texnologiyalarında bacarıqlı olmaq və dünyada informasiya təhlükəsizliyinə töhfə vermək üçün çalışıram.\"</p>"
            },
            skills: {
              title: "Soft Bacarıqlar",
              items: [
                "Analitik düşüncə və problem həlli",
                "Diqqətlilik və məxfilik prinsipləri",
                "Komanda ilə işləmək bacarığı"
              ]
            },
            projects: {
              title: "Layihələr",
              items: [
                "Web Təhlükəsizlik Analizi (Şəxsi Layihə)",
                "HTML/JS əsaslı şifrələmə aləti",
                "JavaScript ilə mətn şifrələmə və deşifrə"
              ]
            },
            certificates: {
              title: "Sertifikatlar",
              items: [
                "Introduction to Cyber Security – Cisco",
                "Cybersecurity Essentials – Cisco",
                "Google IT Support: Security – Coursera"
              ]
            },
            hobbies: {
              title: "Hobbilər",
              items: [
                "Texnologiya blogları oxumaq",
                "Şahmat və strategiya oyunları",
                "Mini layihələr – HTML, Linux, skriptlər",
                "VirtualBox və əməliyyat sistemləri",
                "Sosial mühəndislik öyrənmək"
              ]
            },
            activity: {
              title: "Qeyri-rəsmi Fəaliyyət",
              content: "<p><strong>Kibertəhlükəsizlik Klubunun üzvü</strong><br />Təlimlərdə iştirak və praktiki simulyasiyalar</p>"
            }
          });
        }, 500); 
      });
    } catch (error) {
      console.error("Məlumatları yükləmək alınmadı:", error);
      return null;
    }
  }
  function loadFromLocalStorage() {
    try {
      const localData = localStorage.getItem('profileData');
      if (localData) {
        return JSON.parse(localData);
      }
      return null;
    } catch (error) {
      console.error("LocalStorage-dan məlumatları almaq alınmadı:", error);
      return null;
    }
  }
  function saveToLocalStorage(data) {
    try {
      localStorage.setItem('profileData', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("LocalStorage-a məlumatları saxlamaq alınmadı:", error);
      return false;
    }
  }
  async function loadData() {
    let profileData = loadFromLocalStorage();
    if (!profileData) {
      profileData = await fetchProfileData();
      saveToLocalStorage(profileData);
    }
    originalData = JSON.parse(JSON.stringify(profileData));
    const sections = [
      { id: "name", type: "element" },
      { id: "title", type: "element" },
      { id: "contact", type: "section" },
      { id: "education", type: "section" },
      { id: "skills-main", type: "section", dataKey: "skillsMain" },
      { id: "languages", type: "section" },
      { id: "about", type: "content" },
      { id: "skills", type: "section" },
      { id: "projects", type: "section" },
      { id: "certificates", type: "section" },
      { id: "hobbies", type: "section" },
      { id: "activity", type: "content" }
    ];
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (!element) return;
      const dataKey = section.dataKey || section.id;
      if (section.type === "element") {
        element.textContent = profileData[dataKey];
      } else if (section.type === "section") {
        renderSection(element, profileData[dataKey]);
      } else if (section.type === "content") {
        element.innerHTML = `<h2>${profileData[dataKey].title}</h2>${profileData[dataKey].content}`;
      }
    });
    addEditModeToggle();
  }
  function addEditModeToggle() {
    const buttonsDiv = document.querySelector(".buttons");
    const existingToggleBtn = document.getElementById("toggleEditBtn");
    if (existingToggleBtn) {
      existingToggleBtn.remove();
    }
    const existingResetBtn = document.getElementById("resetBtn");
    if (!existingResetBtn) {
      const resetBtn = document.createElement("button");
      resetBtn.id = "resetBtn";
      resetBtn.textContent = "Hamısını Sıfırla";
      resetBtn.addEventListener("click", resetAllData);
      buttonsDiv.appendChild(resetBtn);
    }
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "toggleEditBtn";
    toggleBtn.textContent = isEditMode ? "Görünüş Rejimi" : "Redaktə Rejimi";
    toggleBtn.addEventListener("click", toggleEditMode);
    buttonsDiv.appendChild(toggleBtn);
  }
  function resetAllData() {
    if (confirm("Bütün məlumatları ilkin vəziyyətinə qaytarmaq istədiyinizə əminsiniz?")) {
      localStorage.removeItem('profileData');
      if (originalData) {
        saveToLocalStorage(originalData);
        window.location.reload();
      } else {
        loadData();
      }
    }
  }
  function toggleEditMode() {
    isEditMode = !isEditMode;
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => {
      if (isEditMode) {
        section.querySelectorAll('.list-item').forEach(item => {
          const actionsDiv = item.querySelector('.item-actions');
          if (actionsDiv) {
            actionsDiv.style.display = 'flex';
          }
        });
      } else {
        section.querySelectorAll('.item-actions').forEach(actions => {
          actions.style.display = 'none';
        });
      }
    });
    document.getElementById("name").contentEditable = isEditMode.toString();
    document.getElementById("title").contentEditable = isEditMode.toString();
    sections.forEach(section => {
      section.contentEditable = isEditMode.toString();
    });
    const toggleBtn = document.getElementById("toggleEditBtn");
    if (toggleBtn) {
      toggleBtn.textContent = isEditMode ? "Görünüş Rejimi" : "Redaktə Rejimi";
    }
    const addItemBtn = document.getElementById("addItemBtn");
    if (addItemBtn) {
      addItemBtn.style.display = isEditMode ? "block" : "none";
    }
  }
  function renderSection(element, sectionData) {
    let html = `<h2>${sectionData.title}</h2>`;
    
    if (sectionData.items && sectionData.items.length > 0) {
      html += '<ul>';
      sectionData.items.forEach(item => {
        html += `<li class="list-item">${item}
          <div class="item-actions" style="display: ${isEditMode ? 'flex' : 'none'}">
            <span class="edit-btn">Düzəliş</span>
            <span class="delete-btn">Sil</span>
          </div>
        </li>`;
      });
      html += '</ul>';
    } else if (sectionData.content) {
      html += sectionData.content;
    }
    element.innerHTML = html;
    addItemActionListeners(element);
  }
  function addItemActionListeners(element) {
    element.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const listItem = this.closest('.list-item');
        const text = listItem.childNodes[0].nodeValue.trim();
        const input = document.createElement('input');
        input.type = 'text';
        input.value = text;
        input.style.width = '100%';
        listItem.insertBefore(input, listItem.firstChild);
        listItem.childNodes[1].remove(); 
        input.focus();
        input.addEventListener('blur', function() {
          const newText = this.value;
          listItem.insertBefore(document.createTextNode(newText), listItem.firstChild);
          this.remove();
          saveCurrentState();
        });
        input.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            this.blur();
          }
        });
      });
    });
    element.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (confirm('Bu elementi silmək istədiyinizə əminsiniz?')) {
          this.closest('.list-item').remove();
          saveCurrentState();
        }
      });
    });
  }
  function saveCurrentState() {
    const updatedData = {};
    updatedData.name = document.getElementById("name").textContent;
    updatedData.title = document.getElementById("title").textContent;
    const sections = [
      { id: "contact", type: "section" },
      { id: "education", type: "section" },
      { id: "skills-main", type: "section", dataKey: "skillsMain" },
      { id: "languages", type: "section" },
      { id: "about", type: "content" },
      { id: "skills", type: "section" },
      { id: "projects", type: "section" },
      { id: "certificates", type: "section" },
      { id: "hobbies", type: "section" },
      { id: "activity", type: "content" }
    ];
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (!element) return;
      const dataKey = section.dataKey || section.id;
      if (section.type === "section") {
        const title = element.querySelector("h2")?.textContent || "";
        const items = [];
        element.querySelectorAll("li").forEach(li => {
          const text = li.childNodes[0].nodeValue?.trim() || li.innerHTML.split('<div')[0].trim();
          if (text) items.push(text);
        });
        updatedData[dataKey] = { title, items };
      } else if (section.type === "content") {
        const title = element.querySelector("h2")?.textContent || "";
        const content = element.innerHTML.replace(`<h2>${title}</h2>`, "").trim();
        updatedData[dataKey] = { title, content };
      }
    });
    saveToLocalStorage(updatedData);
  }
  const menuItems = document.querySelectorAll(".menu li");
  const contents = document.querySelectorAll(".content");
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      contents.forEach((content) => {
        content.classList.remove("active");
      });
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.add("active");
      }
    });
  });
  document.getElementById("saveBtn").addEventListener("click", function () {
    saveCurrentState();
    alert("Məlumatlar yadda saxlanıldı!");
  });
  document.getElementById("addItemBtn").addEventListener("click", function() {
    const activeContent = document.querySelector(".content.active");
    if (!activeContent) return;
    let ulElement = activeContent.querySelector("ul");
    if (!ulElement) {
      ulElement = document.createElement("ul");
      activeContent.appendChild(ulElement);
    }
    const newItemText = prompt("Yeni element mətnini daxil edin:");
    if (newItemText && newItemText.trim() !== "") {
      const newItem = document.createElement("li");
      newItem.className = "list-item";
      newItem.textContent = newItemText;
      const actionDiv = document.createElement("div");
      actionDiv.className = "item-actions";
      actionDiv.style.display = isEditMode ? 'flex' : 'none';
      actionDiv.innerHTML = `
        <span class="edit-btn">Düzəliş</span>
        <span class="delete-btn">Sil</span>
      `;
      newItem.appendChild(actionDiv);
      ulElement.appendChild(newItem);
      addItemActionListeners(activeContent);
      saveCurrentState();
    }
  });
  loadData();
});
