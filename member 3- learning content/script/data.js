// Default lesson information

const defaultLesson = {

    title: "Introduction to Python",

    description:
        "Learn the basics of Python programming through this beginner-friendly lesson.",

    videoType: "",

    videoUrl: "",

    videoName: "",

    resources: [

        {
            id: 1,
            name: "Python Notes.pdf",
            type: "PDF",
            size: "Sample resource",
            url: ""
        },

        {
            id: 2,
            name: "Lecture Slides.pptx",
            type: "PPTX",
            size: "Sample resource",
            url: ""
        }

    ]

};


// Get saved lesson

function getLesson() {

    const savedLesson =
        localStorage.getItem("eduLearnLesson");

    if (savedLesson) {

        return JSON.parse(savedLesson);

    }

    localStorage.setItem(
        "eduLearnLesson",
        JSON.stringify(defaultLesson)
    );

    return defaultLesson;
}


// Save lesson

function saveLesson(lesson) {

    localStorage.setItem(
        "eduLearnLesson",
        JSON.stringify(lesson)
    );

}


// Get video progress

function getProgress() {

    return Number(
        localStorage.getItem("eduLearnProgress")
    ) || 0;

}


// Save video progress

function saveProgress(progress) {

    localStorage.setItem(
        "eduLearnProgress",
        String(progress)
    );

}