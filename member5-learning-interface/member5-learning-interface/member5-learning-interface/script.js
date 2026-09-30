function showCourses() {
    document.getElementById("courses").scrollIntoView({
        behavior: "smooth"
    });
}

function enroll(course) {
    alert("You selected: " + course);
}

function searchCourses() {
    let search = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".course-card");

    cards.forEach(function(card) {
        let title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(search)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
