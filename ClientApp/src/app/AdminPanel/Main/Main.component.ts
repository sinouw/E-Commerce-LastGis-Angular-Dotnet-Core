import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminPanelServiceService} from '../Service/AdminPanelService.service';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-main-admin-panel',
    templateUrl: './Main.component.html',
    styleUrls: ['./Main.component.scss']
})

export class MainAdminPanelComponent implements OnInit {

    deviceInfo: any = null;
    private _mediaSubscription: Subscription;
    private _routerEventsSubscription: Subscription;
    private _router: Subscription;
    isMobile: boolean = false;
    isMobileStatus: boolean;
    layout: any = 'ltr';
    rtlStatus: boolean = false;

    /** Used for toggle the sidebar menu. **/
    @ViewChild('sidenav', {static: true}) sidenav;

    constructor(public coreService: AdminPanelServiceService,
                public router: Router,
                private activatedRoute: ActivatedRoute,
                private deviceService: DeviceDetectorService,
                private media: MediaObserver) {
    }

    ngOnInit() {

        document.getElementById('html').classList.remove('user-end');

        this.deviceInfo = this.deviceService.getDeviceInfo();
        if (this.deviceInfo.device == 'ipad' || this.deviceInfo.device == 'iphone' || this.deviceInfo.device == 'android') {
            this.coreService.sidenavMode = 'over';
            this.coreService.sidenavOpen = false;
        }

        this._mediaSubscription = this.media.media$.subscribe((change: MediaChange) => {

            this.isMobileStatus = (change.mqAlias == 'xs') || (change.mqAlias == 'sm') || (change.mqAlias == 'md');
            this.isMobile = this.isMobileStatus;
            if (this.isMobile) {
                this.coreService.sidenavMode = 'over';
                this.coreService.sidenavOpen = false;
            } else {
                this.coreService.sidenavMode = 'side';
                this.coreService.sidenavOpen = true;
            }
        });

        this._routerEventsSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && this.isMobile) {
                this.sidenav.close();
            }
        });

        if ((this.activatedRoute.snapshot.url[0].path) == 'admin-panel') {
            document.getElementById('html').classList.add('admin-panel');
        } else {
            document.getElementById('html').classList.remove('user-end');
        }
    }

    /**
     * changeRTL method is used to change the layout of template rtl.
     */
    changeRTL() {
        this.layout = 'rtl';
        this.rtlStatus = true;
    }

    /**
     * changeLTR method is used to change the layout of template ltr.
     */
    changeLTR() {
        this.layout = 'ltr';
        this.rtlStatus = false;
    }

    /**
     *As router outlet will emit an activate event any time a new component is being instantiated.
     */
    onActivate(e) {
        window.scroll(0, 0);
    }
}
