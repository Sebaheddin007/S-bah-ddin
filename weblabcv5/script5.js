document.addEventListener("DOMContentLoaded", function () {
  // Redaktə rejimini idarə etmək üçün dəyişən
  let isEditMode = false;
  let originalData = null;

  // Verilənləri fetch edən funksiya
  async function fetchProfileData() {
    try {
      // API-dan məlumatları almağı simulyasiya edin
      // Əsas proqramda siz əsl fetch istifadə edəcəksiniz
      // return await fetch('data.json').then(response => response.json());

      // API sorğusunu simulyasiya edən yanaşma (Simulyasiya edilmiş API)
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
        }, 500); // 500ms gecikməni simulyasiya edin
      });
    } catch (error) {
      console.error("Məlumatları yükləmək alınmadı:", error);
      return null;
    }
  }

  // Məlumatları localStorage-dan almaq
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

  // Məlumatları localStorage-a saxlamaq
  function saveToLocalStorage(data) {
    try {
      localStorage.setItem('profileData', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("LocalStorage-a məlumatları saxlamaq alınmadı:", error);
      return false;
    }
  }

  // Məlumatları DOMa yükləməyə başlamaq
  async function loadData() {
    // Əvvəlcə localStorage-dan yoxlayın
    let profileData = loadFromLocalStorage();
    
    // Əgər localStorage-da məlumatlar yoxdursa, API-dan alın
    if (!profileData) {
      profileData = await fetchProfileData();
      // Məlumatları localStorage-a saxlayın
      saveToLocalStorage(profileData);
    }

    // Orijinal məlumatları saxlayın
    originalData = JSON.parse(JSON.stringify(profileData));
    
    // Bölmələri müəyyən edin
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

    // Redaktə rejiminə keçid düyməsini əlavə edin
    addEditModeToggle();
  }

  // Redaktə rejimi düyməsini əlavə et
  function addEditModeToggle() {
    const buttonsDiv = document.querySelector(".buttons");
    
    // Əvvəlcə əvvəlki düyməni silin
    const existingToggleBtn = document.getElementById("toggleEditBtn");
    if (existingToggleBtn) {
      existingToggleBtn.remove();
    }

    // Sıfırla düyməsini əlavə edin
    const existingResetBtn = document.getElementById("resetBtn");
    if (!existingResetBtn) {
      const resetBtn = document.createElement("button");
      resetBtn.id = "resetBtn";
      resetBtn.textContent = "Hamısını Sıfırla";
      resetBtn.addEventListener("click", resetAllData);
      buttonsDiv.appendChild(resetBtn);
    }

    // Redaktə rejimi düyməsini əlavə edin
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "toggleEditBtn";
    toggleBtn.textContent = isEditMode ? "Görünüş Rejimi" : "Redaktə Rejimi";
    toggleBtn.addEventListener("click", toggleEditMode);
    buttonsDiv.appendChild(toggleBtn);
  }

  // Bütün məlumatları sıfırlayın
  function resetAllData() {
    if (confirm("Bütün məlumatları ilkin vəziyyətinə qaytarmaq istədiyinizə əminsiniz?")) {
      // localStorage-u təmizləyin
      localStorage.removeItem('profileData');
      
      // Orijinal məlumatları yükləyin
      if (originalData) {
        saveToLocalStorage(originalData);
        // Səhifəni yeniləyin
        window.location.reload();
      } else {
        // Əgər orijinal məlumatlar yoxdursa, API-dan yükləyin
        loadData();
      }
    }
  }

  // Redaktə rejimini aktivləşdirin və ya deaktiv edin
  function toggleEditMode() {
    isEditMode = !isEditMode;
    
    // Bütün məzmunlu elementləri tapın
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => {
      if (isEditMode) {
        // Redaktə rejimində elementlər üçün düzəliş düyməsini göstərin
        section.querySelectorAll('.list-item').forEach(item => {
          const actionsDiv = item.querySelector('.item-actions');
          if (actionsDiv) {
            actionsDiv.style.display = 'flex';
          }
        });
      } else {
        // Görünüş rejimində düzəliş düymələrini gizlədin
        section.querySelectorAll('.item-actions').forEach(actions => {
          actions.style.display = 'none';
        });
      }
    });

    // Ad və başlıq elementlərini redaktə edilə bilən edin
    document.getElementById("name").contentEditable = isEditMode.toString();
    document.getElementById("title").contentEditable = isEditMode.toString();

    // Bütün bölmələri redaktə edilə bilən edin
    sections.forEach(section => {
      section.contentEditable = isEditMode.toString();
    });

    // Düymə mətnini yeniləyin
    const toggleBtn = document.getElementById("toggleEditBtn");
    if (toggleBtn) {
      toggleBtn.textContent = isEditMode ? "Görünüş Rejimi" : "Redaktə Rejimi";
    }

    // Yeni element əlavə etmə düyməsini aktivləşdirin/deaktiv edin
    const addItemBtn = document.getElementById("addItemBtn");
    if (addItemBtn) {
      addItemBtn.style.display = isEditMode ? "block" : "none";
    }
  }

  // Bölmə renderləmə funksiyası
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

  // Elementlər üçün hadisə dinləyiciləri əlavə edin
  function addItemActionListeners(element) {
    // Redaktə düyməsini dinləyin
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
        listItem.childNodes[1].remove(); // Orijinal mətni silin
        
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
    
    // Silmə düyməsini dinləyin
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

  // Cari DOM vəziyyətini əldə edin və yadda saxlayın
  function saveCurrentState() {
    const updatedData = {};
    
    // Ad və başlıq
    updatedData.name = document.getElementById("name").textContent;
    updatedData.title = document.getElementById("title").textContent;
    
    // Bölmələr üçün məlumatları yığın
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
          // Yalnız düyməsiz mətni alın
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
    
    // Məlumatları localStorage-a saxlayın
    saveToLocalStorage(updatedData);
  }

  // Menü elementləri üçün hadisə dinləyiciləri
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

  // Yadda saxla düyməsi
  document.getElementById("saveBtn").addEventListener("click", function () {
    saveCurrentState();
    alert("Məlumatlar yadda saxlanıldı!");
  });

  // Yeni element əlavə etmə düyməsi
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

  // Məlumatların yüklənməsinə başlayın
  loadData();
});