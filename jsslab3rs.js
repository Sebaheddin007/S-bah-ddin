
function processTerminal() {
    const name = document.getElementById("userName").value;
    const command = document.getElementById("userCommand").value.trim().toLowerCase();
    const output = document.getElementById("terminalOutput");

    if (!name) {
        output.textContent = ">> Zəhmət olmasa adınızı daxil edin.";
        return;
    }

    if (command === "cv göstər") {
        output.textContent = `>> Salam ${name}!
>> Mən Səbahəddin Rüstəmli.
>> 3 illik iOS təcrübəm var.
>> Paşa Bank-da çalışıram.
>> Bacarıqlar: Swift, SwiftUI, REST API, Git və s.
>> Layihələr: Bank tətbiqi, Analitik Panel.
>> Əlaqə: sbahddinrustmli08@gmail.com`;
    } else {
        output.textContent = `>> Komanda tanınmadı: "${command}"
>> İstifadə edə biləcəyiniz əmrlər: cv göstər`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let sections = document.querySelectorAll("section");
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }, index * 300);
    });
});

window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    let body = document.body;
    let colorValue = Math.min(255, scrollTop / 5);
    body.style.backgroundColor = `rgb(${255 - colorValue}, ${255 - colorValue}, 255)`;
});
