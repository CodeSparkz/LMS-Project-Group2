// All Modules
export const modules = [
    {
        id: 1,
        title: "Module 1: HTML (HyperText Markup Language)",
        order: 1
    },

    {
        id: 2,
        title: "Module 2: CSS (Cascading Style Sheets)",
        order: 2
    },

    {
        id: 3,
        title: "Module 3: JavaScript",
        order: 3
    },

    {
        id: 4,
        title: "Module 4: Node.js",
        order: 4
    },

    {
        id: 5,
        title: "Module 5: MongoDB",
        order: 5
    }
];

export const lessons = [
    // Module - 01
    {
        id: 1,
        title: "1.1 Introduction to HTML",
        desc: "HTML stands for HyperText Markup Language. It is the standard language used to create and structure webpages. Web browsers(like Chrome, Firefox, Safari) read HTML code and display it as websites.",
        code: "<!DOCTYPE html>< html ><head><title>My First Page</title></head><body><h1>Hello, world!</h1><p>This is my first HTML page.</p></body></html>",
        moduleId: 1,
        order: 1
    },

    {
        id: 2,
        title: "1.2 Basic HTML Structure",
        desc: "Every HTML document follows a basic structure. This structure tells the browser how to read and display the content.\n\ Explanation of Each Part :\n\ 1. <!DOCTYPE html>\n\ Declares that this is an HTML5 document. Must be the first line in the file.\n\ 2. <html>...</html>\n\ The root element of the page. Wraps all the content of your HTML document.\n\ 3. <head>...</head>\n\ Contains meta-information about the page.\n\ This can include:\n\ The page <title>Links to CSS filesMeta tags (like keywords, description, etc.)\n\ 4. <title>...</title>\n\ Sets the name shown on the browser tab.\n\ 5. <body>...</body>\n\ Contains everything visible on the page. You’ll place text, images, links, forms, etc. here.",
        code: "<!DOCTYPE html><html><head><title>My First Web Page</title></head><body><h1>Welcome!</h1><p>This is a simple HTML page with basic structure.</p></body></html>",
        moduleId: 1,
        order: 1
    },

    {
        id: 3,
        title: "1.3 Headings",
        desc: "Headings help you organize content into sections.\n\ HTML provides 6 levels of headings:\n\ <h1> – Main heading (biggest)\n\ <h2> – Subheading\n\ <h3> – Smaller subheading\n\ <h4> , <h5> , <h6> – Even smaller headings",
        code: "<h1>This is a Heading 1</h1><h2>This is a Heading 2</h2><h3>This is a Heading 3</h3><h4>This is a Heading 4</h4><h5>This is a Heading 5</h5><h6>This is a Heading 6</h6>",
        moduleId: 1,
        order: 1
    },

    {
        id: 4,
        title: "1.4 Paragraphs",
        desc: "Paragraphs are written using the <p> tag.\n\ Notes: Browsers automatically add space before and after each paragraph.\n\ You don’t need to press Enter manually for new lines. Use a new <p> tag instead. Line Breaks If you want to break a line without starting a new paragraph, use the <br> tag",
        code: "<p>This is a paragraph. It can contain multiple sentences of text.</p>",
        moduleId: 1,
        order: 1
    },

    {
        id: 5,
        title: "1.5 Formatting Text in HTML",
        desc: "HTML allows you to format your text using different tags. These tags help make your content easier to read and visually appealing.\n\ Use the <b> or <strong> tag to make text bold.\n\ Use the <i> or <em> tag to italicize text.\n\ Use the <u> tag to underline text.\n\ Use the <s> or <del> tag to show deleted or crossed-out text.\n\ Use <sup> for superscript (above line), <sub> for subscript (below line).",
        code: "<p>This is <b>bold</b> text.</p><p>This is <strong>important</strong> text.</p><p>This is <i>italic</i> text.</p><p>This is <em>emphasized</em> text.</p><p>This is <u>underlined</u> text.</p><p>This is <s>wrong</s> text.</p><p>Old price: <del>$100</del> New price: $80</p><p>Water is H<sub>2</sub>O.</p><p>E = mc<sup>2</sup></p>",
        moduleId: 1,
        order: 1
    },

    {
        id: 6,
        title: "1.6 Comments in HTML",
        desc: "Comments are notes in your HTML code that are ignored by the browser. They are useful for explaining code or leaving reminders.",
        code: "<!-- This is a comment --><p>This is visible content.</p><!-- <p>This line will not show on the webpage.</p> -->",
        moduleId: 1,
        order: 1
    },

    {
        id: 7,
        title: "1.7 Whitespace in HTML",
        desc: "Whitespace includes spaces, tabs, and newlines (Enter key). HTML treats multiple spaces as a single space.",
        code: "<p>This   is   spaced.</p>",
        moduleId: 1,
        order: 1
    },

    {
        id: 8,
        title: "1.8 Links and Anchor Tags",
        desc: "HTML uses the <a> tag to create links.The href attribute tells the browser where the link should go.\n\ Use the target='_blank' attribute to open the link in a new tab.",
        code: "<a href='https://www.example.com'>Visit Example</a><a href='https://www.google.com' target='_blank'>Open Google</a>",
        moduleId: 1,
        order: 1
    },

    {
        id: 9,
        title: "1.9 Images in HTML",
        desc: "Use the <img> tag to display images in  HTML. It is a self-closing tag, meaning it doesn’t need a closing </img> .",
        code: "<img src='image.jpg' alt='Description of image'><img src='my-photo.jpg' alt='My Photo'>",
        moduleId: 1,
        order: 1
    },

    {
        id: 10,
        title: "2.0 Form and Input",
        desc: "Forms allow users to input data and send it to a server. Use the <form> tag to create a form and Use <input type='text'> to get a single line of text from the user.",
        code: "<form><label for='name'>Name:</label><input type='text' id='name' name='name'></form> ",
        moduleId: 1,
        order: 1
    },

    {
        id: 11,
        title: "2.1 HTML5 Semantic Tags",
        desc: "Inline vs Block Elements in HTML. In HTML, elements are broadly categorized as inline or block based on how they be have in the document flow. Block ElementsStart on a new line.Take up the full width available. Can contain other block and inline elements.\n\ Common Block Elements:\n\ <div>\n\ <p>\n\ <h1> to <h6>\n\ <section>\n\ <article>\n\ <ul>\n\ <ol>\n\ <li> </li>",
        code: "<div><h2>This is a heading</h2><p>This is a paragraph inside a div.</p></div>",
        moduleId: 1,
        order: 1
    },

    {
        id: 12,
        title: "2.2 HTML Entities and Special Characters",
        desc: "Some characters have special meaning in HTML (like < , > , & ).\n\ To display these characters on a webpage, you need to use HTML entities. An entity starts with & and ends with ; ",
        code: "<p>5&lt;10</p><p>Use&amp;to join strings</p><p>Price: &#8377;499</p>",
        moduleId: 1,
        order: 1
    },

    {
        id: 13,
        title: "2.3 Using Meta Tags and SEO Basics",
        desc: "Meta tags provide information about the webpage to browsers and search engines. They go inside the <head> section and do not appear on the page itself.",
        code: "<head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta name='description' content='Simple HTML tutorial for beginners.'><meta name='author' content='John Doe'><title>Learn HTML</title></head>",
        moduleId: 1,
        order: 1
    },

    // Module - 02
    {
        id: 14,
        title: "1.1 Introduction to CSS",
        desc: "CSS (Cascading Style Sheets) is used to style and layout web pages — including colors, fonts, spacing, and positioning of elements.\n\ While HTML gives structure to a web page, CSS makes it look beautiful and usable.\n\ Types of CSS :\n\ Inline CSS\n\ Internal CSS\n\ External CSS",
        code: "<p style='color: blue; font-size: 18px'>This is a blue paragraph.</p>",
        moduleId: 2,
        order: 2
    },

    {
        id: 15,
        title: "1.2 CSS Syntax and Selectors",
        desc: "To apply styles to HTML elements, you need to understand the basic syntax of CSS and how to select elements on the page and Types of Selectors\n\ - Element, ID, Class and Universal Selectors.",
        code: "selector {property: value;}",
        moduleId: 2,
        order: 2
    },

    {
        id: 16,
        title: "1.3 Colors in CSS",
        desc: "Colors play a major role in the visual appearance of a website. In CSS, you canapply colors to text, backgrounds, borders, and other elements using differentformats.",
        code: "h1 { color: red;} ",
        moduleId: 2,
        order: 2
    },

    {
        id: 17,
        title: "1.4 CSS Box Model",
        desc: "Every HTML element on a page is a rectangular box in the browser, and the Box Model defines how that box behaves.\n\ It’s the foundation of spacing, layout, and sizing in CSS. ",
        code: `
               |---------------------------|
               |          Margin           |
               | |-----------------------| |
               | |        Border         | |
               | | |-------------------| | |
               | | |      Padding      | | |
               | | | |---------------| | | |
               | | | |    Content    | | | |
               | | | |---------------| | | |
               | | |-------------------| | |
               | |---------------------| | |
               |---------------------------|`,
        moduleId: 2,
        order: 2
    },

    {
        id: 18,
        title: "1.5 Units in CSS",
        desc: "CSS units define the size, spacing, and positioning of elements on a web page.\n\ Understanding units is essential for building layouts that are consistent, responsive, and easy to manage.",
        code: "h1 {font-size: 24px;}\n\div {width: 80%;}",
        moduleId: 2,
        order: 2
    },

    {
        id: 19,
        title: "1.6 Typography in CSS",
        desc: "Typography is how text appears on a web page — its font, size, spacing, alignment, weight, and overall readability.\n\ Good typography improves user experience and design quality. ",
        code: "body {font-family: Arial, sans-serif;}\n\h1 {font-size: 36px;}",
        moduleId: 2,
        order: 2
    },

    {
        id: 20,
        title: "1.7 Backgrounds and Borders in CSS",
        desc: "CSS allows you to customize how elements look and feel by adding backgrounds and borders. You can apply colors, images, gradients, and control borders precisely around elements. ",
        code: "div {background-color: lightblue;}\n\border-style: solid;/* Common */\n\border-style: dashed;border-style: dotted;border-style: double;border-style: none;",
        moduleId: 2,
        order: 2
    },

    {
        id: 21,
        title: "1.8 Margin and Padding in CSS",
        desc: "Margin and Padding are two of the most commonly used properties in CSS to control spacing around elements. They are part of the CSS Box Model and play a crucial role in layout and visual structure.",
        code: "box {padding: 20px; margin: 10px}\n\ padding-top: 10px; padding-right: 15px; padding-bottom: 10px; padding-left: 15px; ",
        moduleId: 2,
        order: 2
    },

    {
        id: 22,
        title: "1.9 Display Property in CSS",
        desc: "The display property controls how an element is rendered on the page — whether it takes up a full line, shares space with others, behaves like a container, or is completely hidden. Understanding how display works is critical to mastering layout in CSS. ",
        code: "div {display: block;}\n\span {display: inline;}\n\button {display: inline-block;width: 150px;height: 40px;}",
        moduleId: 2,
        order: 2
    },

    {
        id: 23,
        title: "2.0 Positioning in CSS",
        desc: "CSS positioning allows you to move elements from their default flow and place them precisely where you want on the page. It’s an essential part of creating modern, interactive layouts. ",
        code: ".heading {position: sticky; top: 0; background: white;}",
        moduleId: 2,
        order: 2
    },

    {
        id: 24,
        title: "2.1 Flexbox in CSS",
        desc: "Flexbox (Flexible Box Layout) is a powerful layout system in CSS that allows you to align, space, and distribute elements easily — especially when building responsive layouts. ",
        code: ".container {display: flex; flex-direction: row; /* default */\n\ flex-direction: row-reverse; flex-direction: column; flex-direction: column-reverse;}",
        moduleId: 2,
        order: 2
    },

    {
        id: 25,
        title: "2.2 CSS Grid",
        desc: "CSS Grid Layout is a two-dimensional layout system that allows you to design web pages in rows and columns. It gives you complete control over both axes, unlike Flexbox which is mostly one-dimensional. ",
        code: ".container {display: grid;}",
        moduleId: 2,
        order: 2
    },

    {
        id: 26,
        title: "2.3 CSS Media Queries",
        desc: "Media Queries allow you to create responsive designs by applying CSS rules based on the device’s characteristics — such as screen width, height, orientation, and resolution. They are essential for building mobile-first, responsive websites that adapt to various screen sizes (phones, tablets, desktops).",
        code: "@media (max-width: 768px) {body { background-color: lightgray;}}",
        moduleId: 2,
        order: 2
    },

    // Module - 03
    {
        id: 27,
        title: "1.1 Introduction to JavaScript",
        desc: "JavaScript is a programming language used to make web pages interactive. While HTML structures the page and CSS styles it, JavaScript adds behavior.\n\ For example:\n\ Want to show a popup when a user clicks a button?Use JavaScript.\n\ Want to build a game, form validation, or fetch data from a server? Use JavaScript.\n\ JavaScript runs in the browser, meaning it executes on the user’s device. ",
        code: "<!-- index.html --><!DOCTYPE html><html><body><h1>Hello</h1><script src='script.js'> </script></body></html>\n\ // script.js console.log('Hello from external JS file!'); ",
        moduleId: 3,
        order: 3
    },

    {
        id: 28,
        title: "1.2 Variables in JavaScript",
        desc: "A variable is a named container for storing data.\n\ In JavaScript, we can declare variables using:",
        code: "let name = 'Abdul Kadir';  const age = 25;  var city = 'Delhi';",
        moduleId: 3,
        order: 3
    },

    {
        id: 29,
        title: "1.3 Naming Variables in JavaScript",
        desc: "Variable names must begin with a letter, underscore _ , or dollar sign $ . Valid examples or Use camelCase for variable names.\n\ In JavaScript, the convention is to use camelCase, where the first word is lowercase and each new word starts with an uppercase letter",
        code: "let age = 25; // Good\n\ let userAge = 25; // Better\n\ let a = 25; // Poor",
        moduleId: 3,
        order: 3
    },

    {
        id: 30,
        title: "1.4 Operators in JavaScript",
        desc: "Operators are symbols used to perform operations on values and variables. For example, you use + to add two numbers, = to assign values, and == to compare values.",
        code: "let age = 20; if (age > 18 && age < 60) {  console.log('You are eligible'); } ",
        moduleId: 3,
        order: 3
    },

    {
        id: 31,
        title: "1.5 If-Else Statements in JavaScript",
        desc: "An if statement is used to run a block of code only if a specified condition is true. You can use else or else if to run different blocks of code based on different conditions.",
        code: "if (condition) { // code to run if condition is true } else { // code to run if condition is false }\n\ let age = 18; if (age >= 18) {  console.log('You are an adult.''); } else {  console.log('You are a minor.'); } ",
        moduleId: 3,
        order: 3
    },

    {
        id: 32,
        title: "1.6 Objects in JavaScript",
        desc: "Objects in JavaScript are used to store collections of key-value pairs. They are one of the most important and widely used data types in the language.",
        code: "let person = {name: 'Alice',\n\ age: 30,\n\ isEmployed: true};",
        moduleId: 3,
        order: 3
    },

    {
        id: 33,
        title: "1.7 Loops in JavaScript",
        desc: "Loops allow you to execute a block of code multiple times, which is useful for tasks like iterating over arrays or repeating operations until a condition changes. for, while and do while Loop.",
        code: "for (initialization; condition; finalExpression) {// code to execute on each iteration}",
        moduleId: 3,
        order: 3
    },

    {
        id: 34,
        title: "1.8 Control Flow in JavaScript",
        desc: "Control flow means how your code runs step-by-step, and how you can make decisions or repeat actions. JavaScript runs code from top to bottom, but you can control the flow using:\n\ Conditional statements ( if , else , switch )\n\ Loops ( for , while , do...while )",
        code: "let age = 18; if (age >= 18) {  console.log('You are an adult'); } else if (age >= 13) {  console.log('You are a teenager'); } else {  console.log('You are a child'); }",
        moduleId: 3,
        order: 3
    },

    {
        id: 35,
        title: "1.9 break and continue in JavaScript",
        desc: "The break statement is used to exit a loop prematurely, before the loop condition evaluates to false and The continue statement skips the current iteration of a loop and proceeds to the next one.",
        code: "for (let i = 0; i < 10; i++) {if (i === 5) {break; // exits the loop when i equals 5}\n\ console.log(i);}",
        moduleId: 3,
        order: 3
    },

    {
        id: 36,
        title: "2.0 Functions in JavaScript",
        desc: "A function is a block of code that performs a specific task. Instead of repeating the same code again and again, you can write it once in a function and call it whenever needed. ",
        code: "function greet() { console.log('Hello, JavaScript!');}\n\ greet(); // Call the function",
        moduleId: 3,
        order: 3
    },

    {
        id: 37,
        title: "2.1 Arrays in JavaScript",
        desc: "An array is a collection of items stored in a single variable. It lets you store multiple values — like a list of names, numbers, or even other arrays.",
        code: "let fruits = ['apple', 'banana', 'mango']; let numbers = [10, 20, 30, 40];",
        moduleId: 3,
        order: 3
    },

    {
        id: 38,
        title: "2.2 Strings in JavaScript",
        desc: "A string is a sequence of characters used to represent text. It can contain letters, numbers, symbols, or even be empty. In JavaScript, strings are written inside single quotes, double quotes, or backticks. ",
        code: "let single = 'Hello'; let double = 'World'; let template = `Hello World`;",
        moduleId: 3,
        order: 3
    },

    {
        id: 39,
        title: "2.3 Introduction to DOM",
        desc: "The DOM (Document Object Model) is a programming interface provided by the browser that represents an HTML or XML document as a structured tree of objects. Each element, attribute, and piece of text in the HTML document becomes a node in the DOM tree.\n\ This allows JavaScript to interact with the HTML and CSS of a web page — you can use JavaScript to read and modify the page’s structure, content, and style dynamically. ",
        code: "<!DOCTYPE html><html><head><title>DOM Example</title></head><body></body><h1>Hello, DOM!</h1><p>This is a paragraph.</p></body></html>",
        moduleId: 3,
        order: 3
    },

    // Module - 04
    {
        id: 40,
        title: "1.1 Introduction to Node.js",
        desc: "Node.js is a runtime environment that lets you run JavaScript on the server, not just in the browser.\n\ Normally, JavaScript runs only in the browser (client-side). Node.js allows you to run JavaScript on your computer or server (server-side). With Node.js, you can build the backend of your application using JavaScript—the same language you use for the frontend.\n\ This makes development faster and easier, especially for beginners",
        code: "null",
        moduleId: 4,
        order: 4
    },

    {
        id: 41,
        title: "1.2 Using npm Packages in Node.js (with Express)",
        desc: "In this guide, we’ll install and use an npm package in a Node.js project. We’ll use Express, a popular web framework for Node.js.\n\ Don’t worry about the details of Express for now—we’ll cover that later.\n\ The goal here is simply to show how to install and use packages with npm.",
        code: "mkdir my-npm-app\n\ cd my-npm-app\n\ npm init -y\n\ npm install express\n\ touch app.js\n\ node app.js\n\ node --watch app.js\n\ node -v\n\ npm uninstall express",
        moduleId: 4,
        order: 4
    },

    {
        id: 42,
        title: "1.3 Creating a Simple Node.js Application",
        desc: "Now that Node.js and npm are installed, you can create your first Node.js application. This guide walks you through building a basic “Hello, World” server. ",
        code: "mkdir my-node-app\n\ cd my-node-app\n\ npm init -y\n\ touch app.js\n\ node app.js",
        moduleId: 4,
        order: 4
    },

    {
        id: 43,
        title: "1.4 Node.js Modules",
        desc: "Modules in Node.js are reusable pieces of code that help organize programs into separate files and components. Types of Module :\n\ Core Module\n\ local Module\n\ Third-party Module.",
        code: "const fs = require('fs');\n\ const data = fs.readFileSync('file.txt', 'utf8');\n\ console.log(data); ",
        moduleId: 4,
        order: 4
    },

    {
        id: 44,
        title: "1.5 ES6 Modules vs CommonJS in Node.js",
        desc: "1. CommonJS File Extension:\n\ .js Import Syntax: require()\n\ Export Syntax: module.exports or exports\n\ AND\n\ 2. ES6 Modules File Extension:\n\ .mjs or .js with 'type': 'module' in package.json\n\ Import Syntax: import\n\ Export Syntax: export / export default",
        code: "// math.js\n\ function add(a, b) { return a + b; }\n\ module.exports = { add }; // app.js\n\ const math = require('./math'); console.log(math.add(2, 3));",
        moduleId: 4,
        order: 4
    },

    {
        id: 45,
        title: "1.6 Asynchronous JavaScript",
        desc: "JavaScript runs code one line at a time — it’s single-threaded. This means only one task can happen at any moment. Still, JavaScript can do things like wait for a timer or handle user clicks without stopping everything else. This is because JavaScript uses asynchronous behavior for certain tasks.",
        code: "console.log('A'); setTimeout(() => { console.log('B'); }, 1000); console.log('C'); // Output:\n\ // A\n\ // C\n\ // B (after about 1 second)",
        moduleId: 4,
        order: 4
    },

    {
        id: 46,
        title: "1.7 Introduction to JavaScript Promises",
        desc: "A Promise in JavaScript is a way to handle asynchronous operations. It lets you write code that runs after something finishes, without getting stuck in messy nested callbacks. Think of a Promise like a placeholder for a value that will be available in the future",
        code: "doTask1(function (result1) {  doTask2(result1, function (result2) {  doTask3(result2, function (result3) {  console.log('All tasks done'); }); }); })",
        moduleId: 4,
        order: 4
    },

    {
        id: 47,
        title: "1.8 JavaScript async and await",
        desc: "If you put the keyword async before a function, it automatically returns a Promise. The await keyword is used inside an async function. It tells JavaScript to wait for the Promise to resolve, then continue.",
        code: "function waitTwoSeconds() { return new Promise(function (resolve) {  setTimeout(function () {  resolve('Waited for 2 seconds'); }, 2000); }); }\n\ async function runTask() {  console.log('Start');  const result = await waitTwoSeconds();  console.log(result);  console.log('End'); }\n\ runTask(); Start Waited for 2 seconds End",
        moduleId: 4,
        order: 4
    },

    {
        id: 48,
        title: "1.9 JavaScript Callbacks",
        desc: "A callback is simply a function passed as an argument to another function, to be called later. This might sound confusing at first, but once you see it in action, it becomes very easy to understand.",
        code: "function greet(name) {  console.log('Hello, '' + name); }\n\ function processUser(callback) {  const userName = 'AbdulKadir';  callback(userName); } ",
        moduleId: 4,
        order: 4
    },

    {
        id: 49,
        title: "2.0 Fetch API in JavaScript",
        desc: "The Fetch API provides a modern way to make HTTP requests in JavaScript. It returns a Promise, making it easier to handle asynchronous requests compared to older methods like XMLHttpRequest .",
        code: "fetch(url, options) .then(response => { // handle response }) .catch(error => { // handle error });",
        moduleId: 4,
        order: 4
    },

    // Module - 05
    {
        id: 50,
        title: "1.1 Introduction to MongoDB",
        desc: "MongoDB is a NoSQL document-oriented database designed for modern application development. It stores data in flexible, JSON-like documents, which makes it easy to work with dynamic or semi-structured data. Unlike traditional relational databases (like MySQL or PostgreSQL), MongoDB does not use tables or rows.\n\ Instead, it uses:\n\ Databases → which contain Collections → which contain Documents (individual records in JSON/BSON format)",
        code: "null",
        moduleId: 5,
        order: 5
    },

    {
        id: 51,
        title: "1.2 Setting Up MongoDB",
        desc: "Local Installation (Optional for Beginners) To install MongoDB on your system:\n\ On Windows Go to MongoDB Community Download Center. Download the MSI installer for your version.\n\ Follow the installation steps and enable MongoDB as a service.\n\ Use the terminal to run:",
        code: "mongod\n\ brew tap mongodb/brew\n\ brew install mongodb-community\n\ brew services start\n\ mongodb-community mongo",
        moduleId: 5,
        order: 5
    },

    {
        id: 52,
        title: "1.3 Create and Read Documents",
        desc: "In MongoDB, data is stored in documents (which are JSON-like objects) inside collections. You can perform Create and Read operations using simple methods.\n\ This section will cover:\n\ insertOne()\n\ insertMany()\n\ find()\n\ findOne()\n\ Basic filters and projections Note:\n\ All code examples in this section are written for MongoDB Compass (MongoDB Shell syntax). You can run these directly in the MongoDB Compass shell or mongosh. Setting Up Sample Data Before we start, let’s create a school database with students and teachers.\n\ Run this in MongoDB compass:",
        code: "// Switch to school database use school\n\ // Insert sample teachers\n\ db.teachers.insertMany([ {\n\ _id: ObjectId('507f1f77bcf86cd799439011'),\n\ name: 'Dr. Kumar',\n\ subject: 'MongoDB',\n\ experience: 5 },\n\ {\n\ _id: ObjectId('507f1f77bcf86cd799439012'),\n\ name: 'Prof. Sharma',\n\ subject: 'Node.js',\n\ experience: 8 },\n\ {\n\ _id: ObjectId('507f1f77bcf86cd799439013'),\n\ name: 'Ms. Patel',\n\ subject: 'Express',\n\ experience: 3 }\n\ ]) ",
        moduleId: 5,
        order: 5
    },

    {
        id: 53,
        title: "1.4 Update and Delete Documents",
        desc: "MongoDB provides powerful methods to update or remove documents from a collection.\n\ This section covers:\n\ updateOne()\n\ updateMany()\n\ $set \n\ $inc deleteOne()\n\ deleteMany()\n\ replaceOne()\n\ Understanding ObjectId Note:\n\ All code examples are for MongoDB Compass shell (mongosh). ",
        code: "// Change Ali's course to Advanced MongoDB\n\ db.students.updateOne( { name: 'Ali' },\n\ { $set: { course: 'Advanced MongoDB' }})\n\  AND\n\  // Delete all students who are not enrolled\n\ db.students.deleteMany({ enrolled: false })\n\ // Delete all students with low average grades\n\ db.students.deleteMany({  $expr:\n\ {  $lt:\n\ [{ $avg: '$grades' }, 75] } }) ",
        moduleId: 5,
        order: 5
    },

    {
        id: 54,
        title: "1.5 Query Operators and Filtering",
        desc: "MongoDB provides powerful operators to filter and search documents in flexible ways. In this section, you will learn how to use:\n\ Comparison operators ( $gt , $lt , $eq , $ne , $in , $nin )\n\ Logical operators ( $or , $and , $not , $nor )\n\ Array and embedded field queries Sorting and pagination Note:\n\ All code examples are for MongoDB Compass shell (mongosh)",
        code: "db.students.find({  enrolled: true,\n\ $or: [ { course: 'MongoDB',\n\ age: { $gt: 21 } },\n\ {  course: 'Node.js',\n\ $expr: { $gt: [{ $avg: '$grades' }, 90] } ]})",
        moduleId: 5,
        order: 5
    }
];
