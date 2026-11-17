# 7STARBOYS নিরাপদ মিডিয়া আপলোড চালু করার ধাপ

এই ফাইলটি শুধু সেটআপ নির্দেশনা। Function deploy না হওয়া পর্যন্ত বর্তমান ওয়েবসাইটের unsigned upload-ই চালু থাকবে।

## যা লাগবে
- Firebase project: `starboys-7539`
- Firebase project-এ Cloud Functions ব্যবহারের অনুমতি এবং প্রয়োজন হলে Blaze billing plan
- Cloudinary Dashboard থেকে API Key এবং API Secret

**কখনো API Secret GitHub, ওয়েবসাইটের HTML/JavaScript, বা ChatGPT-তে দেবেন না।**

## চালু করার ধাপ
1. Firebase Console-এ `starboys-7539` প্রজেক্ট খুলে Billing/Usage দেখুন। Blaze-এ যেতে হলে খরচের সীমা/বাজেট alert আগে সেট করুন। Cloud Functions deploy করার জন্য billing account যুক্ত করতে হতে পারে।
2. নিজের কম্পিউটারে Node.js 20+ এবং Firebase CLI ইনস্টল করুন।
3. এই repository clone করে project directory-তে যান।
4. চালান: `firebase login`
5. চালান: `firebase use starboys-7539`
6. Cloudinary Dashboard থেকে API Key কপি করে terminal-এ চালান: `firebase functions:secrets:set CLOUDINARY_API_KEY` এবং prompt-এ API Key দিন।
7. Cloudinary API Secret-এর জন্য চালান: `firebase functions:secrets:set CLOUDINARY_API_SECRET` এবং prompt-এ API Secret দিন। Secret কোনো চ্যাটে বা source file-এ লিখবেন না।
8. চালান: `firebase deploy --only functions`
9. Deploy সফল হলে Function URL এবং logs যাচাই করতে হবে। এরপরই frontend-কে signed upload endpoint-এ বদলানো যাবে এবং test upload করতে হবে।

## সতর্কতা
- Function deploy ও পরীক্ষা শেষ না হওয়া পর্যন্ত Cloudinary preset মুছবেন না বা Unsigned থেকে Signed করবেন না; করলে বর্তমান upload বন্ধ হতে পারে।
- Billing plan চালু করলেই বিনা খরচে থাকবে—এমন নিশ্চয়তা নেই। ব্যবহার অনুযায়ী চার্জ হতে পারে।
- এই নির্দেশনা অনুসরণ করে deploy না করা পর্যন্ত নিরাপত্তা পরিবর্তনটি live নয়।
