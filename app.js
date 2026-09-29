// Get saved lesson data

let lesson = getLesson();


// Selected video file

let selectedVideoFile = null;


// Current local video URL

let currentVideoObjectUrl = null;


// =========================
// GET HTML ELEMENTS
// =========================

const instructorView =
    document.getElementById("instructorView");

const studentView =
    document.getElementById("studentView");

const instructorBtn =
    document.getElementById("instructorBtn");

const studentBtn =
    document.getElementById("studentBtn");


const lessonTitle =
    document.getElementById("lessonTitle");

const lessonDescription =
    document.getElementById("lessonDescription");


const uploadTab =
    document.getElementById("uploadTab");

const urlTab =
    document.getElementById("urlTab");

const uploadArea =
    document.getElementById("uploadArea");

const urlArea =
    document.getElementById("urlArea");


const videoFile =
    document.getElementById("videoFile");

const videoUrl =
    document.getElementById("videoUrl");

const videoPreview =
    document.getElementById("videoPreview");


const saveVideoBtn =
    document.getElementById("saveVideoBtn");

const removeVideoBtn =
    document.getElementById("removeVideoBtn");


const resourceFiles =
    document.getElementById("resourceFiles");

const resourceList =
    document.getElementById("resourceList");


const saveLessonBtn =
    document.getElementById("saveLessonBtn");

const saveMessage =
    document.getElementById("saveMessage");


const studentVideoArea =
    document.getElementById("studentVideoArea");

const studentTitle =
    document.getElementById("studentTitle");

const studentDescription =
    document.getElementById("studentDescription");

const studentResources =
    document.getElementById("studentResources");

const lessonProgress =
    document.getElementById("lessonProgress");

const progressText =
    document.getElementById("progressText");

const completionBadge =
    document.getElementById("completionBadge");


// =========================
// HELPER FUNCTIONS
// =========================


// Protect text before showing it in HTML

