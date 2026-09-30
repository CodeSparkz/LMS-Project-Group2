const courses = [

    {
        id: 1,
        title: "Web Development",
        category: "Development",
        description:
            "Learn HTML, CSS and JavaScript to build responsive websites.",
        lessons: 10,
        duration: "6 Weeks",
        icon: "💻"
    },

    {
        id: 2,
        title: "Python Programming",
        category: "Programming",
        description:
            "Learn Python programming from basic concepts to practical projects.",
        lessons: 12,
        duration: "8 Weeks",
        icon: "🐍"
    },

    {
        id: 3,
        title: "UI/UX Design",
        category: "Design",
        description:
            "Learn how to create beautiful and user-friendly digital interfaces.",
        lessons: 8,
        duration: "5 Weeks",
        icon: "🎨"
    },

    {
        id: 4,
        title: "Data Science",
        category: "Data",
        description:
            "Understand data analysis, visualization and basic machine learning.",
        lessons: 15,
        duration: "10 Weeks",
        icon: "📊"
    },

    {
        id: 5,
        title: "Java Programming",
        category: "Programming",
        description:
            "Master Java fundamentals, OOP concepts and application development.",
        lessons: 14,
        duration: "8 Weeks",
        icon: "☕"
    },

    {
        id: 6,
        title: "Generative AI",
        category: "Artificial Intelligence",
        description:
            "Learn prompt engineering and practical applications of Generative AI.",
        lessons: 10,
        duration: "6 Weeks",
        icon: "🤖"
    }

];

let enrollments =
    JSON.parse(localStorage.getItem("enrollments")) || [];


function saveEnrollments() {

    localStorage.setItem(
        "enrollments",
        JSON.stringify(enrollments)
    );

}

