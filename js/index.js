 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAOOdI5E2HB7EEsOAWdWJd6y3LSDnZaHpA",
    authDomain: "webpushnotification-test.firebaseapp.com",
    projectId: "webpushnotification-test",
    storageBucket: "webpushnotification-test.appspot.com",
    messagingSenderId: "312603896197",
    appId: "1:312603896197:web:61cc945b42130480a9bcec"
  };
  
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

// 메시징 객체 가져오기
const messaging = firebase.messaging();

// FCM에서 다른 푸시 서비스로 메시지 요청을 보낼 때 VAPDI 키 사용자 인증 정보를 사용할 수 있다 (?????)
/*messaging.getToken({
	vapidKey : "BG0ZO5wuIf8lTgjjLTCrlzT_QAvwLVNOPVpM4EBcHkDxAWSGxFXd-XzUttW57uJgb8gYO65peyxdN9XfP_ImLcA"
});*/

// 앱 인스턴스의 현재 등록 토큰을 검색
navigator.serviceWorker.register('/firebase-messaging-sw.js')
.then(registration => {
	messaging.useServiceWorker(registration);
	messaging.getToken({ vapidKey: 'BG0ZO5wuIf8lTgjjLTCrlzT_QAvwLVNOPVpM4EBcHkDxAWSGxFXd-XzUttW57uJgb8gYO65peyxdN9XfP_ImLcA' }).then((currentToken) => {
		  if (currentToken) {
		    // Send the token to your server and update the UI if necessary
		    // ...
		  } else {
		    // Show permission request UI
			  messaging.requestPermission().then(function() {
				  return messaging.getToken();
			  })
			  .then(async function(token){
				  await fetch('/register', { method: 'post', body: token })
		          messaging.onMessage(payload => {
		              const title = payload.notification.title
		              const options = {
		                  body : payload.notification.body
		              }
		              navigator.serviceWorker.ready.then(registration => {
		                  registration.showNotification(title, options);
		              })
		          })
			  })
			  .catch(function(err) {
				  console.log("Error Occured");
			  })
			  
		  }
		}).catch((err) => {
		  console.log('An error occurred while retrieving token. ', err);
		  // ...
		});
	
})


