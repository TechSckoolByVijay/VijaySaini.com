# n8n Webhook Configuration Guide

This guide will help you set up the n8n webhook for the download form to automatically send emails with the DevOps 2026 Curriculum PDF.

## 📋 Prerequisites

- n8n instance (self-hosted or n8n.cloud)
- Email service (Gmail, SendGrid, etc.)
- PDF file of the DevOps 2026 Curriculum

## 🔧 Step-by-Step Setup

### 1. Create a New Workflow in n8n

1. Log into your n8n instance
2. Click "Create new workflow"
3. Name it: "DevOps Curriculum Download"

### 2. Add Webhook Trigger

1. Click the "+" button
2. Search for "Webhook"
3. Select "Webhook" node
4. Configuration:
   - **HTTP Method:** POST
   - **Path:** devops-curriculum (or your choice)
   - **Authentication:** None (or configure as needed)
   - **Response Mode:** Immediately
   - **Response Code:** 200

5. Copy the **Production URL** - you'll need this!

### 3. Add Email Node

1. Click the "+" after Webhook
2. Search for your email service:
   - Gmail
   - SendGrid
   - SMTP
   - Mailgun
   - etc.

### 4. Configure Email Node (Example: Gmail)

**Gmail Settings:**
- **Credentials:** Add Gmail OAuth2 credentials
- **Resource:** Message
- **Operation:** Send

**Email Configuration:**
```
To: {{ $json["email"] }}
Subject: Your DevOps 2026 Curriculum Guide
From Name: Vijay Saini
From Email: your-email@gmail.com
```

**Email Body (HTML):**
```html
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Welcome, {{ $json["name"] }}! 🎉</h2>
    
    <p>Thank you for downloading the <strong>DevOps 2026 Curriculum Guide</strong>!</p>
    
    <p>This comprehensive guide includes:</p>
    <ul>
        <li>Complete learning path from beginner to expert</li>
        <li>Essential tools and technologies to master</li>
        <li>Industry-demanded skills and certifications</li>
        <li>Real-world project ideas and hands-on labs</li>
        <li>Career progression and salary expectations</li>
        <li>Interview preparation tips and questions</li>
    </ul>
    
    <p>The PDF is attached to this email.</p>
    
    <hr>
    
    <h3>🎓 Want to Go Deeper?</h3>
    <p>Check out my comprehensive courses:</p>
    <ul>
        <li><strong>Azure DevOps Masterclass</strong> - Master CI/CD, Kubernetes, and Terraform</li>
        <li><strong>Generative AI with Azure OpenAI</strong> - Build production RAG systems</li>
        <li><strong>Kubernetes Production Mastery</strong> - Deploy and scale enterprise apps</li>
    </ul>
    
    <p><a href="https://vijaysaini.com/projects.html" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">Browse All Courses</a></p>
    
    <hr>
    
    <p>Best regards,<br>
    <strong>Vijay Saini</strong><br>
    Generative AI Specialist & Cloud Architect</p>
    
    <p style="font-size: 0.9em; color: #666;">
        📧 Email: vijaysainiprofessional@gmail.com<br>
        🔗 LinkedIn: <a href="https://linkedin.com/in/vijay-saini-10759a8b">linkedin.com/in/vijay-saini-10759a8b</a><br>
        🌐 Website: <a href="https://vijaysaini.com">vijaysaini.com</a>
    </p>
</body>
</html>
```

### 5. Add Attachment (PDF)

**Option A: Upload to n8n**
1. In Email node, scroll to "Attachments"
2. Click "Add Attachment"
3. Upload your PDF file

**Option B: Link from Cloud Storage**
1. Upload PDF to cloud (Dropbox, Google Drive, Azure Blob)
2. Get public/signed URL
3. Use HTTP Request node to fetch
4. Attach binary data to email

### 6. Add CRM/Database Node (Optional)

Track leads by adding nodes:
- **Google Sheets** - Log to spreadsheet
- **Airtable** - CRM database
- **Webhook** - Send to your CRM
- **MySQL/PostgreSQL** - Store in database

**Example: Google Sheets Node**
- **Credentials:** Add Google Sheets OAuth2
- **Resource:** Sheet
- **Operation:** Append
- **Fields:**
  - Name: `{{ $json["name"] }}`
  - Email: `{{ $json["email"] }}`
  - Source: `{{ $json["source"] }}`
  - Asset: `{{ $json["asset"] }}`
  - Date: `{{ $now }}`

### 7. Test the Workflow

1. Click "Execute Workflow"
2. In browser, open Developer Tools (F12)
3. Go to your download page
4. Fill the form with test data
5. Submit form
6. Check n8n execution
7. Verify email received

### 8. Update Website Code

1. Copy the **Production Webhook URL** from n8n
2. Open `assets/js/download.js`
3. Replace the URL:

```javascript
const N8N_WEBHOOK_URL = 'YOUR_ACTUAL_WEBHOOK_URL';
```

Example:
```javascript
const N8N_WEBHOOK_URL = 'https://your-n8n.app.n8n.cloud/webhook/devops-curriculum';
```

4. Save and deploy

## 📊 Workflow JSON Template

```json
{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "devops-curriculum",
        "responseMode": "responseNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "fromEmail": "your-email@gmail.com",
        "toEmail": "={{ $json[\"email\"] }}",
        "subject": "Your DevOps 2026 Curriculum Guide",
        "emailType": "html",
        "message": "=<html>...</html>",
        "options": {}
      },
      "name": "Gmail",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 1,
      "position": [450, 300],
      "credentials": {
        "gmailOAuth2": {
          "id": "1",
          "name": "Gmail account"
        }
      }
    },
    {
      "parameters": {
        "respondWith": "text",
        "responseBody": "=Success"
      },
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [650, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Gmail",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Gmail": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## 🔒 Security Best Practices

1. **Enable CORS** in n8n webhook settings if hosting on different domain
2. **Use HTTPS** only
3. **Add rate limiting** to prevent abuse
4. **Validate email addresses** before sending
5. **Add CAPTCHA** (optional) to prevent bots
6. **Use authentication** on webhook if concerned about abuse

## 🧪 Testing Checklist

- [ ] Webhook receives POST request
- [ ] Email variables populate correctly
- [ ] PDF attachment works
- [ ] Email deliverability (not in spam)
- [ ] Form shows success message
- [ ] Form shows error message (test by stopping n8n)
- [ ] Mobile responsiveness
- [ ] Different email providers (Gmail, Outlook, etc.)

## 🚨 Troubleshooting

**Problem: Form submits but no email**
- Check n8n execution logs
- Verify webhook URL is correct
- Check email credentials

**Problem: Email goes to spam**
- Use verified sender email
- Add SPF/DKIM records
- Avoid spam trigger words
- Use professional email service

**Problem: CORS error**
- Enable CORS in n8n webhook settings
- Add your domain to allowed origins

**Problem: Large PDF not attaching**
- Compress PDF file
- Use cloud storage link instead
- Check email provider attachment limits

## 📧 Alternative: SendGrid Template

For better deliverability, use SendGrid:

1. Create SendGrid account
2. Design email template in SendGrid
3. Use SendGrid node in n8n
4. Pass variables to template:
   - `name`: `{{ $json["name"] }}`
   - `email`: `{{ $json["email"] }}`

## 🎯 Success!

Once configured:
1. User fills form
2. Website sends POST to n8n
3. n8n sends email with PDF
4. User receives curriculum
5. Lead captured for follow-up

**You're ready to generate leads!** 🚀

---

Need help? Contact: vijaysainiprofessional@gmail.com
