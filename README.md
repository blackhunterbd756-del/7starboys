7STARBOYS — reviewed project package

এই প্যাকেজে মূল HTML পেজগুলো রাখা হয়েছে।

এই পাসে করা পরিবর্তন:
- Login ও Register পেজের রোবট/শিল্ড SVG সরিয়ে মানব-অবয়বভিত্তিক সিনেমাটিক ভিজ্যুয়াল করা হয়েছে।
- Login দৃশ্যে হালকা আলো/ইমপ্যাক্ট অ্যানিমেশন যোগ করা হয়েছে; গ্রাফিক রক্তাক্ত দৃশ্য রাখা হয়নি।
- Firebase web config-এর API key সব HTML পেজে এক করা হয়েছে (প্রজেক্টে আগে দুই ধরনের key ছিল)।
- বিদ্যমান পেজ ও ফিচারগুলো বাদ দেওয়া হয়নি।

প্রাথমিক যাচাই:
- 8টি HTML পেজের JavaScript syntax check: PASS
- স্থানীয় href/src ফাইল-লিংক পরীক্ষা: PASS
- Firebase API key variant: 1

গুরুত্বপূর্ণ সীমাবদ্ধতা:
- এই ZIP-এ Firestore Security Rules ফাইল নেই। তাই Firestore permission, admin authorization, reciprocal friend-list write এবং notification write-সহ rules-dependent কাজগুলো live Firebase-এ যাচাই করা যায়নি।
- Firebase/Cloudinary live sign-in, upload, database writes এবং real-device browser test এই পরিবেশ থেকে চালানো হয়নি।
- API key একই করা হয়েছে; Firebase Console-এ ওই key-টি starboys-7539f project-এর জন্য সক্রিয় আছে কি না, সেটি live console access ছাড়া নিশ্চিত করা যায় না।

প্রকাশের আগে Firebase Console-এর বর্তমান Firestore Rules আলাদাভাবে পর্যালোচনা করতে হবে।
