// Resume Loader - Dynamically loads content from resume.md
// This is a placeholder for future enhancement to load resume data dynamically

class ResumeLoader {
    constructor() {
        this.resumeData = null;
    }
    
    async loadResume() {
        try {
            const response = await fetch('data/resume.md');
            const text = await response.text();
            this.resumeData = this.parseMarkdown(text);
            return this.resumeData;
        } catch (error) {
            console.error('Error loading resume:', error);
            return null;
        }
    }
    
    parseMarkdown(markdown) {
        // Basic markdown parser
        // This would parse the resume.md file and extract structured data
        const data = {
            name: '',
            title: '',
            email: '',
            phone: '',
            location: '',
            about: '',
            skills: [],
            experience: [],
            projects: [],
            certifications: [],
            education: []
        };
        
        // Parse sections from markdown
        const lines = markdown.split('\n');
        let currentSection = '';
        
        lines.forEach(line => {
            // Extract name (first H1)
            if (line.startsWith('# ') && !data.name) {
                data.name = line.replace('# ', '').trim();
            }
            
            // Extract email
            if (line.includes('Email:')) {
                const emailMatch = line.match(/mailto:([^\]]+)/);
                if (emailMatch) data.email = emailMatch[1];
            }
            
            // Extract phone
            if (line.includes('Phone:')) {
                const phoneMatch = line.match(/\*\*Phone:\*\* (.+)/);
                if (phoneMatch) data.phone = phoneMatch[1];
            }
            
            // Identify sections
            if (line.includes('# 🔹 **About Me**')) currentSection = 'about';
            if (line.includes('# 🔹 **Skills**')) currentSection = 'skills';
            if (line.includes('# 🔹 **Experience**')) currentSection = 'experience';
            if (line.includes('# 🔹 **Projects**')) currentSection = 'projects';
            if (line.includes('# 🔹 **Certifications**')) currentSection = 'certifications';
        });
        
        return data;
    }
    
    // Utility method to inject data into DOM
    injectData(elementId, content) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = content;
        }
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResumeLoader;
}

// Initialize resume loader
const resumeLoader = new ResumeLoader();

// Example usage (commented out - enable if needed):
// document.addEventListener('DOMContentLoaded', async () => {
//     const resumeData = await resumeLoader.loadResume();
//     if (resumeData) {
//         console.log('Resume loaded:', resumeData);
//         // Inject data into page elements
//     }
// });
