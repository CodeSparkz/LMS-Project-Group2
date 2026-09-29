import { createContext, useContext, useEffect, useReducer, useState } from "react";

export const DEFAULT_CATEGORIES = ["Web Development", "Programming", "Data Science", "Design", "Artificial Intelligence"];
export const LEVELS = ["Beginner", "Intermediate", "Advanced"];
export const LANGS = ["English", "Urdu", "Hindi", "Arabic"];
export const STATUSES = ["draft", "published", "archived"];

const KEY = "lms_courses_v2", CATKEY = "lms_categories_v2";
const mk = (n, title, category, level, price, shortDescription, duration) => {
  const d = new Date(Date.now() - n * 864e5).toISOString();
  return { id: "c_" + n, title, category, level, price, shortDescription, duration, status: "published",
    language: "English", thumbnail: "", accent: "",
    description: `<p>${shortDescription}</p><p>Short lessons and practice tasks, designed to be followed at your own pace.</p>`,
    isDeleted: false, instructorId: "u_1", createdAt: d, updatedAt: d };
};
const seed = [
  mk(1, "HTML & CSS Web Development", "Web Development", "Beginner", 0, "Learn how to create modern responsive websites.", "4 weeks"),
  mk(2, "JavaScript Programming", "Programming", "Intermediate", 5, "Learn JavaScript, DOM manipulation and events.", "5 weeks"),
  mk(3, "Python Data Science", "Data Science", "Intermediate", 5, "Learn Python and basic data analysis techniques.", "6 weeks"),
  mk(4, "UI / UX Design", "Design", "Beginner", 0, "Learn the fundamentals of user interface design.", "4 weeks"),
  mk(5, "Generative AI", "Artificial Intelligence", "Beginner", 5, "Learn prompt engineering and practical applications of Generative AI.", "3 weeks"),
];

const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || seed; } catch { return seed; } };

function reducer(s, a) {
  const now = new Date().toISOString();
  if (a.type === "ADD")
    return [...s, { ...a.course, id: crypto.randomUUID(), instructorId: "u_1", isDeleted: false, createdAt: now, updatedAt: now }];
  if (a.type === "PATCH")
    return s.map(c => (a.ids.includes(c.id) ? { ...c, ...a.changes, updatedAt: now } : c));
  if (a.type === "RESET") return seed;
  return s;
}

const Ctx = createContext();

export function CourseProvider({ children }) {
  const [all, dispatch] = useReducer(reducer, null, load);
  const [cats, setCats] = useState(() => { try { return JSON.parse(localStorage.getItem(CATKEY)) || DEFAULT_CATEGORIES; } catch { return DEFAULT_CATEGORIES; } });
  useEffect(() => { try { localStorage.setItem(CATKEY, JSON.stringify(cats)); } catch { /* ignore */ } }, [cats]);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* storage full */ }
  }, [all]);

  const patch = (ids, changes) => dispatch({ type: "PATCH", ids: [].concat(ids), changes });
  const live = all.filter(c => !c.isDeleted);
  const value = {
    categories: cats,                                           // instructors can add more
    addCategory: n => setCats(c => (c.includes(n) ? c : [...c, n])),
    trash: all.filter(c => c.isDeleted),
    resetData: () => { dispatch({ type: "RESET" }); setCats(DEFAULT_CATEGORIES); },
    courses: live,                                              // instructor view
    publishedCourses: live.filter(c => c.status === "published"), // use this on the student side
    getCourse: id => all.find(c => c.id === id),
    addCourse: course => dispatch({ type: "ADD", course }),
    updateCourse: patch,                                        // (idOrIds, changes)
    deleteCourse: ids => patch(ids, { isDeleted: true }),       // soft delete
    restoreCourse: ids => patch(ids, { isDeleted: false }),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCourses = () => useContext(Ctx);
