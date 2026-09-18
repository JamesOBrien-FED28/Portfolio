document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".load-text");

    elements.forEach(el => {
        const file = el.getAttribute("data-src");

        fetch(file)
            .then(response => response.text())
            .then(text => {
                const processed = processDynamicKeywords(text);
                el.innerHTML = processed;
            })
            .catch(err => {
                console.error(`Error loading ${file}:`, err);
                el.textContent = "[Error loading text]";
            });
    });
});


// -----------------------------
// Keyword system
// -----------------------------

const dynamicValues = {
    "(age)": () => calculateAge(),
    "(year)": () => new Date().getFullYear(),
    "(name)": () => "James O'Brien"
};

function processDynamicKeywords(text) {
    for (const keyword in dynamicValues) {
        const value = dynamicValues[keyword]();
        text = text.replaceAll(keyword, value);
    }
    return text;
}


// -----------------------------
// Dynamic functions
// -----------------------------

function calculateAge() {
    const birthDate = new Date(1985, 11, 27); // your actual birthdate
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
        age--;
    }

    return age;
}
