import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [


    // {
    //     id: 130,
    //     icon: 'bxs-bar-chart-alt-2',
    //     label: 'MENUITEMS.CHARTS.TEXT',
    //     subItems: [
    //         {
    //             id: 131,
    //             label: 'MENUITEMS.CHARTS.LIST.APEX',
    //             link: '/charts/apex',
    //             parentId: 130
    //         },
    //         {
    //             id: 132,
    //             label: 'MENUITEMS.CHARTS.LIST.CHARTJS',
    //             link: '/charts/chartjs',
    //             parentId: 131
    //         },
    //         {
    //             id: 133,
    //             label: 'MENUITEMS.CHARTS.LIST.CHARTIST',
    //             link: '/charts/chartist',
    //             parentId: 131
    //         },
    //         {
    //             id: 134,
    //             label: 'MENUITEMS.CHARTS.LIST.ECHART',
    //             link: '/charts/echart',
    //             parentId: 131
    //         },
    //         {
    //             id: 155,
    //             label: 'MENUITEMS.CHARTS.LIST.DEMO',
    //             link: '/charts/demo',
    //             parentId: 131
    //         }
    //     ]
    // },
    {
        id: 1,
        icon: 'bxs-bar-chart-alt-2',
        label: 'MENUITEMS.SALES.TEXT',
        subItems: [
            {
                id: 2,
                label: 'MENUITEMS.SALES.LIST.PAYMENTCOLLECTION',
                link: '/sales/paymentCollectionPlan',
                parentId: 1
            },
            {
                id: 3,
                label: 'MENUITEMS.SALES.LIST.TURNOVER',
                link: '/sales/turnOver',
                parentId: 1
            }
        ]
    }

];

