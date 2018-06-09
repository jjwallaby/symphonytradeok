# Symphony TradeOK App - Hackathon 2018 SG/HK/TKY

This is the source code from TradeOK Team on the Symphony Hackathon 2018 in SG/HK/TKY.

The overall purpose is showing the flow from Internal banking system Repo trades to be rolled for the day

and showing this view as an React App in the Symphony Platform '**Client API Extension**'.

The more detail overview can be seen on Linked In.

Below 2 and 3 applications will not really work unles you have access/sll certtificates to develop2 symphony server.

There are basically 3 parts.   The trade listeners is port 5000.  These 3 services process need to be started in seperate

> Please NOTE:  recast.ai was brought over by SAP.  How long before recast.ai is not free ...maybe not long.

windows.

1. Internal System that keeps hold of the updated Trades done  \(folder westbanksys\)
2. Symphony Bot which you only can run, if you have been given valid certificates.  \(folder mybotapp\)
3. The actual 'cleint API Extension' that runs on Symphony platform. \(folder: symapp\)

Please note.  this may not work if you are behind a firewall.

Install each own packages.   symapp has the most packages as it is a GUI, also has been cloned from my past projects

symapp is the merge version of previous react guis built and the  'Hello World' example provided by Symphony 'Client API Extension'.

```
cd westbanksys
npm install
cd ../
cd mybotapp
npm install
cd ../
cd symapp
npm install
```

## To start 1.  Internal System westbanksys

Please note there is a setup_env.bat which sets the DATA\_DIR_

![](/assets/DATA_DIR_setup.png)

DATA\_DIR needs to be set for location of json trades files which has 21.

```
cd westbanksys
.\setup_env.bat
node app
```

Output should look like :  Starts on port 5000.

![](/assets/westbanksys_pic1)

## To start 2.  Symphony bot

```
cd mybotapp
node index
```

![](/assets/symphon_botstart.png)

## To Start 3.  Requires logging onto develop2.symphony.com to load the local app running on **port 4000 **

In your faviourite browser.  [https://develop2.symphony.com/](https://develop2.symphony.com/)

### Part 1.  Start the app on  your local PC.

```
cd symapp
npm run watch
```

### Part 2.  Test/accept ssl certificate on local machine

open web tab

```
https://localhost:4000/app.html
```

### Part 3.  Load the mybotapp into Symphony platform.

```
https://develop2.symphony.com/client/index.html?bundle=https://localhost:4000/bundle.json
```

You can now use the APP. in Symphony platform.



Should look like this :-

![](/assets/botuser60.png)



