import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCourses, LEVELS, LANGS, STATUSES } from "./CourseContext";
import CourseLogo, { ACCENTS } from "./CourseLogo";

const DK = "lms_course_draft";
const empty = { title: "", shortDescription: "", duration: "", accent: "", description: "", category: "", thumbnail: "", price: 0, language: "English", level: "Beginner", status: "draft" };

function validate(f, paid) {
  const e = {};
  if (f.title.trim().length < 5) e.title = "Title needs at least 5 characters.";
  if (!f.shortDescription.trim()) e.shortDescription = "Add a one-line summary for the course card.";
  if (!f.category) e.category = "Choose a category.";
  if (paid && !(Number(f.price) > 0)) e.price = "Enter a price above 0, or switch to Free.";
  if (f.description.replace(/<[^>]+>/g, "").trim().length < 20) e.description = "Write at least 20 characters so students know what to expect.";
  return e;
}

const Err = ({ m }) => (m ? <small className="err" role="alert">{m}</small> : null);
const Field = ({ label, error, children }) => (
  <label className="field"><span>{label}</span>{children}<Err m={error} /></label>
);

function Editor({ value, onChange }) {
  const ref = useRef();
  useEffect(() => { if (ref.current.innerHTML !== value) ref.current.innerHTML = value; }, [value]);
  const cmd = c => { document.execCommand(c); onChange(ref.current.innerHTML); };
  return (
    <div className="editor">
      <div className="etools">
        {[["bold", "B"], ["italic", "I"], ["insertUnorderedList", "•"], ["insertOrderedList", "1."]].map(([c, l]) => (
          <button type="button" key={c} aria-label={c} onMouseDown={e => { e.preventDefault(); cmd(c); }}>{l}</button>
        ))}
      </div>
      <div ref={ref} className="edit" contentEditable role="textbox" aria-multiline="true"
        data-ph="What will students learn?" onInput={() => onChange(ref.current.innerHTML)} />
    </div>
  );
}

