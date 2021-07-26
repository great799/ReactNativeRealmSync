import Realm from 'realm';
import { NoteSchema } from './schema';

// place your RealmApp ID here
const app = new Realm.App({ id: "applicationandroidrealm-qjvay", timeout: 10000 });

// can implement inBuilt JWT, Google, Facebook, Apple Authentication Flow.
const credentials = Realm.Credentials.anonymous(); // LoggingIn as Anonymous User. 

const OpenRealmBehaviorConfiguration = {
    type: "openImmediately",
  };

getRealm = async () => {

  // loggedIn as anonymous user
  const loggedInUser = await app.logIn(credentials);
  
  // MongoDB RealmConfiguration
  const configuration = {
    schema: [NoteSchema], // add multiple schemas, comma seperated.
    sync: {
      user: app.currentUser, // loggedIn User
      partitionValue: "aman", // should be userId(Unique) so it can manage particular user related documents in DB by userId
      // The behavior to use when this is the first time opening a realm.
    newRealmFileBehavior: OpenRealmBehaviorConfiguration,
    // The behavior to use when a realm file already exists locally,
    // i.e. you have previously opened the realm.
    existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
    }
  };

  return Realm.open(configuration);
}

export default getRealm;