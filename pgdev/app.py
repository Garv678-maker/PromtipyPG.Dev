"""_PG.Dev — Flask app (homepage first).
Run:  pip install -r requirements.txt && python app.py   ->  http://127.0.0.1:5000
All data below is DEMO data. Replace with a database/API later.
"""
from flask import Flask, render_template

app = Flask(__name__)

NAV = [("Courses", "#courses"), ("Learning Paths", "#paths"), ("Practice", "#practice"),
       ("Projects", "#projects"), ("Resources", "#resources"), ("About", "#about")]

# Stats are placeholders — swap with real values before launch.
STATS = [("10K+", "Learners"), ("50+", "Courses"), ("200+", "Lessons"), ("100+", "Projects")]

COURSES = [
    {"icon": "terminal", "title": "Python Programming", "level": "Beginner", "hours": 18, "lessons": 42, "progress": 62,
     "desc": "Syntax, data structures, functions and file handling with graded exercises."},
    {"icon": "cpu", "title": "C Programming", "level": "Beginner", "hours": 20, "lessons": 38, "progress": 35,
     "desc": "Memory, pointers and control flow: the foundations behind every language."},
    {"icon": "globe", "title": "Web Development", "level": "Beginner", "hours": 24, "lessons": 56, "progress": 18,
     "desc": "HTML, CSS and accessible layout, built through small real pages."},
    {"icon": "braces", "title": "JavaScript", "level": "Intermediate", "hours": 22, "lessons": 48, "progress": 0,
     "desc": "The language of the browser: DOM, async code and modern ES modules."},
    {"icon": "atom", "title": "React", "level": "Intermediate", "hours": 26, "lessons": 44, "progress": 0,
     "desc": "Components, state and data fetching by building a complete app."},
    {"icon": "brain", "title": "AI & Machine Learning", "level": "Advanced", "hours": 32, "lessons": 60, "progress": 0,
     "desc": "From linear models to neural networks, with Python and real datasets."},
]

PATHS = [
    ("Programming Fundamentals", ["C", "Python", "Problem Solving"]),
    ("Web Development", ["HTML", "CSS", "JavaScript", "Git"]),
    ("Modern Development", ["React", "Node.js", "Databases", "APIs"]),
    ("AI / ML", ["Python", "NumPy", "Pandas", "Machine Learning", "AI Projects"]),
]

PROJECTS = [
    ("Weather App", "Beginner", "Python · Flask · SQLite", "Fetch forecasts from a public API and cache them."),
    ("Expense Tracker", "Beginner", "JavaScript · LocalStorage", "Track spending with categories and monthly totals."),
    ("Chat Application", "Intermediate", "Node.js · WebSockets", "Real-time rooms with message history."),
    ("Face Detection System", "Advanced", "Python · OpenCV", "Detect faces in images and live video."),
]

RESOURCES = [
    ("Python Cheat Sheet", "Cheat Sheets", "Python", "Beginner"),
    ("Web Dev Roadmap", "Roadmaps", "Web", "Beginner"),
    ("Git Command Notes", "Notes", "Git", "Beginner"),
    ("Pointers in C: Practice Set", "Practice Questions", "C", "Intermediate"),
    ("React Documentation Guide", "Documentation", "React", "Intermediate"),
    ("ML Interview Questions", "Interview Questions", "AI", "Advanced"),
]

COMMUNITY = [("Ask the Community", "Post a question and get answers from learners and mentors."),
             ("Share your Project", "Show what you built and collect feedback."),
             ("Discuss a Topic", "Join threads, study groups and announcements.")]

FOOTER = {
    "Platform": ["Courses", "Learning Paths", "Practice", "Projects"],
    "Resources": ["Notes", "Roadmaps", "Cheat Sheets", "Documentation"],
    "Company": ["About", "Contact", "Privacy", "Terms"],
}


@app.route("/")
def home():
    return render_template("index.html", nav=NAV, stats=STATS, courses=COURSES, paths=PATHS,
                           projects=PROJECTS, resources=RESOURCES, community=COMMUNITY, footer=FOOTER)


if __name__ == "__main__":
    app.run(debug=True)
