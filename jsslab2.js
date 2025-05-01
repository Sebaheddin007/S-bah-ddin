document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleButton");
    const extraInfo = document.getElementById("extraInfo");

    toggleButton.addEventListener("click", () => {
        if (extraInfo.style.display === "none") {
            extraInfo.style.display = "block";
            toggleButton.textContent = "Bağla";
        } else {
            extraInfo.style.display = "none";
            toggleButton.textContent = "Ətraflı Bax";
        }
    });
});
