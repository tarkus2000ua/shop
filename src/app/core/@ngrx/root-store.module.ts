import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../../../environments/environment';
import { ProductsStoreModule } from './products/products-store.module';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers } from './meta-reducers';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { routerReducers, CustomSerializer } from './router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      metaReducers,
      // All checks will automatically be disabled in production builds
      runtimeChecks: {
        strictStateImmutability: true, // default value is true
        strictActionImmutability: true, // default value is true
        // router state is not serializable
        // set false if you don't use CustomSerializer
        strictStateSerializability: false, // default value is false
        // router action is not serializable
        // set false
        strictActionSerializability: false, // default value is false
        strictActionWithinNgZone: true, // default value is false
        strictActionTypeUniqueness: true, // default value is false
      },
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      // serializer: CustomSerializer // has a priority over routerState
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ProductsStoreModule,
  ],
})
export class RootStoreModule {}
