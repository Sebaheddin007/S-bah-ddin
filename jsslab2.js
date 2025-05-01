document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleButton");
    const extraInfo = document.getElementById("extraInfo");

    toggleButton.addEventListener("click", () => {
        if (extraInfo.style.display === "none" || extraInfo.style.display === "") {
            extraInfo.innerHTML = "<p>CV-yə baxdığınız üçün təşəkkür edirəm.<br>Mənimlə işləmək istəyirsinizsə, əlaqə vasitələri ilə əlaqə saxlaya bilərsiniz.</p>";
            extraInfo.style.display = "block";
            toggleButton.textContent = "Bağla";
        } else {
            extraInfo.style.display = "none";
            toggleButton.textContent = "Ətraflı Bax";
        }
    });
});
