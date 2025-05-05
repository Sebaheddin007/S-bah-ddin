document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleButton");
    const extraInfo = document.getElementById("extraInfo");

    toggleButton.style.background = "linear-gradient(135deg, #2980b9, #6dd5fa)";
    toggleButton.style.border = "none";
    toggleButton.style.color = "#fff";
    toggleButton.style.padding = "12px 28px";
    toggleButton.style.borderRadius = "30px";
    toggleButton.style.fontSize = "16px";
    toggleButton.style.fontWeight = "bold";
    toggleButton.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.transition = "all 0.3s ease";

    toggleButton.addEventListener("mouseover", () => {
        toggleButton.style.transform = "scale(1.05)";
    });

    toggleButton.addEventListener("mouseout", () => {
        toggleButton.style.transform = "scale(1)";
    });

    extraInfo.innerHTML += `
        <p>Xarakter xüsusiyyətləri:</p>
        <ul>
            <li>Detallara diqqət</li>
            <li>Yüksək məsuliyyət hissi</li>
            <li>Stressə davamlılıq</li>
            <li>Təşəbbüskar və adaptiv</li>
        </ul>
    `;

    toggleButton.addEventListener("click", () => {
        if (extraInfo.style.display === "none" || extraInfo.style.display === "") {
            extraInfo.style.display = "block";
            toggleButton.textContent = "Bağla";
        } else {
            extraInfo.style.display = "none";
            toggleButton.textContent = "Ətraflı Bax";
        }
    });
});
