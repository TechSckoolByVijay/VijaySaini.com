# Free Resources Directory

This directory contains downloadable resources that are unlocked after email submission on the Download page.

## Required Files

Add the following PDF/resource files to this directory:

1. **devops-2026-curriculum.pdf** - 45-page comprehensive DevOps learning guide
2. **azure-cheat-sheet.pdf** - Quick reference for Azure services
3. **kubernetes-guide.pdf** - Essential kubectl commands and concepts
4. **genai-playbook.pdf** - RAG systems and AI agents guide
5. **all-resources.zip** - ZIP file containing all above PDFs

## File Naming

File names must match exactly as referenced in `assets/js/download.js`:

```javascript
const resourceUrls = {
    'devops-curriculum': 'assets/resources/devops-2026-curriculum.pdf',
    'azure-cheat-sheet': 'assets/resources/azure-cheat-sheet.pdf',
    'kubernetes-guide': 'assets/resources/kubernetes-guide.pdf',
    'genai-playbook': 'assets/resources/genai-playbook.pdf',
    'all': 'assets/resources/all-resources.zip'
};
```

## Usage

When users submit their email on the Download page:
1. Email is sent to n8n webhook for lead capture
2. Resources are unlocked in the UI (localStorage)
3. Users can click individual download buttons
4. Users can download all resources as a ZIP

## Creating the ZIP File

You can create the ZIP file with PowerShell:

```powershell
Compress-Archive -Path "devops-2026-curriculum.pdf","azure-cheat-sheet.pdf","kubernetes-guide.pdf","genai-playbook.pdf" -DestinationPath "all-resources.zip"
```

Or manually using any ZIP tool.

## Placeholder Files

Until real files are ready, the system will show a "Coming soon!" message when users try to download. Add actual PDF files to enable downloads.
