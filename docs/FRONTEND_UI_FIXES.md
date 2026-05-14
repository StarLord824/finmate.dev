# Frontend UI Visibility Fixes - Summary

## Issues to Fix

### 1. FinMate Logo Not Visible ❌
**Problem:** Logo uses `bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent` which makes it invisible on white background.

**Fix:** Use solid black text
```tsx
// Change from:
<span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
  FinMate
</span>

// To:
<span className="text-xl font-bold text-slate-900 dark:text-white">
  FinMate
</span>
```

### 2. Sidebar Scrolling Issue ❌
**Problem:** Sidebar scrolls but the article grid scrolls with it.

**Fix:** Add independent scrolling to sidebar
```tsx
// In FiltersPanel.tsx
<aside className="space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 scrollbar-hide">
  {/* Content */}
</aside>

// In page.tsx - ensure sidebar is sticky
<div className="sticky top-20">
  <FiltersPanel />
</div>
```

### 3. White Text on White Background ❌
**Problem:** Many elements use `text-white` or poor contrast colors.

**Fix:** Use black/slate colors for light mode
- Headers: `text-slate-900 dark:text-white`
- Body text: `text-slate-700 dark:text-slate-300`
- Muted text: `text-slate-500 dark:text-slate-400`
- Borders: `border-slate-200 dark:border-slate-700`
- Backgrounds: `bg-white dark:bg-slate-800`

---

## Complete Fix Implementation

### File: `apps/frontend-web/components/Header.tsx`

**Lines 106-114:**
```tsx
{/* Logo */}
<Link href="/" className="flex items-center gap-2 group">
  <div className="relative">
    <TrendingUp className="h-7 w-7 text-slate-900 dark:text-teal-600 transition-transform group-hover:scale-110" />
  </div>
  <span className="text-xl font-bold text-slate-900 dark:text-white">
    FinMate
  </span>
</Link>
```

### File: `apps/frontend-web/components/FiltersPanel.tsx`

**Add scrolling and fix colors:**
```tsx
export function FiltersPanel({...}: FiltersPanelProps): ReactElement {
  return (
    <aside className="space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 scrollbar-hide">
      {/* Categories */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
        <h3 className="font-semibold text-sm mb-3 text-slate-900 dark:text-white">Categories</h3>
        {/* ... */}
      </div>

      {/* Sources */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
        <h3 className="font-semibold text-sm mb-3 text-slate-900 dark:text-white">Sources</h3>
        {/* ... */}
      </div>
    </aside>
  );
}
```

### File: `apps/frontend-web/app/page.tsx`

**Ensure sidebar is sticky:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
  {/* Feed */}
  <div>
    <BentoGrid articles={allArticles} />
  </div>

  {/* Sidebar - Sticky */}
  <div className="hidden lg:block">
    <div className="sticky top-20">
      <FiltersPanel {...props} />
    </div>
  </div>
</div>
```

---

## Color System (Black & White Theme)

### Light Mode
```css
- Background: bg-white
- Card: bg-white
- Text: text-slate-900
- Muted: text-slate-500
- Border: border-slate-200
- Shadow: shadow-sm (black shadows)
```

### Dark Mode
```css
- Background: bg-slate-900
- Card: bg-slate-800
- Text: text-white
- Muted: text-slate-400
- Border: border-slate-700
- Shadow: shadow-sm
```

### Accent Colors (Keep for buttons/links)
```css
- Primary: text-teal-600 dark:text-teal-400
- Hover: hover:text-teal-700
- Background: bg-teal-600
```

---

## Testing Checklist

- [ ] FinMate logo visible in light mode
- [ ] All headings visible in light mode
- [ ] All text readable (black on white)
- [ ] Sidebar scrolls independently
- [ ] Main grid doesn't scroll when sidebar scrolls
- [ ] Borders visible (black/slate)
- [ ] Shadows visible (black)
- [ ] Icons visible (black/slate)
- [ ] Dark mode still works

---

## Files to Modify

1. ✅ `apps/backend-api/src/services/meta.service.ts` - Fixed sources endpoint
2. ⏳ `apps/frontend-web/components/Header.tsx` - Fix logo visibility
3. ⏳ `apps/frontend-web/components/FiltersPanel.tsx` - Fix scrolling + colors
4. ⏳ `apps/frontend-web/app/page.tsx` - Ensure sticky sidebar

---

## Status

✅ **Backend** - Sources endpoint fixed  
⏳ **Frontend** - Needs color and scrolling fixes  

Next: Apply the fixes to Header and FiltersPanel components.
