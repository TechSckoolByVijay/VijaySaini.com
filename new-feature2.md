Enhance an existing static website by adding a "Download" feature.

GOAL:
Create a "Download DevOps 2026 Curriculum" page that collects user details and triggers an n8n workflow via webhook.

REQUIREMENTS:
1. Add a top navigation item labeled "Download"
2. Create `download.html` containing:
   - Name (required)
   - Email (required)
   - Submit button ("Send me the curriculum")
3. On submit:
   - Prevent page reload
   - Send a POST request to an n8n webhook URL
4. Payload format:
   {
     "name": "<user name>",
     "email": "<user email>",
     "source": "website",
     "asset": "devops-2026-curriculum"
   }
5. Show user-friendly feedback:
   - Loading state
   - Success message
   - Error message
6. No backend code allowed.
7. Form should be minimal, professional, and responsive.

DELIVERABLES:
- download.html
- JavaScript fetch() logic
- Graceful error handling
- Accessible form markup

CONSTRAINTS:
- Static site only
- n8n handles email + PDF attachment
- No authentication
