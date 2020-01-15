import {Injectable} from '@angular/core';

/*
 * Menu interface
 */
export interface Menu {
    state: string;
    name?: string;
    type?: string;
    icon?: string;
    children?: Menu[];
}

const HeaderOneItems = [
    {
        state: 'home',
        name: 'HOME',
        type: 'link',
        icon: 'home',
    },
 
    {
        state: 'products',
        name: 'Products',
        type: 'link',
        icon: 'party_mode'
    },
    {
        state: 'products',
        name: 'CATEGORIES',
        type: 'sub',
        mega: true,
        icon: 'party_mode',
        children: [
            {
                state: 'Telephone',
                name: 'TELEPHONE',
                type: 'sub',
                icon: 'arrow_right_alt',
                children: [
                    {
                        state: 'products/smartphone',
                        queryState: 'Oppo',
                        name: 'OPPO',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    },
                    {
                        state: 'products/smartphone',
                        queryState: 'Samsung',
                        name: 'SAMSUNG',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    },
                    {
                        state: 'products/smartphone',
                        queryState: 'Shirt',
                        name: 'SHIRT',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    },
                    {
                        state: 'products/smartphone',
                        queryState: 'T-Shirt',
                        name: 'T-SHIRT',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    }
                ]
            },
            {
                state: 'woman',
                name: 'WOMEN',
                type: 'sub',
                icon: 'arrow_right_alt',
                children: [
                    {
                        state: 'products/woman',
                        queryState: 'Dresses',
                        name: 'DRESS',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    },
                    {
                        state: 'products/woman',
                        queryState: 'Shirt',
                        name: 'SHIRT',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    },
                    {
                        state: 'products/woman',
                        queryState: 'T-Shirt',
                        name: 'T-SHIRT',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    }
                ]
            },
            {
                state: 'gadgets',
                name: 'GADGETS',
                type: 'sub',
                icon: 'arrow_right_alt',
                children: [
                    {
                        state: 'products/gadgets',
                        queryState: 'Headphone',
                        name: 'HEADPHONE',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    },
                    {
                        state: 'products/gadgets',
                        queryState: 'Smartphone',
                        name: 'SMARTPHONE',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    },
                    {
                        state: 'products/gadgets',
                        queryState: 'Watch',
                        name: 'WATCH',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    },
                    {
                        state: 'products/gadgets',
                        queryState: 'Speaker',
                        name: 'SPEAKER',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    }
                ]
            },
            {
                state: 'accessories',
                name: 'ACCESSORIES',
                type: 'sub',
                icon: 'arrow_right_alt',
                children: [
                    {
                        state: 'products/accessories',
                        queryState: 'Laptap',
                        name: 'LAPTOP ACCESSORIES',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    },
                    {
                        state: 'products/accessories',
                        queryState: 'Belts',
                        name: 'BELTS',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    },
                    {
                        state: 'products/accessories',
                        queryState: 'Jewellery',
                        name: 'JEWELLERY',
                        type: 'queryParams',
                        icon: 'arrow_right_alt',
                    }
                ]
            }
        ]
    },
//   {
//   state: "pages",
//   name: "PAGES",
//   type: "sub",
//   icon: "pages",
//   children: [
//      {  state: 'about', 
//         name: 'ABOUT',
//         type: 'link',
//         icon: 'arrow_right_alt',
//      },
//      {  state: 'term-condition', 
//         name: 'TERM AND CONDITION',
//         type: 'link',
//         icon: 'arrow_right_alt',
//      },
//      {  
//         state: 'privacy-policy', 
//         name: 'PRIVACY POLICY',
//         type: 'link',
//         icon: 'arrow_right_alt',
//       },
//       {  
//         state: 'blogs/detail', 
//         name: 'BLOG DETAIL',
//         type: 'link',
//         icon: 'arrow_right_alt',
//       },
//       {  
//         state: 'faq', 
//         name: 'FAQ',
//         type: 'link',
//         icon: 'arrow_right_alt',
//       },
//       {  
//         state: 'not-found', 
//         name: '404 PAGE',
//         type: 'link',
//         icon: 'arrow_right_alt',
//       },
//       {  
//          state: 'account/profile', 
//          name: 'User Profile',
//          type: 'link',
//          icon: 'arrow_right_alt',
//       },
//       {
//         state:'session',
//         name:"SESSION",
//         type:"subChild",
//         icon: 'supervised_user_circle',
//         children: [
//             {  
//             state: 'session/signin', 
//             name: 'SIGN IN',
//             type: 'link',
//             icon: 'arrow_right_alt',
//             },
//             {  
//                 state: 'session/signup', 
//                 name: 'REGISTER',
//                 type: 'link',
//                 icon: 'arrow_right_alt',
//             },
//             {  
//                 state: 'session/forgot-password', 
//                 name: 'FORGET PASSWORD',
//                 type: 'link',
//                 icon: 'arrow_right_alt',
//             },
//             {  
//                 state: 'session/thank-you', 
//                 name: 'THANK YOU',
//                 type: 'link',
//                 icon: 'arrow_right_alt',
//             }
//           ]
//        }
//     ],
// },
    {
        state: 'contact',
        name: 'CONTACT US',
        type: 'link',
        icon: 'perm_contact_calendar'
    },
    // {
    //   state:'admin-panel',
    //   name:"ADMIN PANEL",
    //   type:"link",
    //   icon: 'perm_identity'
    // }
];

