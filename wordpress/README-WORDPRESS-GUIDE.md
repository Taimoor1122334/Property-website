# Richport Southern — WordPress Conversion & Theming Guide

This directory contains the complete, production-ready WordPress Theme and Custom Post Type architecture for **Richport Southern, LLC**.

---

## 1. Directory Structure & File Map

```
/wordpress
├── style.css                     # Official WordPress Theme definition & metadata
├── theme.json                    # WordPress 6.x Full Site Editing (FSE) design tokens
├── functions.php                 # CPT 'property', Taxonomies, REST API fields, & scripts
├── acf-fields.json               # 1-Click Importable ACF Field Group schema
├── header.php                    # Global semantic site header with WP navigation
├── footer.php                    # Global semantic site footer & legal disclosures
├── front-page.php                # Homepage template (Hero, Search Strip, Featured Loop)
├── archive-property.php          # Property portfolio archive template (/inventory)
├── single-property.php           # Individual property detail template
└── template-parts/
    └── property-card.php         # Modular reusable property card loop template
```

---

## 2. Converting the React App to WordPress (Two Approaches)

### Approach A: Standalone WordPress Theme (PHP + Tailwind / CSS)
1. Copy the contents of the `/wordpress` directory to `wp-content/themes/richport-southern/`.
2. In WordPress Admin, navigate to **Appearance > Themes** and activate **Richport Southern**.
3. Install the **Advanced Custom Fields (ACF)** plugin.
4. Go to **Custom Fields > Tools > Import Field Groups** and upload `acf-fields.json`.
5. Go to **Arkansas Properties > Add New** to begin adding land parcels and homes.
6. The templates automatically use the exact styling, color tokens, and layout ratios defined in `theme.json`.

---

### Approach B: Headless WordPress (WordPress CMS + React Frontend)
If you want to keep this React application running while managing all property listings from WordPress:
1. `functions.php` automatically enables `show_in_rest => true` on both the `property` CPT and all custom metadata fields.
2. Query properties via the standard WordPress REST API endpoint:
   ```
   GET https://your-domain.com/wp-json/wp/v2/properties?_embed
   ```
3. Custom taxonomy filtering is supported out of the box:
   ```
   GET https://your-domain.com/wp-json/wp/v2/properties?property_county=Pulaski
   ```

---

## 3. Custom Post Type & Taxonomies Specification

- **Post Type**: `property` (Archive slug: `/inventory`, Single slug: `/properties/{slug}`)
- **Taxonomies**:
  - `property_county` (Hierarchical: Pulaski, Saline, Garland, Sebastian, Faulkner, Jefferson, etc.)
  - `property_type` (Single Family Residence, Vacant Residential Land, Rural Acreage / Timber, Commercial / Mixed)

---

## 4. Design Tokens (`theme.json`)

All design tokens are synced directly with the web application:
- **Primary Green**: `#153023` (`pine-800`)
- **Dark Forest**: `#0F241A` / `#13281E` (`pine-900`)
- **Arkansas Gold**: `#C29F59` (`gold-500`) / `#DFC386` (`gold-400`)
- **Parchment Canvas**: `#FAF8F5` (`parchment-50`)
- **Editorial Typography**: `Cinzel` (display headings), `Prata` (editorial serif), and `Plus Jakarta Sans` (interface text).
