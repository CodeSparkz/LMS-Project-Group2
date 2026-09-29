import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCourses, STATUSES } from "./CourseContext";
import CourseLogo from "./CourseLogo";

const PAGE = 6;
const SORTS = {
  new: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
  az: (a, b) => a.title.localeCompare(b.title),
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
};

function ConfirmModal({ title, text, onYes, onNo, yes = "Delete" }) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onNo();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onNo]);
  return (
    <div className="modal-bg" onClick={onNo}>
      <div className="card modal" role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p className="meta">{text}</p>
        <div className="acts">
          <button className="btn" autoFocus onClick={onNo}>Cancel</button>
          <button className="btn bad" onClick={onYes}>{yes}</button>
        </div>
      </div>
    </div>
  );
}

export default function MyCourses() {
  const { courses, trash, categories, resetData, updateCourse, deleteCourse, restoreCourse, addCourse } = useCourses();
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(""), [st, setSt] = useState("all"), [cat, setCat] = useState("all");
  const [sort, setSort] = useState("new"), [page, setPage] = useState(1);
  const [sel, setSel] = useState([]), [ask, setAsk] = useState(null);
  const [showTrash, setShowTrash] = useState(false), [reset, setReset] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 450); return () => clearTimeout(t); }, []);

  const list = useMemo(() =>
    (showTrash ? trash : courses)
      .filter(c => (st === "all" || c.status === st) && (cat === "all" || c.category === cat) &&
        c.title.toLowerCase().includes(q.toLowerCase()))
      .sort(SORTS[sort]),
    [courses, trash, showTrash, q, st, cat, sort]);

  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const cur = Math.min(page, pages);
  const rows = list.slice((cur - 1) * PAGE, cur * PAGE);
  const count = s => courses.filter(c => c.status === s).length;
  const f = fn => v => { fn(v); setPage(1); };

  const allOn = rows.length > 0 && rows.every(c => sel.includes(c.id));
  const togAll = () => setSel(allOn ? sel.filter(id => !rows.some(c => c.id === id)) : [...new Set([...sel, ...rows.map(c => c.id)])]);
  const tog = id => setSel(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]));

  const del = ids => {
    deleteCourse(ids); setSel([]); setAsk(null);
    toast(t => (
      <span>{ids.length} course{ids.length > 1 ? "s" : ""} deleted{" "}
        <button className="btn sm" onClick={() => { restoreCourse(ids); toast.dismiss(t.id); }}>Undo</button>
      </span>), { duration: 5000 });
  };
  const bulk = status => { updateCourse(sel, { status }); toast.success(`${sel.length} course(s) set to ${status}`); setSel([]); };
  const clear = () => { setQ(""); setSt("all"); setCat("all"); setPage(1); };

  return (
    <>
      <div className="head">
        <div><h1>My courses</h1><p>Only published courses are visible to students.</p></div>
        <div className="acts">
          <button className="btn" onClick={() => { setShowTrash(t => !t); setSel([]); setPage(1); }}>
            {showTrash ? "Back to courses" : `Trash (${trash.length})`}
          </button>
          <Link className="btn pri" to="/courses/new">+ New course</Link>
        </div>
      </div>

      <div className="card mixcard">
        <div className="mixtop">
          <span><b>{courses.length}</b> courses</span>
          <span className="legend">
            {STATUSES.map(s => <span key={s}><i className={"d seg-" + s} />{count(s)} {s}</span>)}
          </span>
        </div>
        <div className="mix">
          {STATUSES.map(s => <span key={s} className={"seg-" + s} style={{ width: (courses.length ? (count(s) / courses.length) * 100 : 0) + "%" }} />)}
        </div>
      </div>

      <div className="toolbar">
        <input aria-label="Search courses" placeholder="Search by title…" value={q} onChange={e => f(setQ)(e.target.value)} />
        <select aria-label="Filter by status" value={st} onChange={e => f(setSt)(e.target.value)}>
          <option value="all">All statuses</option>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select aria-label="Filter by category" value={cat} onChange={e => f(setCat)(e.target.value)}>
          <option value="all">All categories</option>{categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select aria-label="Sort" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="new">Recently updated</option><option value="az">Title A–Z</option>
          <option value="low">Price: low to high</option><option value="high">Price: high to low</option>
        </select>
      </div>

      {sel.length > 0 && (
        <div className="bulk">
          <b>{sel.length} selected</b>
          <button className="btn sm" onClick={() => bulk("published")}>Publish</button>
          <button className="btn sm" onClick={() => bulk("archived")}>Archive</button>
          <button className="btn sm bad" onClick={() => setAsk(sel)}>Delete</button>
          <button className="btn sm" onClick={() => setSel([])}>Clear</button>
        </div>
      )}

      <div className="card tablecard">
        {loading ? [1, 2, 3, 4].map(i => <div key={i} className="skel" />) :
          (showTrash ? trash : courses).length === 0 ? (
            <div className="empty"><h3>{showTrash ? "Trash is empty" : "No courses yet"}</h3>
              <p>{showTrash ? "Deleted courses show up here so you can restore them." : "Create your first course to get started."}</p>
              {showTrash ? <button className="btn" onClick={() => setShowTrash(false)}>Back to courses</button>
                : <Link className="btn pri" to="/courses/new">Create a course</Link>}</div>
          ) : rows.length === 0 ? (
            <div className="empty"><h3>No matching courses</h3><p>Try a different search or clear the filters.</p>
              <button className="btn" onClick={clear}>Clear filters</button></div>
          ) : (
            <table>
              <thead><tr>
                <th><input type="checkbox" aria-label="Select all on page" checked={allOn} onChange={togAll} /></th>
                <th>Course</th><th>Level</th><th>Price</th><th>Status</th><th>Updated</th><th>Actions</th>
              </tr></thead>
              <tbody>
                {rows.map(c => (
                  <tr key={c.id} className={sel.includes(c.id) ? "sel" : ""}>
                    <td className="first"><input type="checkbox" aria-label={"Select " + c.title} checked={sel.includes(c.id)} onChange={() => tog(c.id)} /></td>
                    <td className="first">
                      <div className="cell">
                        <CourseLogo course={c} size={48} />
                        <div><b>{c.title}</b><div className="meta sd">{c.shortDescription}</div><div className="meta">{c.category}{c.duration ? " · " + c.duration : ""}</div></div>
                      </div>
                    </td>
                    <td data-l="Level">{c.level}</td>
                    <td data-l="Price">{c.price ? "$" + c.price : "Free"}</td>
                    <td data-l="Status">
                      <select className={"badge " + c.status} aria-label={"Status of " + c.title} value={c.status}
                        onChange={e => { updateCourse(c.id, { status: e.target.value }); toast.success("Status: " + e.target.value); }}>
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td data-l="Updated">{new Date(c.updatedAt).toLocaleDateString()}</td>
                    <td data-l="Actions">
                      <div className="acts">
                        {showTrash ? <button className="btn sm pri" onClick={() => { restoreCourse(c.id); toast.success("Course restored"); }}>Restore</button> : <>
                        <Link className="btn sm" to={`/courses/${c.id}/edit`}>Edit</Link>
                        <button className="btn sm" onClick={() => { addCourse({ ...c, title: c.title + " (Copy)", status: "draft" }); toast.success("Duplicated as draft"); }}>Duplicate</button>
                        <button className="btn sm bad" onClick={() => setAsk([c.id])}>Delete</button></>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        {!loading && pages > 1 && (
          <div className="pager">
            <button className="btn sm" disabled={cur === 1} onClick={() => setPage(cur - 1)}>Previous</button>
            {Array.from({ length: pages }, (_, i) => (
              <button key={i} className={"btn sm" + (cur === i + 1 ? " pri" : "")} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="btn sm" disabled={cur === pages} onClick={() => setPage(cur + 1)}>Next</button>
          </div>
        )}
      </div>

      <p className="meta foot"><button className="link" onClick={() => setReset(true)}>Restore the 5 sample courses</button></p>
      {reset && (
        <ConfirmModal title="Restore sample courses?" text="This replaces all current courses with the 5 starter courses." yes="Restore"
          onYes={() => { resetData(); setReset(false); toast.success("Sample courses restored"); }} onNo={() => setReset(false)} />
      )}
      {ask && (
        <ConfirmModal title={`Delete ${ask.length} course${ask.length > 1 ? "s" : ""}?`}
          text="Students will no longer see it. You can undo right after deleting."
          onYes={() => del(ask)} onNo={() => setAsk(null)} />
      )}
    </>
  );
}
