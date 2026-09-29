export const LOGOS = {
  "Web Development": ["</>", "#2b78e4", "#e8f1fe"],
  Programming: ["{ }", "#7c5ce0", "#f0ecfd"],
  "Data Science": ["∑", "#12a594", "#e3f6f3"],
  Design: ["✎", "#e26d3d", "#fdeee7"],
  "Artificial Intelligence": ["✦", "#c2418f", "#fdeaf4"],
  default: ["◆", "#5b7089", "#eef2f6"],
};
export const ACCENTS = ["#2b78e4", "#7c5ce0", "#12a594", "#e26d3d", "#c2418f", "#d99a1e"];

export default function CourseLogo({ course, size = 48, w }) {
  const style = { width: w || size, height: size };
  if (course.thumbnail) return <img className="clogo" style={style} src={course.thumbnail} alt="" />;
  const [glyph, color, bg] = LOGOS[course.category] || LOGOS.default;
  const fg = course.accent || color;
  return (
    <div className="clogo" aria-hidden="true"
      style={{ ...style, color: fg, background: course.accent ? course.accent + "22" : bg, fontSize: size * 0.36 }}>
      {glyph}
    </div>
  );
}
