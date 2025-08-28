# GitHub Pages Deployment Checklist

## Pre-Upload Checklist ✅

- [x] index.html exists in root with portfolio content
- [x] All CSS files are in css/ folder
- [x] Profile photo (me.jpg) is in assets/ folder
- [x] Resume (Weyehn_Reeves_Resume.pdf) is in assets/ folder
- [x] portfolio.js exists in root
- [x] All links in HTML point to correct paths (no ../ needed)

## GitHub Pages File Structure:

```
Repository Root/
├── index.html (main portfolio file)
├── css/
│   ├── main.css
│   ├── base.css
│   ├── components/
│   │   ├── navigation.css
│   │   └── tech-tags.css
│   └── sections/
│       ├── hero.css
│       ├── about.css
│       ├── skills.css
│       ├── tools.css
│       ├── projects.css
│       ├── experience.css
│       ├── contact.css
│       └── footer.css
├── assets/
│   ├── me.jpg
│   └── Weyehn_Reeves_Resume.pdf
├── portfolio.js
└── README.md
```

## GitHub Pages Setup:

1. Go to https://github.com/WeyehnR/My-Profolio
2. Click Settings → Pages
3. Select "Deploy from branch" → "master" → "/ (root)"
4. Click Save
5. Wait 5-10 minutes for deployment

## After Deployment Testing:

1. Visit: https://weyehnr.github.io/My-Profolio/
2. Check if site loads correctly
3. Test all navigation links
4. Test download resume button
5. Test project GitHub links
6. Test mobile responsiveness
7. Check all images load properly

## Troubleshooting:

- If site doesn't load: Check if index.html is in public_html root
- If images don't show: Check file paths in HTML
- If styles don't load: Check CSS file paths
- If resume doesn't download: Check assets/ folder upload

## Optional Improvements:

- Enable SSL certificate in Hostinger panel
- Set up custom domain
- Enable Cloudflare for better performance
- Add Google Analytics tracking
