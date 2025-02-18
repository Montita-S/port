import React, { useState, useEffect } from 'react';
import { db } from './Firebase';
import { collection, addDoc } from "firebase/firestore";
import Typed from "react-typed";
import './Home.css'; 
const Home = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [navbarVisible, setNavbarVisible] = useState(false);
    const [section1Visible, setSection1Visible] = useState(false); 
    const [navbarColor, setNavbarColor] = useState('#001233'); 
    const [contact, setContact] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsSuccess(false);
        setIsError(false);

        try {
            await addDoc(collection(db, "contacts"), contact);
            setIsSuccess(true);
            setContact({ name: "", email: "", message: "" });
        } catch (error) {
            setIsError(true);
            console.error("Error adding document: ", error);
        }

        setIsSubmitting(false);
    };

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess(false);
            }, 4000);
            return () => clearTimeout(timer); 
        }
    }, [isSuccess]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 300); 

            if (window.scrollY > 50) {
                setNavbarColor('#0466C8'); // new color
            } else {
                setNavbarColor('#001233'); // Original color
            }
    
            const section1 = document.getElementById('section-1');
            if (section1) {
                const rect = section1.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                setSection1Visible(isVisible);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768); 
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        if (isMobileView) setIsSidebarOpen(false);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 500); 

            const section1 = document.getElementById('section-1');
            if (section1) {
                const rect = section1.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                setSection1Visible(isVisible);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setNavbarVisible(true), 500); 
        return () => clearTimeout(timeout);
    }, []);
    //----------------------------------------------------------------------------
    /*profile */
    const titles = [
        "Web Developer",
        "Front-End Developer",
        "Back-End Developer",
        "Full Stack Developer",
    ];
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 1500; 
    const cursorBlinkTime = 500; 
    // Cursor blinking effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, cursorBlinkTime);

        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        const currentText = titles[index];
        let timeout;

        if (isDeleting) {
            timeout = setTimeout(() => {
                setText((prev) => prev.slice(0, -1));
            }, typingSpeed);
        } else {
            timeout = setTimeout(() => {
                setText((prev) => currentText.slice(0, prev.length + 1));
            }, typingSpeed);
        }

        if (!isDeleting && text === currentText) {
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && text === "") {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % titles.length);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, index]);
    //----------------------------------------------------------------------------------
    /*skill */

    return (
        <div className="hbd-container">
            {/* Sidebar or Navbar */}
            {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
            {isMobileView && !isSidebarOpen ? (
                <nav
                    className={`navbar ${navbarVisible ? 'navbar-visible' : ''}`}
                    style={{ '--navbar-color': navbarColor }}  
                >
            
                    <div className="logo">
                        <div><img src="/images/resu2.png" alt="Logo" /></div>
                        
                    </div>
                </nav>
            ) : null}
            
            {isMobileView ? (
                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <div
                        className={`sidebar-toggle ${isSidebarOpen ? 'close-icon' : 'menu-icon'}`}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? 'X' : '☰'}
                    </div>

                    <ul className="sidebar-menu">
                        <li onClick={() => scrollToSection('section-1')}>ABOUT ME</li>
                        <li onClick={() => scrollToSection('section-2')}>SKILLS</li>
                        <li onClick={() => scrollToSection('section-3')}>PROJECT</li>
                        <li onClick={() => scrollToSection('section-4')}>EXPERIENCE</li>
                        <li onClick={() => scrollToSection('section-5')}>CONTACT ME</li>
                        
                    </ul>
                </div>
            ) : (
                <nav
                    className={`navbar ${navbarVisible ? 'navbar-visible' : ''}`}
                    style={{ '--navbar-color': navbarColor }}  
                >
                
                    
                        <div className="logo">
                            <div><img src="/images/resu2.png" alt="Logo" /></div>
                        </div>

                    
                    <ul className="navbar-links">
                    <li onClick={() => scrollToSection('section-1')}>ABOUT ME</li>
                        <li onClick={() => scrollToSection('section-2')}>SKILLS</li>
                        <li onClick={() => scrollToSection('section-3')}>PROJECTS</li>
                        <li onClick={() => scrollToSection('section-4')}>EXPERIENCE</li>
                        <li onClick={() => scrollToSection('section-5')}>CONTACT ME</li>
                        
                    </ul>
                </nav>
            )}

            {/* Sections */}
            <div
                id="section-1"
                className={`section section-1 ${section1Visible ? 'section-visible' : ''}`}
            >
                <br/>
                <br/>
                <br/>
                <br/>
                <img 
                    src="/images/pro.png" 
                    alt="profile" 
                    className="profile-img" 
                />
                <div className='text-ani'> 
                    {text}
                    <span className="cursor">{showCursor ? "|" : " "}</span>
                </div>
                <div className='text-name'>Hello, I'm Montita Saboomuang</div>
                
                
                <div className='text-des'>
                    I am a Web Developer passionate about creating responsive and 
                    user-friendly websites. With about one year of experience 
                    working on both front-end and back-end development, 
                    I have gained experience and continue to learn to enhance my skills, 
                    focusing on building websites that meet user needs in terms of 
                    functionality and performance.
                </div>
                
               
            </div>

            <div id="section-2" className="section section-2">
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="contact-title">Skills</div>

                <div className="front-title">Framework</div>
                <div className="blocks">
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/React-icon.png" alt="REACT" className="block-image" />
                            
                            <div className="block-message">React.js</div> 
                        </div>
                    </div>

                    <div className="block-container">  
                        <div className='block' >
                            <div style={{marginTop:'20px'}}></div>
                            <img src="/images/django-logo-positive.png" alt="DJANGO" className="block-image" />
                            <div style={{marginTop:'22px'}}></div>
                            <div className="block-message">Django</div> 
                        </div>
                    </div>
                </div>

                <div className="front-title">Front-End & Back-End</div>
                <div className="blocks">
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/express-js (1).png" alt="Express" className="block-image" />
                            <div className="block-message">Express.js</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/images.png" alt="HTML" className="block-image" />
                            <div className="block-message">HTML</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/css-icon.png" alt="css" className="block-image" />
                            <div className="block-message">CSS</div> 
                        </div>
                    </div>
                    
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/Bootstrap.png" alt="Bootstrap" className="block-image" />
                            <div className="block-message">Bootstrap</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/Tailwind.png" alt="Tailwind CSS" className="block-image" />
                            <div className="block-message2">Tailwind CSS</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/mui.png" alt="MUI CSS" className="block-image" />
                            <div className="block-message">MUI</div> 
                        </div>
                    </div>
                    
                </div>

                <div className="front-title">Programming Language</div>
                <div className="blocks">
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/js.jpg" alt="JavaScript" className="block-image" />
                            <div className="block-message">JavaScript</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/py.jpeg" alt="JavaScript" className="block-image" />
                            <div className="block-message">Python</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/ISO_C++_Logo.svg.png" alt="JavaScript" className="block-image" />
                            <div className="block-message">C++</div> 
                        </div>
                    </div>
                </div>

                <div className="front-title">Other Skills</div>
                <div className="blocks">
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/pngimg.com - mysql_PNG9.png" alt="MySQL" className="block-image" />
                            
                            <div className="block-message">MySQL</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/Firebase-logo-02.png" alt="firebase" className="block-image" />
                            
                            <div className="block-message">Firebase</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            
                            <img src="/images/Ultralytics.png" alt="YOLOv8" className="block-image" />
                            
                            <div className="block-message2">Ultralytics YOLOv8</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/opencv.jpeg" alt="OpenCV" className="block-image" />
                            
                            <div className="block-message">OpenCV</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/canva.png" alt="Canva" className="block-image" />
                            
                            <div className="block-message">Canva</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/node-red-icon.png" alt="Node" className="block-image" />
                            
                            <div className="block-message">Node-Red</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/download.png" alt="SolidWorks" className="block-image" />
                            
                            <div className="block-message">SolidWorks</div> 
                        </div>
                    </div>
                    <div className="block-container">  
                        <div className='block' >
                            <img src="/images/Autocad.png" alt="Autocad" className="block-image" />
                            
                            <div className="block-message">Autocad</div> 
                        </div>
                    </div>
                    
                </div>
                

            </div>

            <div id="section-3" className="section section-3">
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="contact-title">Projects</div>
                <div className="web-title">Web Projects</div>
                <div className="blocks">
                    <div className="block-project">  
                        <div className='project' >
                            
                            <img src="/images/port2.png" alt="Autocad" className="project-image" />
                            <div className='port-text'>My Portfolio</div>
                            <div className='visit-inputs'>
                                <div className='date-inputs'>
                                    <img src="/images/React-icon.png" alt="react" className="project-img" />
                                    <img src="/images/css-icon.png" alt="react" className="project-img" />
                                    <img src="/images/Tailwind.png" alt="react" className="project-img" />
                                </div>
                                <div className='date-inputs'>
                                    <a href="https://portfolio-montita.firebaseapp.com/" target="_blank" rel="noopener noreferrer">
                                        <button className="visit-button">Demo</button>
                                    </a>

                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                        <button className="visit-button">Github</button>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="block-project">  
                        <div className='project' >
                           
                            <img src="/images/app-interface.png" alt="Autocad" className="project-image" />
                            <div className='port-text'>Employee Management System</div>
                            <div className='visit-inputs'>
                                <div className='date-inputs'>
                                    <img src="/images/React-icon.png" alt="react" className="project-img" />
                                    <img src="/images/express-js (1).png" alt="express" className="project-img" />
                                    <img src="/images/PhpMyAdmin.png" alt="PhpMyAdmin" className="project-img" />
                                    <img src="/images/css-icon.png" alt="css" className="project-img" />
                                   
                                </div>
                                <div className='date-inputs'>
                                    <a href="https://www.interface.co.th:3000/" target="_blank" rel="noopener noreferrer">
                                        <button className="visit-button">Demo</button>
                                    </a>

                                    <a href="https://github.com/Montita-S/employee-management-system" target="_blank" rel="noopener noreferrer">
                                        <button className="visit-button">Github</button>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="block-project">  
                        <div className='project' >
                            <br/>
                            <img src="/images/durian.png" alt="Autocad" className="project-image" />
                            <div className='port-text'>Durian Fruit Counter System</div>
                            <br/>
                            <div className='visit-inputs'>
                                <div className='date-inputs'>
                                    <img src="/images/React-icon.png" alt="react" className="project-img" />
                                    <img src="/images/Firebase-logo-02.png" alt="Firebase" className="project-img" />
                                    <img src="/images/css-icon.png" alt="css" className="project-img" />
                                    
                                </div>
                                <div className='date-inputs'>
                                    <a href="https://durian-system.web.app/" target="_blank" rel="noopener noreferrer">
                                        <button className="visit-button">Demo</button>
                                    </a>

                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                        <button className="visit-button">Github</button>
                                    </a>

                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="block-project">  
                        <div className='project' >
                            <img src="/images/wasp.png" alt="Autocad" className="project-image" />
                            <div className='port-text'>Monitoring System for Autonomous Mobile</div>
                            <div className='port-text2'> Robot Working Status</div>
                            <div className='visit-inputs'>
                                <div className='date-inputs'>
                                    <img src="/images/React-icon.png" alt="react" className="project-img" />
                                    <img src="/images/Firebase-logo-02.png" alt="Firebase" className="project-img" />
                                    <img src="/images/css-icon.png" alt="css" className="project-img" />
                                    
                                </div>
                                <div className='date-inputs'>
                                    <a href="https://newproject-905b0.web.app/" target="_blank" rel="noopener noreferrer">
                                        <button className="visit-button">Demo</button>
                                    </a>

                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                        <button className="visit-button">Github</button>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block-project">  
                        <div className='project' >
                            <br/>
                            <img src="/images/todo.png" alt="Autocad" className="project-image" />
                            <div className='port-text'>To do List</div>
                            <br/>
                            <div className='visit-inputs'>
                                <div className='date-inputs'>
                                    <img src="/images/React-icon.png" alt="react" className="project-img" />
                                    <img src="/images/Firebase-logo-02.png" alt="Firebase" className="project-img" />
                                    <img src="/images/css-icon.png" alt="css" className="project-img" />
                                    
                                </div>
                                <div className='date-inputs'>
                                    <a href="https://interface-e12ff.web.app/" target="_blank" rel="noopener noreferrer">
                                        <button className="visit-button">Demo</button>
                                    </a>

                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                        <button className="visit-button">Github</button>
                                    </a>

                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="block-project">  
                        <div className='project' >
                            <video className="project-image" controls>
                                <source src="/images/temp.mp4" type="video/mp4" className="project-image"/>
                            </video>

                            <div className='port-text'>Web-based Visualization System</div>
                            <div className='port-text2'>for IOT Smart Farm Sensor</div>
                            <div className='visit-inputs'>
                                <div className='date-inputs'>
                                    <img src="/images/django-logo-positive.png" alt="django" className="project-img" style={{width:'auto'}}/>
                                    <img src="/images/Firebase-logo-02.png" alt="Firebase" className="project-img" />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="section-4" className="section section-4">
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="contact-title">EXPERIENCE</div>
                
                <div className="block-experience">  
                    <div className='experience' >
                        <br/>
                        <div className='job-inputs'>
                            <div className='company-text'>Interface Solutions Co., Ltd. </div>
                            <div className='date-text'>September 2024 - Current</div>
                        </div>
                        
                        <div className='position-text'>Robot Programmer (Web Developer)</div>
                        <div className='desjob-text'>
                            • Improve Website by using React.js for a tracking system to monitor 
                            the status of Autonomous Mobile Robots and to control the robot.
                        </div>
                        <div className='desjob-text'>
                            • Design UI Website and Mobile App for an employee management 
                            system and a system for employees.
                        </div>
                        <div className='desjob-text'>
                            • Design Database on DrawSQL for an employee management system 
                            and a system for employees.
                        </div>
                        <div className='desjob-text'>
                            • Create a website using React.js for an employee management system. 
                            and systems for employees and store data on MySQL database.
                        </div>
                        <div className='visit-inputs2'>
                            <div className='date-inputs'>
                            
                                <img src="/images/React-icon.png" alt="React" className="project-img" />
                                <img src="/images/express-js (1).png" alt="Express" className="project-img" />
                                <img src="/images/PhpMyAdmin.png" alt="PhpMyAdmin" className="project-img" />
                                <img src="/images/css-icon.png" alt="css" className="project-img" />
                                
                            </div>    
                        </div>
                    </div>
                </div>
                
                <div className="block-experience">  
                    <div className='experience' >
                        <br/>
                        <div className='job-inputs'>
                           
                            <div className='company-text'>Triple A Engineering and Supply Co., Ltd.</div>
                            <div className='date-text'>August 2023 - June 2024</div>
                        </div>
                        
                        <div className='position-text'>Web Developer Intern</div>
                        <div className='desjob-text'>
                            • Create Website using Django for follow the results of the robot's 
                            sensors in smart farms By retrieve data from a Firebase database.
                        </div>
                        <div className='desjob-text'>
                            • Create Website using React.js for creating a data tracking 
                            system for Autonomous Mobile Robot working status By
                            retrieve data from a Firebase database.
                        <div className='desjob-text'>
                            • Create Website using React.js for creating system for 
                            Displays the count of durian fruits for a durian orchard survey
                            using Deep Learning.
                        </div>
                        <div className='desjob-text'>
                            • Create Website using React.js for creating an identity 
                            verification by using Firebase Authentication to help manage 
                            the user authentication flow.
                        </div>
                        <div className='visit-inputs2'>
                            <div className='date-inputs'>
                                <img src="/images/django-logo-positive.png" alt="django" className="project-img" style={{width:'auto'}}/>
                                <img src="/images/React-icon.png" alt="React" className="project-img" />
                                <img src="/images/Firebase-logo-02.png" alt="Firebase" className="project-img" />
                                <img src="/images/css-icon.png" alt="css" className="project-img" />
                                <img src="/images/mui.png" alt="mui" className="project-img" />
                            </div>    
                        </div>
                        <br/>
                        <div className='position-text'>AI Engineer Intern (Deep Learning)</div>
                        <div className='desjob-text'>
                            • Create a system for measuring the size of durian for durian 
                            tree survey based on Deep Learning using YOLOv8 for object detection.
                        </div>
                        <div className='visit-inputs2'>
                            <div className='date-inputs'>
                                <img src="/images/Ultralytics3.png" alt="django" className="project-img" style={{width:'auto',height:'70px'}}/>
                                <img src="/images/py.jpeg" alt="python" className="project-img" style={{width:'auto',height:'55px'}}/>
                                <img src="/images/colab-color.png" alt="colab" className="project-img" style={{width:'auto',height:'55px'}}/>
                                <img src="/images/robo.png" alt="mui" className="project-img" style={{width:'auto',height:'55px'}}/>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
                
            </div>
            <div id="section-5" className="section section-5">
               
                    <div className="contact-title">Contact Me</div>
                    {isSuccess && <p className="success-message">Message sent successfully!</p>}
                    {isError && <p className="error-message">Failed to send message. Try again.</p>}
                    <div className='add-leave-container '>
                        <form className="contact-form" onSubmit={handleSubmit}>

                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Enter Your Name" 
                                value={contact.name} 
                                onChange={handleChange} 
                                required 
                                
                            />

                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter Your Email" 
                                value={contact.email} 
                                onChange={handleChange} 
                                required 
                            />

                            <label htmlFor="message">Message</label>
                            <textarea 
                                name="message" 
                                placeholder="Enter Your Message" 
                                value={contact.message} 
                                onChange={handleChange} 
                                required 
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button type="submit" disabled={isSubmitting} >
                                    <img 
                                        src="/images/send-white-icon.png" 
                                        alt="send Icon" 
                                        className="button-icon" 
                                    />
                                    {isSubmitting ? "Sending..." : "Submit"}
                                </button>
                            </div>

                            
                        </form>
                    </div>

            </div>

            <footer id="section-6" className="footer">
                <div className="footer-content">
                    
                    <div className="contact-info">
                    
                        <div className='text-contact'>Contact Me</div>
                        <p>Email: <a href="mailto:montita6431358@gmail.com">montita6431358@gmail.com</a></p>
                        <p>Phone: <a href="tel:094-921-1360">094-921-1360</a></p>
                    </div>
                    <div className="social-links">
                        <a href="https://www.facebook.com/mayy.alice30/" target="_blank" rel="noopener noreferrer">
                            <img src="/images/facewhite-icon.png" alt="Facebook" />
                        </a>
                        <a href="https://line.me/ti/p/cfAwrpe9nM" target="_blank" rel="noopener noreferrer">
                            <img src="/images/line-me.png" alt="Line" style={{width:'35px',height:'33px'}}/>
                        </a>
                        <a href="https://www.instagram.com/montimayy?igsh=MTFtYWczZXBjMGt1ZQ==" target="_blank" rel="noopener noreferrer">
                            <img src="/images/instagram-white-icon.png" alt="Instagram" />
                        </a>
                        <a href="https://github.com/Montita-S" target="_blank" rel="noopener noreferrer">
                            <img src="/images/github-11-xxl.png" alt="github" />
                        </a>
                    </div>
                    <br/>
                    <div>© 2025 Montita Saboomuang. All rights reserved.</div>
                    <br/>
                </div>
            </footer>

            {/* Back to Top Button */}
            {isScrolled && (
                <button className="back-to-top" onClick={scrollToTop}>
                    <img src="/images/ee.png" alt="Logo" className="hbd-img" /> TO TOP
                </button>
            )}
        </div>
    );
};

export default Home;