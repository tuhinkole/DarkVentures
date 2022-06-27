import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { getApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth, initializeAuth, indexedDBLocalPersistence } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { Capacitor } from '@capacitor/core';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule.withServerTransition({ appId: 'serverApp' }), IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAnalytics(() => getAnalytics()),
      provideAuth(() => {
        if(Capacitor.isNativePlatform){
          return initializeAuth(getApp(), {
            persistence: indexedDBLocalPersistence
          });
        }else{
          return getAuth();
        }
      }),
      provideDatabase(() => getDatabase()),
      provideFirestore(() => getFirestore()),
      provideFunctions(() => getFunctions()),
      provideMessaging(() => getMessaging()),
      providePerformance(() => getPerformance()),
      provideRemoteConfig(() => getRemoteConfig()),
      provideStorage(() => getStorage())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ScreenTrackingService,UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
