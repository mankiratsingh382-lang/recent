import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Layout/Navbar';
import { Button } from './components/UI/Button';
import { Modal } from './components/UI/Modal';
import { AuthForm } from './components/Forms/AuthForm';
import { api } from './services/api';
import { Course, BlogPost, CareerItem, ModalType } from './types';

// Sections
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-[#0a585b] mb-8 pb-3 border-b-4 border-[#0a585b]/20 inline-block">
    {children}
  </h2>
);

export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [careerItems, setCareerItems] = useState<CareerItem[]>([]);
  
  // Modal State
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Initial Data Fetch
  useEffect(() => {
    const initData = async () => {
      const [c, p, ci] = await Promise.all([
        api.fetchCourses(),
        api.fetchBlogPosts(),
        api.fetchCareerItems()
      ]);
      setCourses(c);
      setPosts(p);
      setCareerItems(ci);
    };
    initData();
  }, []);

  const closeModal = () => {
    setModalType(ModalType.NONE);
    setSelectedPost(null);
  };

  const handleAuthSuccess = (name: string) => {
    alert(`Success! Welcome, ${name}.`);
    closeModal();
  };

  const openBlogModal = (post: BlogPost) => {
    setSelectedPost(post);
    setModalType(ModalType.BLOG_DETAIL);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Floating Logo Decoration */}
      <img 
        src="https://picsum.photos/100/100?grayscale" 
        alt="" 
        className="fixed top-1/3 -right-6 w-24 h-24 opacity-10 rounded-2xl animate-float-slow -z-10 pointer-events-none" 
      />

      <Navbar 
        onRegisterClick={() => setModalType(ModalType.REGISTER)} 
        onEnrollClick={() => setModalType(ModalType.ENROLL)}
      />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full space-y-24">
        
        {/* HERO SECTION */}
        <section id="home" className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_-10px_rgba(10,88,91,0.15)] flex flex-col md:flex-row items-center gap-12 animate-fade-in border border-[#0a585b]/5">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a585b] leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a585b] to-[#2dd4bf]">AlphaPrime</span>
            </h1>
            <p className="text-lg md:text-xl text-[#0f766e] max-w-lg leading-relaxed">
              Your gateway to mastering skills and advancing your career with expert-led courses and insightful resources.
            </p>
            <div className="pt-4">
              <Button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth'})}>
                Explore Courses
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-[#0a585b] rounded-2xl transform rotate-3 opacity-10"></div>
            <img 
              src="https://picsum.photos/800/600?random=10" 
              alt="Learning" 
              className="w-full h-auto rounded-2xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500" 
            />
          </div>
        </section>

        {/* COURSES SECTION */}
        <section id="courses">
          <SectionTitle>Featured Courses</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length === 0 ? (
                // Skeletons
               [1,2,3].map(i => <div key={i} className="h-96 bg-gray-100 rounded-3xl animate-pulse"></div>)
            ) : (
              courses.map(course => (
                <div key={course.id} className="bg-white rounded-3xl p-5 border border-[#0a585b]/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                  <div className="overflow-hidden rounded-2xl mb-4 h-48">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#0a585b]">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">{course.description}</p>
                  <Button variant="outline" fullWidth onClick={() => setModalType(ModalType.ENROLL)}>Enroll Now</Button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* CHARTS SECTION */}
        <section id="charts">
          <SectionTitle>Market Trends</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <figure key={item} className="flex flex-col items-center gap-3 group cursor-pointer">
                <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-md border-2 border-transparent group-hover:border-[#0a585b] transition-all animate-float">
                  <img 
                    src={`https://picsum.photos/200/200?random=${item + 20}`} 
                    alt="Chart" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <figcaption className="text-xs font-bold uppercase tracking-wider text-[#0a585b] group-hover:text-[#0f766e]">
                  Chart Analysis {item}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* BLOG SECTION */}
        <section id="blog">
          <SectionTitle>Latest Insights</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map(post => (
              <article key={post.id} className="bg-white rounded-3xl p-6 border border-[#0a585b]/10 shadow-sm hover:shadow-xl transition-all duration-300">
                <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                <h3 className="text-lg font-bold text-[#0a585b] mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
                <button 
                  onClick={() => openBlogModal(post)}
                  className="text-[#0a585b] font-bold text-sm hover:underline flex items-center gap-1"
                >
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* CAREER SECTION */}
        <section id="career">
          <SectionTitle>Career Guidance</SectionTitle>
          <div className="space-y-6">
            {careerItems.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#0a585b]/10 hover:shadow-lg transition-shadow flex items-center gap-6">
                <div className="w-16 h-16 bg-[#e0fcfc] rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0a585b] mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <section id="contact" className="bg-[#0a585b] text-white rounded-t-[3rem] -mx-6 px-8 py-12 md:py-20 mt-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold font-display">Get In Touch</h2>
            <div className="flex flex-wrap justify-center gap-8 text-lg opacity-90">
              <a href="mailto:info@alphaprime.com" className="hover:text-[#a8d5a3] transition-colors">info@alphaprime.com</a>
              <span>|</span>
              <a href="tel:+1234567890" className="hover:text-[#a8d5a3] transition-colors">+1 234 567 890</a>
            </div>
            <div className="flex justify-center gap-6 pt-4">
              {['Facebook', 'Twitter', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-[#0a585b] transition-all">
                  {social[0]}
                </a>
              ))}
            </div>
            <p className="text-sm opacity-50 pt-8">&copy; 2025 AlphaPrime. All rights reserved.</p>
          </div>
        </section>
      </main>

      {/* MODALS */}
      <Modal 
        isOpen={modalType === ModalType.ENROLL} 
        onClose={closeModal} 
        title="Enroll in Course"
      >
        <AuthForm type="enroll" onSuccess={handleAuthSuccess} onCancel={closeModal} />
      </Modal>

      <Modal 
        isOpen={modalType === ModalType.REGISTER} 
        onClose={closeModal} 
        title="Create Account"
      >
        <AuthForm type="register" onSuccess={handleAuthSuccess} onCancel={closeModal} />
      </Modal>

      <Modal 
        isOpen={modalType === ModalType.BLOG_DETAIL && !!selectedPost} 
        onClose={closeModal} 
        title={selectedPost?.title || ''}
      >
        <div className="space-y-4">
          <img src={selectedPost?.image} alt={selectedPost?.title} className="w-full h-48 object-cover rounded-xl" />
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {selectedPost?.content}
          </p>
          <div className="pt-4 flex justify-end">
            <Button onClick={closeModal}>Close</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}