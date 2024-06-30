const admin = require('firebase-admin');
const { env } = require('process');

// Initialize Firebase Admin SDK
// const firebaseConfig = {
// 	apiKey: env.FIRE_STORE_API_KEY,
// 	authDomain: env.AUTH_DOMAIN,
// 	projectId: env.PROJECT_ID,
// 	storageBucket: env.STORAGE_BUCKET,
// 	messagingSenderId: env.SENDER_ID,
// 	appId: '1:1093408210203:web:b7d01fa2cc9fb353d167be',
// 	measurementId: 'G-R1LR052NGX'
// };

const firebaseConfig = {
	apiKey: 'AIzaSyA-T1OBYQLBsxBbcYLv49MWOKI9_qvj4mo',
	authDomain: 'crmbucket-2bbaa.firebaseapp.com',
	projectId: 'crmbucket-2bbaa',
	storageBucket: 'crmbucket-2bbaa.appspot.com',
	messagingSenderId: '1093408210203',
	appId: '1:1093408210203:web:b7d01fa2cc9fb353d167be',
	measurementId: 'G-R1LR052NGX'
};

// Initialize Firebase
admin.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = admin.firestore();

async function uploadImageToFirestore(imageFile, imageName, type) {
	try {
		// Upload the image to Firebase Storage
		const bucket = admin.storage().bucket();
		await bucket.upload(imageFile, {
			destination: imageName,
			metadata: {
				contentType: type
			}
		});

		// Get the download URL of the uploaded image
		const imageUrl = `https://storage.googleapis.com/${bucket.name}/${imageName}`;

		// Store the image URL in Firestore
		await db.collection('images').add({
			name: imageName,
			url: imageUrl
		});

		console.log('Image uploaded successfully.');
		return imageUrl;
	} catch (error) {
		console.error('Error uploading image:', error);
		throw error;
	}
}

module.exports = uploadImageToFirestore;

// Example usage:
// const imageFilePath = 'path-to-your-image-file.jpg'; // Provide the path to your image file
// const imageName = 'unique-image-name.jpg'; // Choose a unique name for your image

// uploadImageToFirestore(imageFilePath, imageName)
// 	.then((imageUrl) => {
// 		console.log('Image URL:', imageUrl);
// 	})
// 	.catch((error) => {
// 		console.error('Error:', error);
// 	});
