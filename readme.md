To run this locally, you need to do the following:

1. Create a firebase project, enable authentication and realtime database

2. Create a file in the root of this project named .env.local, and configure the following variables for your firebase project:

```
VUE_APP_FIREBASE_API_KEY=<your key>
VUE_APP_FIREBASE_PROJECT=<your project>
VUE_APP_FIREBASE_AUTH_DOMAIN=<your auth domain>
VUE_APP_FIREBASE_DATABASE_URL=<your db url>
```

You will also need to configure the database rules to allow access for authenticated users:

rules.json

```
{
  "rules": {
    "notes": {
      "$uid": {
        ".read": "auth.uid == $uid",
        ".write": "auth.uid == $uid"
      }
    }
  }
}
```