export default function CourseForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const { getCourse, addCourse, updateCourse, categories, addCategory } = useCourses();
  const existing = id ? getCourse(id) : null;

  const [f, setF] = useState(() => {
    if (existing) return { ...empty, ...existing };
    try { return JSON.parse(localStorage.getItem(DK)) || empty; } catch { return empty; }
  });
  const [err, setErr] = useState({}), [dirty, setDirty] = useState(false);
  const [paid, setPaid] = useState(f.price > 0), [drag, setDrag] = useState(false), [newCat, setNewCat] = useState("");
  const set = (k, v) => { setF(p => ({ ...p, [k]: v })); setDirty(true); setErr(e => ({ ...e, [k]: undefined })); };

  useEffect(() => { // auto-save new-course draft
    if (dirty && !existing) try { localStorage.setItem(DK, JSON.stringify(f)); } catch { /* too large */ }
  }, [f, dirty, existing]);
  useEffect(() => { // warn before closing tab with unsaved changes
    const h = e => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  if (id && (!existing || existing.isDeleted))
    return <div className="card empty"><h3>Course not found</h3><p>It may have been deleted.</p><Link className="btn pri" to="/">Back to my courses</Link></div>;

  const pick = file => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Choose an image file (PNG, JPG or WebP).");
    if (file.size > 500 * 1024) return toast.error("Image must be under 500 KB.");
    const r = new FileReader();
    r.onload = () => set("thumbnail", r.result);
    r.readAsDataURL(file);
  };

  const submit = status => {
    const data = { ...f, status: status || f.status, price: paid ? Number(f.price) : 0, title: f.title.trim() };
    const e = validate(data, paid);
    setErr(e);
    if (Object.keys(e).length) return toast.error("Fix the highlighted fields to continue.");
    existing ? updateCourse(id, data) : addCourse(data);
    localStorage.removeItem(DK); setDirty(false);
    toast.success(existing ? "Changes saved" : "Course created");
    nav("/");
  };

  return (
    <>
      <div className="head">
        <div>
          <h1>{existing ? "Edit course" : "New course"}</h1>
          <p>{existing ? "Changes show up for students as soon as you save." : "Your progress is saved automatically as a draft."}</p>
        </div>
        <Link className="btn" to="/">Back to courses</Link>
      </div>

      <div className="layout">
        <div className="card">
          <Field label="Course title" error={err.title}>
            <input value={f.title} maxLength={80} placeholder="e.g. React from Scratch" onChange={e => set("title", e.target.value)} />
          </Field>
          <Field label={`Short description (${f.shortDescription.length}/120)`} error={err.shortDescription}>
            <input value={f.shortDescription} maxLength={120} placeholder="One line students see on the course card" onChange={e => set("shortDescription", e.target.value)} />
          </Field>
          <div className="row">
            <Field label="Category" error={err.category}>
              <select value={f.category} onChange={e => set("category", e.target.value)}>
                <option value="">Select a category</option>{categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Level">
              <select value={f.level} onChange={e => set("level", e.target.value)}>{LEVELS.map(c => <option key={c}>{c}</option>)}</select>
            </Field>
          </div>
          <div className="field addcat">
            <input aria-label="New category" placeholder="Need another category? Type a name" value={newCat} onChange={e => setNewCat(e.target.value)} />
            <button type="button" className="btn" onClick={() => { const n = newCat.trim(); if (!n) return; addCategory(n); set("category", n); setNewCat(""); }}>Add category</button>
          </div>
          <div className="row">
            <Field label="Duration"><input value={f.duration} placeholder="e.g. 4 weeks" onChange={e => set("duration", e.target.value)} /></Field>
            <div className="field"><span>Logo color</span>
              <div className="seg sw">
                {ACCENTS.map(a => <button type="button" key={a} aria-label={"Logo color " + a} className={"swatch" + (f.accent === a ? " on" : "")} style={{ background: a }} onClick={() => set("accent", a)} />)}
                <button type="button" className="btn sm" onClick={() => set("accent", "")}>Auto</button>
              </div>
            </div>
          </div>
          <div className="row">
            <Field label="Language">
              <select value={f.language} onChange={e => set("language", e.target.value)}>{LANGS.map(c => <option key={c}>{c}</option>)}</select>
            </Field>
            <div className="field"><span>Pricing</span>
              <div className="seg">
                <button type="button" className={"btn" + (!paid ? " on" : "")} onClick={() => { setPaid(false); setDirty(true); }}>Free</button>
                <button type="button" className={"btn" + (paid ? " on" : "")} onClick={() => { setPaid(true); setDirty(true); }}>Paid</button>
              </div>
            </div>
          </div>
          {paid && (
            <Field label="Price (USD)" error={err.price}>
              <input type="number" min="1" value={f.price || ""} placeholder="29" onChange={e => set("price", e.target.value)} />
            </Field>
          )}
          <div className="field"><span>Description</span>
            <Editor value={f.description} onChange={v => set("description", v)} />
            <Err m={err.description} />
          </div>
        </div>

        <aside className="side">
          <div className="card">
            <div className="field"><span>Course image (optional, otherwise a logo is used)</span>
              <label className={"drop" + (drag ? " on" : "")}
                onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}>
                Drop an image here or click to browse
                <input type="file" accept="image/*" hidden onChange={e => pick(e.target.files[0])} />
              </label>
            </div>
            <div className="prev">
              <CourseLogo course={f} size={130} w="100%" />
              <h3>{f.title || "Course title"}</h3>
              <p className="meta sd">{f.shortDescription || "Your short description appears here"}</p>
              <div className="meta">{f.category || "Category"} · {f.level} · {paid && f.price ? "$" + f.price : "Free"}</div>
              {f.thumbnail && <button type="button" className="btn sm" onClick={() => set("thumbnail", "")}>Remove image</button>}
            </div>
          </div>
          <div className="card">
            <Field label="Status">
              <select value={f.status} onChange={e => set("status", e.target.value)}>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select>
            </Field>
            <p className="meta">Draft and archived courses stay hidden from students.</p>
            <div className="acts">
              <button className="btn pri" onClick={() => submit()}>{existing ? "Save changes" : "Save course"}</button>
              {f.status !== "published" && <button className="btn" onClick={() => submit("published")}>Publish</button>}
              {existing && dirty && <button className="btn" onClick={() => { setF({ ...empty, ...existing }); setPaid(existing.price > 0); setDirty(false); }}>Revert changes</button>}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
