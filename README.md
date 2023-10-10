# gsapp-mobile

Mobile app to creating graphics for sports teams on social media.
I'm currently at the optimization stage, so the old commits have lower quality code than the newer ones, but it shows my development.


# Description of content in every screen

`/screens/AccountScreen`

Here's the code with user account information. Firstly it's basic information from AuthContext. Next information is about license, what type of license has user and if it's full license, what is expire date of license. Last thing is possibility to create team license and add into this up to 4 accounts. By this thing every connected account don't have to add the same team as similar account.

`/screens/CatalogScreen`

Here's the code with showing publicly available graphic which are sorted by themes and sports.

`/screens/CreatorScreen`

Here's the largest code, becuase it's connecting a lot of components that's adding text, results and images. That's working with buttons that changing positions.
Creating of image is working on webView and it's posting then outside to save this on mobile phone.

`/screens/GuideScreen`

Here's the simple code with description about every screen how it works.

`/screens/IndividualCatalogScreen`

Here's the code with navigation section to other screens, and under navigation is graphic assigned to account

`/screens/LoginScreen`

Here's the code with log in with email and password or with google.

`/screens/MainPanelScreen`

Here's the code that has add, edit, delete and show function of team. Code is working with players and opponents like when user is updating or deleting team, players and opponents teams key are changing to new or deleting from firebase firestore. 

`/screens/OfferScreen`

Here's the code with form and promotion code for licence. The code is connected here with backend of app.

`/screens/OpponentsScreen`

Here's the code with add, edit, delete, show function of opponents. Here's code to create place preset too

`/screens/PlayersScreen`

Here's the code with add, edit, delete, show function of players. Here's code to create nad edit starting XI preset too.

`/screens/RegisterScreen`

Here's the code with register with email and password or with google.

`/screens/StartingScreen`

Here's the code with option to log in and register.

`/screens/SuccessScreen`

Here's code that read order id and then giving to user license

