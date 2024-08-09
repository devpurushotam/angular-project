import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { loadGapiInsideDOM } from 'gapi-script';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth2: gapi.auth2.GoogleAuth;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private authInitialized: Promise<void>;

  constructor() {
    this.authInitialized = this.initClient();
  }

  private initClient(): Promise<void> {
    return new Promise((resolve, reject) => {
      loadGapiInsideDOM().then(() => {
        gapi.load('auth2', () => {
            console.log("gapi initiated");
          this.auth2 = gapi.auth2.init({
            client_id: '872658188174-tf46ui5fe852qae790rpjj7jdbnljbi9.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/classroom.coursework.students',
            
          });

          this.auth2.isSignedIn.listen((isSignedIn: boolean) => {
            this.isAuthenticatedSubject.next(isSignedIn);
          });

          if (this.auth2.isSignedIn.get()) {
            this.isAuthenticatedSubject.next(true);
          }
          
          resolve();
        });
      }).catch(reject);
    });
  }

    public signIn(): Promise<void> {
        return this.authInitialized.then(() => {

            console.log("this.auth2", this.auth2)
            return this.auth2.signIn().then((user) => {
                console.log("getting user", user);
                this.isAuthenticatedSubject.next(true);
            }).catch((error) => {
                console.error('Sign-in error:', error);
                // this.signOut()
                // this.isAuthenticatedSubject.next(true);
                // this.isAuthenticatedSubject.next(false);
            });;
        });
    }

    // public signIn(): Promise<void> {
    //     return this.authInitialized.then(() => {
    //         return this.auth2.signIn().then((user) => {
    //             console.log("getting user data", user)
    //             if (user.isSignedIn()) {
    //                 console.log("user sign in success", user)
    //                 this.isAuthenticatedSubject.next(true);
    //             } else {
    //                 console.log("user not sign in")
    //                 this.isAuthenticatedSubject.next(false);
                    
    //             }
    //         }).catch((error) => {
    //             console.error('Sign-in error:', error);
    //             this.isAuthenticatedSubject.next(false);
    //         });
    //     });
    // }

  

  public signOut(): Promise<void> {
    return this.authInitialized.then(() => {
      return this.auth2.signOut().then(() => {
        this.isAuthenticatedSubject.next(false);
      });
    });
  }

  public getAuthToken(): Promise<string> {
    return this.authInitialized.then(() => {
      if (this.auth2.isSignedIn.get()) {
        return this.auth2.currentUser.get().getAuthResponse().id_token;
      } else {
        return Promise.reject('User is not signed in');
      }
    });
  }

  public isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
