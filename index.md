# CMPS 369 Fall 2015

## Web Application Development

**Meeting Time:** Monday, Wednesday, Thursday 11:30am-12:40pm
**Location:** ASB 429
**Professor:**&nbsp;&nbsp;Scott Frees, Professor of Computer Science

** Contact Information**
Office&nbsp;&nbsp;G315
Phone&nbsp;&nbsp;(201) 684-7726
Email&nbsp;&nbsp;[sfrees@ramapo.edu](mailto:sfrees@ramapo.edu)

**Office Hours:**   Monday 12:45-1:45pm and Thursday 4-5pm

## Course Description
This course provides in-depth treatment of the critical languages, design patterns, and technologies underpinning all of modern web application development. The basics of networking, along with the details of the HTTP protocol are introduced. HTML (through version 5), CSS (through version 3) are presented from the perspective of an application developer.
JavaScript is covered as the primary language for both client side development (utilizing jQuery and other front-end libraries) and server side (utilizing the node.js library).

Advanced JavaScript topics such as closures and asynchronous programming are covered in depth.
The course also introduces the MVC (Model View Controller) architecture for web development and covers the Express framework including EJS and Jade templating, along with front-end toosl like LESS, Bootstrap, and React.

An overview of other popular languages and frameworks such as LESS, Ruby on Rails, ASP.NET MVC, and PHP are also provided to increase the breadth of the students’ knowledge in the field.

Note, this course is taught under the assumption that the student has programming knowledge and experience in an object-oriented language such as C++ or Java, as it JavaScript is used extensively throughout the semester. The emphasis of this course is web development from an application programmer’s perspective. It is a technical course, not suitable for students without an adequate background in computer science.
<hr class="print-page"/>

## Content Map
We'll be bouncing back and forth between server-side and client-side technologies throughout the semester.  On the server (right side of the picture below), all of our work will be based on Node.js, and we'll start out by looking at JavaScript fundamentals in detail.  We'll migrate to looking at frameworks (express), data access (MongoDB), and more advanced topics later in the semester.

In the beginning of the term, client-side (left side of picture) will be focused on core technologies - HTML, CSS, and JavaScript/jQuery.  Towards the end of the semester we'll look at big productivity boosters like Twitter's Bootstrap and Facebooks' React.

<img src="Content-Map.png"/>
<hr class="print-page"/>

# Course Requirements
This course is taught under the assumption that the student has programming knowledge and experience in an object-oriented language such as C++ or Java, as it JavaScript is used extensively throughout the semester. The emphasis of this course is web development from an application programmer’s perspective. **It is a technical course, not suitable for students without an adequate background in computer science.**

## Pre-Requisites
**CMPS 311** - Operating Systems
No prior experience in web development is required, however students are expected to have strong programming skills in an object oriented language such as C++, Java, or C# prior to taking this course.

## Text books

