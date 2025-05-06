document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-btn");
    const editButton = document.getElementById("edit-btn");
    const deleteButton = document.getElementById("delete-btn");
    addButton.addEventListener("click", () => {
        const newElement = document.createElement("li");
        newElement.textContent = "Yeni mətn əlavə edildi";
        document.getElementById("skills").appendChild(newElement);
    });
    editButton.addEventListener("click", () => {
        const firstSkill = document.getElementById("skills").querySelector("li");
        if (firstSkill) {
            firstSkill.textContent = "Redaktə edilmiş mətn";
        } else {
            alert("Redaktə ediləcək mətn tapılmadı.");
        }
    });
    deleteButton.addEventListener("click", () => {
        const lastSkill = document.getElementById("skills").lastElementChild;
        if (lastSkill) {
            lastSkill.remove();
        } else {
            alert("Silinəcək mətn tapılmadı.");
        }
    });
});
function toggleVisibility(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = section.style.display === "block" ? "none" : "block";
}