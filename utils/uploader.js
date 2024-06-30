const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/'); // Ensure this directory exists
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image/')) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type, only images are allowed!'), false);
	}
};

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});

/**
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-T1OBYQLBsxBbcYLv49MWOKI9_qvj4mo",
  authDomain: "crmbucket-2bbaa.firebaseapp.com",
  projectId: "crmbucket-2bbaa",
  storageBucket: "crmbucket-2bbaa.appspot.com",
  messagingSenderId: "1093408210203",
  appId: "1:1093408210203:web:b7d01fa2cc9fb353d167be",
  measurementId: "G-R1LR052NGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 */

module.exports = upload;