<img style="float:left;margin-right:1em" width="100" src="http://ecx.images-amazon.com/images/I/51dN9K8smTL._SX393_BO1,204,203,200_.jpg"/>
[Beginning HTML and CSS](http://www.amazon.com/Beginning-HTML-CSS-Rob-Larsen/dp/1118340183)

by Rob Larson

ISBN-10: 1118340183
ISBN-13: 978-1118340189

**Required**

<hr/>

<img style="float:left;margin-right:1em" width="100" src="http://ecx.images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg"/>
[JavaScript - the definitive guide - 6th Edition](http://www.amazon.com/JavaScript-Definitive-Guide-Activate-Guides/dp/0596805527)

by David Flanagan

ISBN-10: 0596805527  ISBN-13: 978-0596805524

**Required**

<hr/>

<img style="float:left;margin-right:1em" width="100" src="http://ecx.images-amazon.com/images/I/51RGM5yQNsL._SX258_BO1,204,203,200_.jpg"/>
[Professional Node.js: Building Javascript Based Scalable Software](http://www.amazon.com/Professional-Node-js-Building-Javascript-Scalable/dp/1118185463)

by Pedro Tiexeira

ISBN-10: 1118185463  ISBN-13: 978-1118185469

**Recommended**

## Course Materials - Required Programs
This course will require you to write HTML, CSS, and JavaScript code. A simple text editor is all that is necessary, however installing a good programming editor is highly recommended. In addition, you will also need to install Node.js. Node.js, along with many programming text editors, are available on all major operating systems (Windows, Mac OS X, Linux).
It is highly recommended that you have access to your own computer to do your development on, most machines in college labs will not have Node.js installed. However, for assignments only dealing with client-side programming, you may be able to use any machine in the labs.

## Course Materials - Program Editors
While your basic text editor will allow you to write HTML/CSS and JavaScript, it can be quite error prone without an editor that supports automatic indentation and syntax highlighting. There are many possibilities. If you wish, you can also use larger integrated develoment environments (IDE), such as Microsoft Visual Studio or eclipse. Use of a full-fledged IDE is not absolutely necessary however, and many web developers prefer to use light-weight editors such as those listed below.

- [Sublime Text](http://www.sublimetext.com/) - runs on Windows, Mac OSX, Linux. (Note, the free trial works forever...)
- [Github's Atom](https://atom.io/) - runs on Windows, Mac OSX, Linux.  Free.

# Course Structure
All slides, code, and any other material for this class will always be posted to MOODLE.  This site will be kept up to date as well, however if there is ever a difference in schedule or due date, always view Moodle as the definative source of information.

## Schedule
<div style="margin:0px;padding:0px;overflow:hidden">
    <iframe src="https://docs.google.com/spreadsheets/d/1mp40LwkelKq8KOVs5gXJL83qmy8G8vNUOTd0DjkbL2k/pubhtml?gid=103028565&single=true" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:1200px;width:100%;" height="100%" width="100%"></iframe>
</div>

## Other slides/Resources
<p><a href="slides_pdf">Slides in PDF form (for printing)</a></p>
<p><a href="https://docs.google.com/presentation/d/1HfTdhszJ43I1lIgbff8VvQ4jQudB3Z4IPqJ56IqMcr4/pub?start=false&loop=false&delayms=3000">Exam 1 Review Slides</a></p>

# In-Class Code

## Networking Examples  (Lecture 2 - 3)
- [tcpServer.cpp](code/server-demos/tcpServer.cpp)
- [tcpClient.cpp](code/server-demos/tcpClient.cpp)
- [tcp_client.js](code/server-demos/tcp_client.js)
- [tcp_server.js](code/server-demos/tcp_server.js)
- [http.js](code/server-demos/http.js)

## HTML Service (Lectures 3-7)
- [03_http_file_demo](code/03_http_file_demo/index.html)

## HTML Form processing and EJS Templates (Lectures 8-9)
- [05_form_processing_demo](code/05_form_processing.tar.gz)
- [06_form_templates_demo](code/06_form_templates.tar.gz)
- [07_guessing_game_1_demo](code/07_guessing1.tar.gz)
- [08_guessing_sessions](code/08_guessing_sessions.zip)

## JavaScript Examples
- [09_js_examples](code/09_js_examples)
- [10_guessing_spas](code/10_guessing_spas.zip)
- [11_jquery](code/11_jquery)
- [12_guessing_ajax](code/12_guessing_ajax.zip)

## Database Examples
- [14_mongodb_example](code/14_mongodb_example.zip)
- [15_guessing_mongo](code/15_guessing_mongo.zip)

## Express Examples
- [16_guessing_express.zip](code/16_guessing_express.zip)
- [17_guessing_jade.zip](code/17_guessing_jade.zip)
- [18_guessing_less.zip](code/18_guessing_less.zip)

## Authentication / Passport example
- [20_guessing_secure.zip](code/20_guessing_secure.zip)

# Homework Assignments
There are three homework assignments and two larger programming projects assigned for this course.  

|Link to Homework Assignment| Due Date
|--|----
| [Homework 1](https://docs.google.com/document/d/1TFvoSgDqj26uk0F_ffVI600D0184hPugJYQURaImD4c/pub) |  9/21
| [Homework 2](https://docs.google.com/document/d/1vD8UQT-ot7BDysyKRHCsvrRHsOkxv-rYCnnkpmbnNnc/pub) |  9/24
| [Homework 3](https://docs.google.com/document/d/1SY9-yYsalcCoK1JLLHJqcuBNH-lkB3KM1J3xZ2g3BgM/pub) |  10/26

|Link to Projects| Due Date
|--|----
| [Project 1](https://docs.google.com/document/d/1P_cGhz1tsRNYKk7KvCRNXDdZwdyP70iv3CJ2Zc5hmDU/pub) |  10/21
| [Project 2](https://docs.google.com/document/d/1-5Oigr6RwMwN3gMvgz-oDwA315uuJ7srt8FYPRyhDwE/pub) |  11/18

# Final Project
The final project will be due the same day as our scheduled final exam.  The full details can be found [here](https://docs.google.com/document/d/1lfnxI3C_44m9MwZaBxAtfBb9w6jciJvoIsSQw40mXvg/pub).  You will show me your running code during the final exam period.  The final project is **instead** of the final exam.

# Grading

| % | Activity
|------------------:|:---------------
|5%| Attendance
|15%| Homework Assignments (3)
|20%| Programming Projects (2)
|40%| Exams (2)
|20%| Final Project (in place of Final Exam)

## Late Policy

All assignments will be turned in electronically. A late penalty of 10 points per day will be applied to all late assignments. No assignments over 5 days late will be accepted. The required format/method of your electronic submissions will be outlined for each assignment. Deviation from these requirements may result in a 5-point penalty.


## Attendance Policy
You are required to attend each class, late arrival (after attendance has been recorded) will count as a full absence. You are allowed 1 unexcused absence (all others will count against your attendance grade). You must have documentation to receive an “excused” absence.

## Letter Grade Assignment

| Letter | Numeric Score | Letter | Numeric Score | Letter | Numeric Score
|--------|---------------|
|A       | 100-94 |A- | 93-90 |
| B+ | 89-87 | B | 86-84 | B- | 83-80 |
|C+ | 79-77 |C | 76-74 |C-| 73-70|
|D+| 69-67|D| 66-60|F| < 60 |


# Policy on Academic Integrity
Students are expected to read and understand Ramapo College’s Academic Integrity Policy, which can be found in the Ramapo College Catalog.  Members of the Ramapo College community are expected to be honest and forthright in their academic endeavors.  Students who are suspected of violating this policy will be referred to the Office of the Provost.

When completing lab programming exercises, you may review code with your fellow students; however, copying source code is strictly forbidden.  For homework programming assignments, you may discuss ideas, however you may not allow others to see your source code or examine others’.  Sharing of source code is extremely easy to detect and is strictly prohibited.   If sharing of source code is suspected, intentional or otherwise, both parties will immediately be referred to the Office of the Provost.

# Students with Disabilities:
If you need course adaptation or accommodations because of a disability that has been documented with the Office of Specialized Services, please make an appointment during my office hours.