function displayCourses(courseList = courses) {

    const container =
        document.getElementById("courseContainer");

    container.innerHTML = "";

    if (courseList.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>No courses found</h3>
                <p>Try searching for another course.</p>
            </div>
        `;

        return;
    }


    courseList.forEach(course => {

        const alreadyEnrolled =
            enrollments.some(
                enrollment =>
                    enrollment.courseId === course.id
            );


        const card = document.createElement("div");

        card.className = "course-card";

        card.innerHTML = `

            <div class="course-image">
                ${course.icon}
            </div>

            <div class="course-content">

                <span class="course-category">
                    ${course.category}
                </span>

                <h3>
                    ${course.title}
                </h3>

                <p>
                    ${course.description}
                </p>

                <div class="course-info">

                    <span>
                        📚 ${course.lessons} Lessons
                    </span>

                    <span>
                        ⏱ ${course.duration}
                    </span>

                </div>

                <button
                    class="enroll-btn ${alreadyEnrolled ? "enrolled" : ""}"
                    ${alreadyEnrolled ? "disabled" : ""}
                    onclick="enrollCourse(${course.id})"
                >

                    ${
                        alreadyEnrolled
                            ? "✓ Enrolled"
                            : "Enroll Now"
                    }

                </button>

            </div>

        `;

        container.appendChild(card);

    });

}

function enrollCourse(courseId) {

    const course =
        courses.find(c => c.id === courseId);

    if (!course) return;


    const alreadyEnrolled =
        enrollments.some(
            enrollment =>
                enrollment.courseId === courseId
        );


    if (alreadyEnrolled) {

        alert("You are already enrolled in this course.");

        return;
    }


    const newEnrollment = {

        id: Date.now(),

        studentId: "STU001",

        courseId: course.id,

        enrolledDate:
            new Date().toLocaleDateString(),

        completedLessons: 0

    };


    enrollments.push(newEnrollment);

    saveEnrollments();

    displayCourses();

    displayLearning();

    showEnrollmentModal(course.title);

}

function showEnrollmentModal(courseTitle) {

    document.getElementById("modalMessage").textContent =
        `You have successfully enrolled in ${courseTitle}.`;

    document
        .getElementById("enrollModal")
        .classList.add("active");

}

function closeModal() {

    document
        .getElementById("enrollModal")
        .classList.remove("active");

}

function goToLearning() {

    closeModal();

    document
        .getElementById("learning")
        .scrollIntoView({
            behavior: "smooth"
        });

}

function displayLearning() {

    const container =
        document.getElementById("learningContainer");

    const count =
        document.getElementById("courseCount");


    count.textContent = enrollments.length;


    container.innerHTML = "";


    if (enrollments.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    You haven't enrolled in any courses yet.
                </h3>

                <p>
                    Explore our courses and start learning today.
                </p>

            </div>

        `;

        return;
    }


    enrollments.forEach(enrollment => {

        const course =
            courses.find(
                c => c.id === enrollment.courseId
            );


        if (!course) return;


        const completed =
            enrollment.completedLessons;


        const percentage =
            Math.round(
                (completed / course.lessons) * 100
            );


        const card =
            document.createElement("div");


        card.className =
            "learning-card";


        card.innerHTML = `

            <div class="learning-top">

                <div class="learning-icon">
                    ${course.icon}
                </div>

                <div class="learning-info">

                    <h3>
                        ${course.title}
                    </h3>

                    <p>
                        Enrolled on
                        ${enrollment.enrolledDate}
                    </p>

                </div>

            </div>


            <div class="progress-area">

                <div class="progress-header">

                    <span>
                        Progress
                    </span>

                    <strong>
                        ${completed} / ${course.lessons}
                        lessons
                    </strong>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width: ${percentage}%"
                    ></div>

                </div>


                <div class="progress-header">

                    <span>
                        ${percentage}% completed
                    </span>

                    ${
                        percentage === 100
                            ? `<span class="completed">
                                ✓ Course Completed
                               </span>`
                            : ""
                    }

                </div>


                <div class="lesson-controls">

                    <span>
                        ${
                            percentage === 100
                                ? "🎉 Great job!"
                                : "Keep learning!"
                        }
                    </span>


                    ${
                        percentage < 100
                            ? `
                                <button
                                    onclick="completeLesson(${enrollment.id})"
                                >
                                    Complete Lesson
                                </button>
                              `
                            : ""
                    }

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}

function completeLesson(enrollmentId) {

    const enrollment =
        enrollments.find(
            e => e.id === enrollmentId
        );


    if (!enrollment) return;


    const course =
        courses.find(
            c => c.id === enrollment.courseId
        );


    if (
        enrollment.completedLessons <
        course.lessons
    ) {

        enrollment.completedLessons++;

    }


    saveEnrollments();

    displayLearning();

} 

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function () {

            const search =
                this.value
                    .toLowerCase()
                    .trim();


            const filteredCourses =
                courses.filter(course =>

                    course.title
                        .toLowerCase()
                        .includes(search)

                    ||

                    course.category
                        .toLowerCase()
                        .includes(search)

                );


            displayCourses(filteredCourses);

        }
    );

document
    .getElementById("enrollModal")
    .addEventListener(
        "click",
        function (event) {

            if (event.target === this) {

                closeModal();

            }

        }
    );

displayCourses();

displayLearning();


function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("active");

}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("active");

}

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const studentId =
            document
                .getElementById("studentId")
                .value
                .trim();

        const password =
            document
                .getElementById("password")
                .value
                .trim();

        const message =
            document.getElementById("loginMessage");

        if (
            studentId === "STU001" &&
            password === "12345"
        ) {

            localStorage.setItem(
                "loggedInStudent",
                studentId
            );


            message.style.color = "#298344";

            message.textContent =
                "Login successful!";


            setTimeout(() => {

                closeLogin();

                document
                    .getElementById("learning")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }, 700);


        } else {

            message.style.color = "#d33";

            message.textContent =
                "Invalid Student ID or Password.";

        }

    });
