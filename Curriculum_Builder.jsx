import React, { useState } from 'react';
import { modules as initialModules, lessons as initialLessons } from '../data/Curriculum_Data.js';
import './Curriculum_Builder.css';

// Curriculum Buider
function Curriculum_Builder() {
    const [modules] = useState(initialModules);
    const [lessons] = useState(initialLessons);

    const [openId, setOpenId] = useState(1);
    const [selectedLesson, setSelectedLesson] = useState(initialLessons[0]);

    function handleModuleClick(id) {
        console.log("Module Clicked", id);
        if (openId == id) {
            setOpenId(null);
        } else {
            setOpenId(id);
        }
    }

    function handleLessonClick(lesson) {
        console.log("Lesson Clicked", lesson.title);
        setSelectedLesson(lesson);
    }

    function formatCode(code) {
        if (!code) return "";
        let formatted = code.replace(/></g, '>\n<');
        formatted = formatted.replace(/;/g, ';\n');
        formatted = formatted.replace(/{/g, '{\n ');
        formatted = formatted.replace(/}/g, '\n}');
        return formatted;
    }

    return (
        <div className='main-box'>
            <h2 className='heading'>Full Stack Web Development</h2>
            <div className='content-box'>

                {/* Left Side */}
                <div className='left-part'>
                    {modules.map((mod) => (
                        <div key={mod.id} className='module-box'>
                            <div className='module-title' onClick={() => handleModuleClick(mod.id)}>
                                <b>{mod.title}</b>
                                <span>{openId == mod.id ? '▲' : '▼'}</span>
                            </div>

                            {openId == mod.id && (
                                <div className='lesson-list'>
                                    {lessons.filter(l => l.moduleId == mod.id).map(l => (
                                        <p
                                            key={l.id}
                                            className={selectedLesson.id == l.id ? 'lesson-text active' : 'lesson-text'}
                                            onClick={() => handleLessonClick(l)}
                                        >
                                            {l.title}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right Side */}
                <div className='right-part'>
                    <h3 className='lesson-heading'>{selectedLesson.title}</h3>
                    <p className='desc'>{selectedLesson.desc}</p>
                    <div className='code-box'>
                        <pre><code>{formatCode(selectedLesson.code)}</code></pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Curriculum_Builder;