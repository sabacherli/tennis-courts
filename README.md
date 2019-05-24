TennisCourt is a booking engine for tennis courts and connects players and owners to improve the managing of tennis courts for owners and accessibility to tennis courts for players. 

Each club receives a unique ID, which can be identified by the players on the platform. Owners can easily manage their "assets" by freely adding and removing tennis courts from the website, which are then immediately available for booking to all players using the site. The times available as well as the slot length is given. The Dashboard gives the owner an overview of when each of their courts are booked.  Currently, the web application serves as a reservation system. Future iterations could provide statistics on the vacancy rate of the courts as well as other interesting analytics. Moreover, payments could be added to the website upon booking a court using e.g. Stripe, adding a pricing algorithm based on the vacancy rate at specific times to maximize the profit for the clubs automatically.

Users are able to search for clubs with the use of unique IDs, or browse the most popular courts. Subsequently, they are able to navigate through different days and view which time slots are still available and which are already booked. By clicking on a green/free time slot, a user can reserve that time slot, which will subsequently turn red, and no longer be bookable by any other players. In the bookings section, the player gets an overview of all current slots that he or she has reserved, indicating the date, the court name and the time slot.


The single-page progressive web application can be visited under: https://tenniscourt-hsg.firebaseapp.com/ 

The link to the github repository is: https://github.com/SamuelAbacherli/TennisCourt

We use vue-CLI, the standard tooling baseline for the Vue ecosystem, to be able to rapidly develop our Vue.js web application. Vue-CLI is a globally installed npm package, that was developed on top of webpack and webpack-dev-server. (https://cli.vuejs.org/guide/)

TennisCourt uses Cloud Firestore, a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform, as its NoSQL database to store all the users and their respective assets (tennis courts), as well as the booking reservations. (https://firebase.google.com/products/firestore/)

We use Firebase's Authentication to create, manage and authenticate users using email addresses. In its current version, email and password is used to create and authenticate users. The flexible nature of Firebase gives us the opportunity to quickly expand authentication to include other sign-in methods, such as Google, Twitter, Facebook, or Phone. (https://firebase.google.com/products/auth/)

We also host our web application on Firebase's Hosting service, to which we could connect our own domain, should we have one. (https://firebase.google.com/products/hosting/)
