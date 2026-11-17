# 7STARBOYS — বিনা খরচে আপলোড সীমা সেট করা

এই ধাপগুলো বর্তমান Unsigned upload চালু রেখেই করা যায়। এতে Firebase Billing বা Cloud Functions লাগে না।

## ওয়েবসাইটের কোডে যা করা হয়েছে
- ছবি/ভিডিওর MIME type যাচাই
- ২৫ MB-এর বেশি ফাইল ব্রাউজার থেকেই আটকে দেওয়া
- HTTPS media URL ছাড়া সফল আপলোড ধরা হবে না

**সীমাবদ্ধতা:** ব্রাউজারের যাচাই একা নিরাপত্তা নয়; কেউ সরাসরি Cloudinary API-তে অনুরোধ পাঠাতে পারে। তাই নিচের Cloudinary preset-এও সীমা দিতে হবে।

## Cloudinary-তে একবার সেট করো
1. Cloudinary Dashboard খুলে সঠিক Product Environment নির্বাচন করো।
2. **Settings / Product environment settings → Upload → Upload presets** এ যাও।
3. `sevenstarboys` preset খুলে নিশ্চিত করো এটি বর্তমান ওয়েবসাইটের preset।
4. Preset-এ **Allowed formats** থাকলে শুধু এগুলো রাখো: `jpg,jpeg,png,webp,gif,mp4,mov,webm`।
5. **Maximum file size** থাকলে `26214400` bytes (25 MB) সেট করো।
6. Asset folder `7starboys` রাখো এবং Save করো।
7. Preset-এর Mode এখনকার মতো **Unsigned** রাখো; Signed-এ বদলাবে না, কারণ backend deploy হয়নি।

Cloudinary-এর Dashboard-এ কোনো অপশন না থাকলে অনুমান করে অন্য সেটিং বদলাবে না।

## কী এতে সুরক্ষিত হয় / হয় না
- বড় ফাইল ও অননুমোদিত ফাইল ফরম্যাটের অপব্যবহার কমাতে সাহায্য করে।
- এটি Firebase Auth password বা ফোনের ব্যক্তিগত ডেটা কাউকে দেয় না।
- Unsigned preset-এর নাম ও cloud name জানা থাকলে অন্য কেউও upload endpoint ব্যবহার করার চেষ্টা করতে পারে। তাই এটি Signed Upload-এর সমান নিরাপত্তা নয়।
- পূর্ণ Signed Upload চালাতে server-side function deploy ও Secret Key নিরাপদে সেট করতে হবে; তাতে Firebase Billing লাগতে পারে।

**কোনো API Secret, API Key, পাসওয়ার্ড বা OTP চ্যাটে পাঠাবে না।**
