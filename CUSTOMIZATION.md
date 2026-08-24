# Customization Guide

## Quick Start

Your landing page is now running at **http://localhost:3001**

## Customizing Your Ecosystem Items

### 1. Update the Items Array

Edit `app/page.tsx` and modify the `ecosystemItems` array:

```typescript
const ecosystemItems: MenuItem[] = [
  {
    image: 'https://your-image-url.com/image.jpg',  // Image URL or local path
    link: 'https://your-destination.com',           // Where to navigate on click
    title: 'Your Title',                            // Displayed on hover
    description: 'Your description text',           // Additional info
  },
  // Add more items...
];
```

### 2. Using Local Images

To use local images instead of URLs:

1. Create a `public/images` folder
2. Add your images there (e.g., `public/images/platform.jpg`)
3. Reference them as: `image: '/images/platform.jpg'`

### 3. Adjust the 3D Effect

In `app/page.tsx`, change the `scale` prop:

```typescript
<InfiniteMenu items={ecosystemItems} scale={2.4} />
```

- **Larger values** (e.g., 3.0): Zoom out, see more items
- **Smaller values** (e.g., 1.5): Zoom in, items appear larger

## Styling Customization

### Colors

Edit `app/globals.css`:

```css
:root {
  --background: #000000;  /* Background color */
  --foreground: #ffffff;  /* Text color */
}
```

### Header

Modify the header in `app/page.tsx`:

```typescript
<h1 className="text-white text-2xl md:text-4xl font-bold">
  Your Brand Name
</h1>
```

### Navigation Links

Update the nav links in `app/page.tsx`:

```typescript
<nav className="hidden md:flex gap-6">
  <a href="/docs">Docs</a>
  <a href="/community">Community</a>
  <a href="/about">About</a>
</nav>
```

## Advanced Customization

### Change Background Color

In `components/InfiniteMenu.tsx`, find the `render()` method and change:

```typescript
gl.clearColor(0, 0, 0, 0);  // RGBA values (0-1)
```

### Adjust Animation Speed

In `components/InfiniteMenu.tsx`, modify:

```typescript
private TARGET_FRAME_DURATION = 1000 / 60;  // 60 FPS
```

### Change Sphere Size

In `components/InfiniteMenu.tsx`, adjust:

```typescript
private SPHERE_RADIUS = 2;  // Larger = bigger sphere
```

## Tips

1. **Image Requirements**: Use square images (e.g., 600x600px) for best results
2. **Image Format**: JPG, PNG, or WebP work well
3. **Performance**: Limit to 20-30 items for optimal performance
4. **Mobile**: The component is touch-enabled and works on mobile devices

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy your landing page.

## Troubleshooting

### WebGL Not Working

- Ensure your browser supports WebGL2
- Try disabling browser extensions
- Check browser console for errors

### Images Not Loading

- Check CORS settings if using external images
- Verify image URLs are accessible
- Use local images in the `public` folder

### Performance Issues

- Reduce the number of items
- Use smaller image file sizes
- Compress images before adding them

## Need Help?

Check the main README.md for more information or open an issue on GitHub.
