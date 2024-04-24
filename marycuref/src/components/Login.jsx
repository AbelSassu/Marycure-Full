import { useEffect } from "react";
import { useUserContext } from "./UserContext";

import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
    useSession
} from "@clerk/clerk-react";

const Login = () => {
  const { session } = useSession();
  const { isSignedIn, user } = useUser();
  const { setUserDetails } = useUserContext();

  useEffect(() => {
      const fetchUserData = async () => {
          if (isSignedIn && user && session) {
              try {
                  const token = await session.getToken(); 
                  const userData = {
                      clerkUserId: user.id,
                      email: user.primaryEmailAddress?.emailAddress || "",
                      phoneNumber: user.primaryPhoneNumber?.phoneNumber || "",
                      firstName: user.firstName || "",
                      lastName: user.lastName || "",
                  };

                  const response = await fetch(
                      "https://localhost:7225/api/Users/sync",
                      {
                          method: "POST",
                          headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`, // Includi il token JWT nell'header di autorizzazione
                          },
                          body: JSON.stringify(userData),
                      }
                  );

                  if (!response.ok) {
                      // Gestisci le risposte non riuscite
                      const errorData = await response.json();
                      throw new Error(
                          errorData.message ||
                              `Errore non riuscito: ${response.status}`
                      );
                  }

                  const data = await response.json();
                  setUserDetails({
                      userID: data.userID,
                  });
              } catch (error) {
                  // Gestisci gli errori di rete e le risposte non riuscite qui
                  console.error(
                      "Errore durante la sincronizzazione dell'utente:",
                      error
                  );
              }
          }
      };

      fetchUserData();
  }, [isSignedIn, user, session, setUserDetails]);

    return (
        <>
            <SignedOut>
                <SignInButton className="text-oro"/>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </>
    );
};

export default Login;
