function filterCourses() {

    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    const category =
        document.getElementById("categoryFilter").value;

    const level =
        document.getElementById("levelFilter").value;

    const courses =
        document.querySelectorAll(".course-card");

    let visibleCourses = 0;

    courses.forEach(function(course) {

        const title =
            course.dataset.title.toLowerCase();

        const courseCategory =
            course.dataset.category;

        const courseLevel =
            course.dataset.level;

        const searchMatch =
            title.includes(searchText);

        const categoryMatch =
            category === "all" ||
            courseCategory === category;

        const levelMatch =
            level === "all" ||
            courseLevel === level;

        if (searchMatch && categoryMatch && levelMatch) {
            course.style.display = "block";
            visibleCourses++;
        } else {
            course.style.display = "none";
        }
    });

    const noCourses =
        document.getElementById("noCourses");

    if (visibleCourses === 0) {
        noCourses.style.display = "block";
    } else {
        noCourses.style.display = "none";
    }
}

function enroll(courseName) {
    alert("You selected: " + courseName);
}

function scrollToCourses() {
    document.getElementById("courses").scrollIntoView({
        behavior: "smooth"
    });
}