function escapeHtml(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// Convert bytes into readable size

function formatSize(bytes) {

    if (bytes < 1024) {
        return bytes + " B";
    }

    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(1) + " MB";

}


// Get file extension

function getFileType(fileName) {

    const parts = fileName.split(".");

    if (parts.length < 2) {
        return "FILE";
    }

    return parts.pop().toUpperCase();

}


// =========================
// CHANGE MAIN VIEW
// =========================

function showView(view) {

    if (view === "instructor") {

        instructorView.classList.remove("hidden");
        studentView.classList.add("hidden");

        instructorBtn.classList.add("active");
        studentBtn.classList.remove("active");

    } else {

        instructorView.classList.add("hidden");
        studentView.classList.remove("hidden");

        instructorBtn.classList.remove("active");
        studentBtn.classList.add("active");

        renderStudent();
    }

}


instructorBtn.addEventListener("click", function () {

    showView("instructor");

});


studentBtn.addEventListener("click", function () {

    showView("student");

});


// =========================
// VIDEO SOURCE TABS
// =========================

uploadTab.addEventListener("click", function () {

    uploadTab.classList.add("active");
    urlTab.classList.remove("active");

    uploadArea.classList.remove("hidden");
    urlArea.classList.add("hidden");

});


urlTab.addEventListener("click", function () {

    urlTab.classList.add("active");
    uploadTab.classList.remove("active");

    urlArea.classList.remove("hidden");
    uploadArea.classList.add("hidden");

});


// =========================
// LOAD SAVED INFORMATION
// =========================

lessonTitle.value = lesson.title;
lessonDescription.value = lesson.description;

videoUrl.value = lesson.videoUrl || "";


// =========================
// YOUTUBE / VIMEO EMBED
// =========================

function getEmbedUrl(url) {

    try {

        const parsedUrl = new URL(url);

        // YouTube normal URL

        if (
            parsedUrl.hostname.includes("youtube.com")
        ) {

            const id =
                parsedUrl.searchParams.get("v");

            if (id) {

                return "https://www.youtube.com/embed/" + id;

            }

        }


        // YouTube short URL

        if (
            parsedUrl.hostname.includes("youtu.be")
        ) {

            const id =
                parsedUrl.pathname.substring(1);

            if (id) {

                return "https://www.youtube.com/embed/" + id;

            }

        }


        // Vimeo

        if (
            parsedUrl.hostname.includes("vimeo.com")
        ) {

            const id =
                parsedUrl.pathname.split("/").filter(Boolean).pop();

            if (id) {

                return "https://player.vimeo.com/video/" + id;

            }

        }

    } catch (error) {

        return "";

    }

    return "";

}


// =========================
// VIDEO PREVIEW
// =========================

function renderVideoPreview() {

    if (currentVideoObjectUrl) {

        URL.revokeObjectURL(
            currentVideoObjectUrl
        );

        currentVideoObjectUrl = null;

    }


    // Local uploaded video

    if (
        lesson.videoType === "uploaded" &&
        selectedVideoFile
    ) {

        currentVideoObjectUrl =
            URL.createObjectURL(selectedVideoFile);


        videoPreview.innerHTML = `
            <video controls>
                <source src="${currentVideoObjectUrl}">
                Your browser does not support video playback.
            </video>
        `;

        return;
    }


    // YouTube / Vimeo video

    if (
        lesson.videoType === "url" &&
        lesson.videoUrl
    ) {

        const embedUrl =
            getEmbedUrl(lesson.videoUrl);


        if (embedUrl) {

            videoPreview.innerHTML = `
                <iframe
                    src="${embedUrl}"
                    allowfullscreen>
                </iframe>
            `;

            return;

        }

    }


    // No video

    videoPreview.innerHTML = `
        <div class="empty-preview">
            No video selected
        </div>
    `;

}


// =========================
// SELECT LOCAL VIDEO
// =========================

videoFile.addEventListener("change", function () {

    const file = videoFile.files[0];

    if (!file) {
        return;
    }

    selectedVideoFile = file;


    if (currentVideoObjectUrl) {

        URL.revokeObjectURL(
            currentVideoObjectUrl
        );

    }


    currentVideoObjectUrl =
        URL.createObjectURL(file);


    videoPreview.innerHTML = `
        <video controls>
            <source src="${currentVideoObjectUrl}">
            Your browser does not support video playback.
        </video>
    `;

});


// =========================
// SAVE VIDEO
// =========================

saveVideoBtn.addEventListener("click", function () {

    // Upload video

    if (!uploadArea.classList.contains("hidden")) {

        if (!selectedVideoFile) {

            alert("Please select a video first.");

            return;
        }


        lesson.videoType = "uploaded";

        lesson.videoName =
            selectedVideoFile.name;

        lesson.videoUrl = "";

        saveLesson(lesson);

        alert("Video saved successfully.");

        renderVideoPreview();

        return;
    }


    // Video URL

    const url =
        videoUrl.value.trim();


    if (!url) {

        alert("Please enter a YouTube or Vimeo URL.");

        return;
    }


    const embedUrl =
        getEmbedUrl(url);


    if (!embedUrl) {

        alert(
            "Please enter a valid YouTube or Vimeo URL."
        );

        return;
    }


    lesson.videoType = "url";

    lesson.videoUrl = url;

    lesson.videoName = "";

    saveLesson(lesson);

    alert("Video URL saved successfully.");

    renderVideoPreview();

});


// =========================
// REMOVE VIDEO
// =========================

removeVideoBtn.addEventListener("click", function () {

    lesson.videoType = "";

    lesson.videoUrl = "";

    lesson.videoName = "";

    selectedVideoFile = null;


    if (currentVideoObjectUrl) {

        URL.revokeObjectURL(
            currentVideoObjectUrl
        );

        currentVideoObjectUrl = null;

    }


    videoFile.value = "";
    videoUrl.value = "";


    saveLesson(lesson);

    renderVideoPreview();

    alert("Video removed.");

});


// =========================
// RESOURCES
// =========================

function renderResources() {

    if (!lesson.resources ||
        lesson.resources.length === 0) {

        resourceList.innerHTML = `
            <p class="card-text">
                No resources added yet.
            </p>
        `;

        return;
    }


    resourceList.innerHTML =
        lesson.resources.map(function (resource) {

            return `
                <div class="resource-item">

                    <div class="resource-info">

                        <div class="file-icon">
                            ${escapeHtml(resource.type)}
                        </div>

                        <div>

                            <div class="resource-name">
                                ${escapeHtml(resource.name)}
                            </div>

                            <div class="resource-size">
                                ${escapeHtml(resource.size)}
                            </div>

                        </div>

                    </div>


                    <div class="resource-actions">

                        <button
                            class="small-btn"
                            onclick="viewResource(${resource.id})">
                            View
                        </button>

                        <button
                            class="small-btn delete-btn"
                            onclick="deleteResource(${resource.id})">
                            Delete
                        </button>

                    </div>

                </div>
            `;

        }).join("");

}


// =========================
// ADD RESOURCE FILES
// =========================

resourceFiles.addEventListener("change", function () {

    const files =
        Array.from(resourceFiles.files);


    files.forEach(function (file) {

        const resource = {

            id: Date.now() +
                Math.floor(Math.random() * 1000),

            name: file.name,

            type: getFileType(file.name),

            size: formatSize(file.size),

            url: URL.createObjectURL(file)

        };


        lesson.resources.push(resource);

    });


    saveLesson(lesson);

    renderResources();

    resourceFiles.value = "";

});


// =========================
// DELETE RESOURCE
// =========================

window.deleteResource = function (id) {

    lesson.resources =
        lesson.resources.filter(function (resource) {

            return resource.id !== id;

        });


    saveLesson(lesson);

    renderResources();

};


// =========================
// VIEW RESOURCE
// =========================

window.viewResource = function (id) {

    const resource =
        lesson.resources.find(function (item) {

            return item.id === id;

        });


    if (!resource) {
        return;
    }


    if (!resource.url) {

        alert(
            "This is a sample resource. Upload a real file to preview it."
        );

        return;
    }


    window.open(
        resource.url,
        "_blank"
    );

};


// =========================
// SAVE LESSON INFORMATION
// =========================

saveLessonBtn.addEventListener("click", function () {

    lesson.title =
        lessonTitle.value.trim() ||
        "Untitled Lesson";


    lesson.description =
        lessonDescription.value.trim() ||
        "No description available.";


    saveLesson(lesson);


    studentTitle.textContent =
        lesson.title;


    studentDescription.textContent =
        lesson.description;


    saveMessage.textContent =
        "Lesson saved successfully.";

    
    setTimeout(function () {

        saveMessage.textContent = "";

    }, 2500);

});


// =========================
// STUDENT VIEW
// =========================

function renderStudent() {

    studentTitle.textContent =
        lesson.title;

    studentDescription.textContent =
        lesson.description;


    renderStudentVideo();

    renderStudentResources();

}


// =========================
// STUDENT VIDEO
// =========================

function renderStudentVideo() {

    // YouTube / Vimeo

    if (
        lesson.videoType === "url" &&
        lesson.videoUrl
    ) {

        const embedUrl =
            getEmbedUrl(lesson.videoUrl);


        if (embedUrl) {

            studentVideoArea.innerHTML = `
                <iframe
                    src="${embedUrl}"
                    allowfullscreen>
                </iframe>
            `;

            return;

        }

    }


    // Uploaded local video

    if (
        lesson.videoType === "uploaded" &&
        currentVideoObjectUrl
    ) {

        studentVideoArea.innerHTML = `
            <video
                id="studentVideo"
                controls>
                <source src="${currentVideoObjectUrl}">
                Your browser does not support video playback.
            </video>
        `;


        setupProgress();

        return;

    }


    // No video

    studentVideoArea.innerHTML = `
        <div class="empty-preview">
            No video has been added to this lesson yet.
        </div>
    `;

}


// =========================
// VIDEO PROGRESS
// =========================

function setupProgress() {

    const studentVideo =
        document.getElementById("studentVideo");


    if (!studentVideo) {
        return;
    }


    const savedTime =
        getProgress();


    studentVideo.addEventListener(
        "loadedmetadata",
        function () {

            if (
                savedTime > 0 &&
                savedTime < studentVideo.duration
            ) {

                studentVideo.currentTime =
                    savedTime;

            }

        }
    );


    studentVideo.addEventListener(
        "timeupdate",
        function () {

            if (!studentVideo.duration) {
                return;
            }


            const percentage =
                (
                    studentVideo.currentTime /
                    studentVideo.duration
                ) * 100;


            const roundedPercentage =
                Math.round(percentage);


            lessonProgress.style.width =
                roundedPercentage + "%";


            progressText.textContent =
                roundedPercentage + "%";


            saveProgress(
                studentVideo.currentTime
            );


            if (roundedPercentage >= 90) {

                completionBadge.classList.remove(
                    "hidden"
                );

            }

        }
    );

}


// =========================
// STUDENT RESOURCES
// =========================

function renderStudentResources() {

    if (
        !lesson.resources ||
        lesson.resources.length === 0
    ) {

        studentResources.innerHTML = `
            <p class="card-text">
                No resources available.
            </p>
        `;

        return;

    }


    studentResources.innerHTML =
        lesson.resources.map(function (resource) {

            return `
                <div class="resource-item">

                    <div class="resource-info">

                        <div class="file-icon">
                            ${escapeHtml(resource.type)}
                        </div>

                        <div>

                            <div class="resource-name">
                                ${escapeHtml(resource.name)}
                            </div>

                            <div class="resource-size">
                                ${escapeHtml(resource.size)}
                            </div>

                        </div>

                    </div>


                    <div class="resource-actions">

                        <button
                            class="small-btn"
                            onclick="viewResource(${resource.id})">
                            View
                        </button>

                    </div>

                </div>
            `;

        }).join("");

}


// =========================
// START APPLICATION
// =========================

renderResources();

renderVideoPreview();

renderStudent();