const FooterOneItems = [
    {
        state: '',
        name: 'ABOUT',
        type: 'sub',
        icon: '',
        children: [
            {
                state: 'about',
                name: 'ABOUT',
                type: 'link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'term-condition',
                name: 'TERM AND CONDITION',
                type: 'link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'privacy-policy',
                name: 'PRIVACY POLICY',
                type: 'link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'faq',
                name: 'FAQ',
                type: 'link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'contact',
                name: 'CONTACT US',
                type: 'link',
                icon: 'perm_contact_calendar',
            }
        ]
    },
    {
        state: '',
        name: 'SESSION',
        type: 'sub',
        icon: '',
        children: [
            {
                state: 'session/signin',
                name: 'SIGN IN',
                type: 'link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'session/signup',
                name: 'REGISTER',
                type: 'link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'session/forgot-password',
                name: 'FORGET PASSWORD',
                type: 'link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'session/thank-you',
                name: 'THANK YOU',
                type: 'link',
                icon: 'arrow_right_alt',
            }
        ]
    },
    {
        state: '',
        name: 'CATEGORIES',
        type: 'sub',
        icon: '',
        children: [
            {
                state: 'products/women',
                name: 'WOMEN',
                type: 'link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'products/men',
                name: 'MEN',
                type: 'link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'products/accesories',
                name: 'ACCESSORIES',
                type: 'link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'products/gadgets',
                name: 'GADGETS',
                type: 'link',
                icon: 'arrow_right_alt',
            }
        ]
    },
    {
        state: '',
        name: 'SOCIAL',
        type: 'sub',
        icon: '',
        children: [
            {
                state: 'https://www.facebook.com/',
                name: 'Facebook',
                type: 'social_link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'https://twitter.com/',
                name: 'Twitter',
                type: 'social_link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'https://www.youtube.com/',
                name: 'Youtube',
                type: 'social_link',
                icon: 'arrow_right_alt',
            },
            {
                state: 'https://plus.google.com',
                name: 'Google Plus',
                type: 'social_link',
                icon: 'arrow_right_alt',
            }
        ]
    }

];

@Injectable()
export class MenuItems {

    /*
     * Get all header menu
     */
    getMainMenu(): Menu[] {
        return HeaderOneItems;
    }

    /*
     * Get all footer menu
     */
    getFooterOneMenu(): Menu[] {
        return FooterOneItems;
    }
}
