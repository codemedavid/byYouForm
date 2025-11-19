# Fix for Checkout and Image Upload Issues

## Issue 1: Checkout Not Working - Missing Orders Table

The checkout is failing because the `orders` table doesn't exist in your Supabase database.

### Solution:

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Open the file `CREATE_ORDERS_TABLE.sql` in this project
4. Copy the entire SQL code
5. Paste it into the Supabase SQL Editor
6. Click **Run** to execute the migration

This will create the `orders` table with all necessary columns and indexes.

### What this fixes:
- ✅ Checkout will now be able to save orders to the database
- ✅ Orders will be stored with customer information, shipping details, and order items
- ✅ You'll be able to track orders in your database

---

## Issue 2: Image Upload Not Storing Actual Images on Mobile

The image upload was storing placeholder files instead of actual images when using mobile devices.

### What was fixed:

1. **Better file validation**: Added checks to ensure the selected file is actually a valid image file, not a placeholder
2. **Mobile-friendly validation**: The code now checks both MIME type and file extension (since mobile browsers sometimes don't set MIME types correctly)
3. **Placeholder detection**: Added detection for placeholder files (like "take photo" files) that have no actual image data
4. **File input reset**: The file input is now properly reset after errors to allow selecting files again

### Changes made:

- **ImageUpload.tsx**: 
  - Added better file validation
  - Added placeholder file detection
  - Improved error handling and file input reset
  
- **useImageUpload.ts**:
  - Added mobile-friendly file type validation (checks both MIME type and extension)
  - Added minimum file size check to reject placeholder files

### How to test:

1. On a mobile device, go to the Admin Dashboard
2. Try uploading an image:
   - **Option 1**: Take a photo with the camera
   - **Option 2**: Select an image from your gallery
3. The image should now upload correctly and display in the preview
4. If you see an error about a placeholder file, make sure you actually selected or took a photo (don't just click "Take Photo" and cancel)

---

## Testing Checklist

- [ ] Run the `CREATE_ORDERS_TABLE.sql` migration in Supabase
- [ ] Test checkout flow - place an order and verify it saves
- [ ] Test image upload on mobile device - take a photo
- [ ] Test image upload on mobile device - select from gallery
- [ ] Verify images are stored in Supabase Storage
- [ ] Verify images display correctly in the admin dashboard

---

## Notes

- The orders table is created without Row Level Security (RLS) enabled by default, allowing public inserts. If you need RLS, you can enable it later.
- Image uploads are validated to be at least 1KB in size to prevent placeholder files from being uploaded.
- The file input accepts JPEG, PNG, WebP, and GIF formats.

