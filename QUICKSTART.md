# Quick Start Guide

## 🎉 Your Landing Page is Ready!

Your Next.js landing page with the interactive 3D InfiniteMenu is now running at:

**http://localhost:3001**

## 📝 Next Steps

### 1. Customize Your Ecosystem Items

Edit `data/ecosystem.ts` to add your own projects:

```typescript
export const ecosystemItems: MenuItem[] = [
  {
    image: '/images/your-project.jpg',  // Add images to public/images/
    link: 'https://your-project.com',
    title: 'Your Project',
    description: 'Your description',
  },
  // Add more items...
];
```

### 2. Add Your Images

1. Create folder: `public/images/`
2. Add your square images (600x600px recommended)
3. Reference them: `image: '/images/filename.jpg'`

### 3. Update Branding

Edit `app/page.tsx` to change:
- Site title in the header
- Navigation links
- Instructions text

### 4. Adjust the 3D Effect

In `data/ecosystem.ts`, change the scale:

```typescript
export const menuConfig = {
  scale: 2.4, // Try values between 1.5 and 4.0
};
```

## 🎨 Styling

### Colors
Edit `app/globals.css`:
```css
:root {
  --background: #000000;
  --foreground: #ffffff;
}
```

### Fonts
Add fonts in `app/layout.tsx` using Next.js font optimization.

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the .next folder
```

## 📱 Features

- ✅ Interactive 3D sphere navigation
- ✅ Drag to rotate
- ✅ Click items to navigate
- ✅ Touch-enabled for mobile
- ✅ Smooth animations
- ✅ WebGL2 rendering
- ✅ Responsive design

## 🔧 Configuration Files

- `data/ecosystem.ts` - Your ecosystem items and config
- `app/page.tsx` - Main landing page
- `components/InfiniteMenu.tsx` - 3D component
- `app/globals.css` - Global styles
- `tailwind.config.ts` - Tailwind configuration

## 💡 Tips

1. **Images**: Use square images for best results
2. **Performance**: Limit to 20-30 items
3. **Browser**: Requires WebGL2 support (Chrome, Firefox, Safari, Edge)
4. **Mobile**: Works great on touch devices

## 📚 Documentation

- See `README.md` for full documentation
- See `CUSTOMIZATION.md` for detailed customization guide

## 🐛 Troubleshooting

### Port Already in Use
The dev server will automatically use the next available port (3001, 3002, etc.)

### Images Not Loading
- Check image paths are correct
- Ensure images are in the `public` folder
- Verify CORS settings for external images

### WebGL Errors
- Update your browser to the latest version
- Check if WebGL2 is enabled in browser settings
- Try disabling browser extensions

## 🎯 What's Included

```
LandingMotus/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── InfiniteMenu.tsx  # 3D menu component
├── data/
│   └── ecosystem.ts      # Your ecosystem data
├── public/               # Static assets (add your images here)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🎨 Example Customizations

### Change Background Color
In `components/InfiniteMenu.tsx`, find the `render()` method:
```typescript
gl.clearColor(0.1, 0.1, 0.2, 1); // Dark blue background
```

### Add More Navigation Links
In `app/page.tsx`:
```typescript
<nav className="hidden md:flex gap-6">
  <a href="/docs">Docs</a>
  <a href="/blog">Blog</a>
  <a href="/contact">Contact</a>
</nav>
```

### Adjust Animation Speed
In `data/ecosystem.ts`:
```typescript
export const menuConfig = {
  scale: 2.4,
  // You can add more config options here
};
```

---

**Need help?** Check the full documentation in `README.md` and `CUSTOMIZATION.md`
