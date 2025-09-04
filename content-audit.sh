#!/bin/bash
# Content audit script to verify migration

echo "=== Content Audit ==="
echo "Original posts: $(find ../posts -name "*.md" 2>/dev/null | wc -l)"
echo "Migrated posts: $(find src/content/posts -name "*.md" 2>/dev/null | wc -l)"
echo "Original poems: $(find ../poems -name "*.md" 2>/dev/null | wc -l)"  
echo "Migrated poems: $(find src/content/poems -name "*.md" 2>/dev/null | wc -l)"

echo -e "\n=== Draft Detection ==="
echo "Original drafts: $(grep -r "draft: true" ../posts ../poems 2>/dev/null | wc -l)"
echo "Migrated drafts: $(grep -r "draft: true" src/content 2>/dev/null | wc -l)"

echo -e "\n=== Frontmatter Validation ==="
# Check for files missing required frontmatter
missing_title=$(find src/content -name "*.md" -exec grep -L "title:" {} \;)
if [ -n "$missing_title" ]; then
    echo "Files missing title:"
    echo "$missing_title"
else
    echo "All files have title frontmatter ✓"
fi

missing_date=$(find src/content -name "*.md" -exec grep -L "date:" {} \;)
if [ -n "$missing_date" ]; then
    echo "Files missing date:"
    echo "$missing_date"
else
    echo "All files have date frontmatter ✓"
fi