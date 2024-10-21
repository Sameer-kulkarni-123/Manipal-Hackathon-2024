import { Account,Avatars,Client,Databases,ID,Query,Storage,} from "react-native-appwrite";


export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.sam.M#",
  projectId: "670fae040010412db050",
  databaseId: "670fb1a7001eb2297d43",
  userCollectionId: "670fb1d7002f8bdbfe57",
  vetCollectionId: "6710e2e60012751a88db"
};


const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    // Attempt to delete the current session
    try {
      await account.deleteSession('current');
    } catch (error) {
      // Ignore the error if there's no active session
      console.log('No active session to delete:', error.message);
    }

    // Register the new account
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error('Failed to create an account');

    // Create a new session
    const session = await signIN(email, password);

    // Generate the avatar URL based on the username
    const avatarUrl = avatars.getInitials(username);

    // Save user details to the database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function signIN(email, password) {
  try {
    // Attempt to delete the current session
    try {
      await account.deleteSession('current');
    } catch (error) {
      // Ignore the error if there's no active session
      console.log('No active session to delete:', error.message);
    }

    // Create a new session
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}


// Register vet
export async function createVet(email, password, name, phoneNumber, hospital, experience, gender) {
  try {
    // Attempt to delete the current session
    try {
      await account.deleteSession('current');
    } catch (error) {
      // Ignore the error if there's no active session
      console.log('No active session to delete:', error.message);
    }

    // Register the new account for the vet
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    if (!newAccount) throw new Error('Failed to create a vet account');

    // Create a new session
    const session = await signIN(email, password);

    // Generate the avatar URL based on the vet's name
    const avatarUrl = avatars.getInitials(name);

    // Save vet details to the database
    const newVet = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.vetCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        name: name,
        phoneNumber: phoneNumber,
        hospital: hospital,
        experience: experience,
        gender: gender,
        avatar: avatarUrl,
      }
    );

    return newVet;
  } catch (error) {
    throw new Error(error.message);
  }
}


// Get current vet details by vet ID
export async function getCurrentVet(vetId) {
  try {
    const vet = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.vetCollectionId,
      vetId
    );

    if (!vet) throw new Error('Vet not found');

    return vet;
  } catch (error) {
    console.log(error);
    return null;
  }
}


// List all vets or filter vets by specialty
export async function listVets(specialty = null) {
  try {
    let query = [];
    if (specialty) {
      query.push(Query.equal("specialty", specialty));
    }

    const vetList = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.vetCollectionId,
      query
    );

    return vetList.documents;
  } catch (error) {
    throw new Error(error.message);
  }
}
