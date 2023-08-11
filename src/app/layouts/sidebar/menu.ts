import { ShopsComponent } from 'src/app/pages/ecommerce/shops/shops.component';
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
            },
            {
                id: 4,
                label: 'MENUITEMS.SALES.LIST.DEVELOPMENTCOSTDETAILS',
                link: '/sales/developmentcostdeatils',
                parentId: 1
            },
            {
                id: 5,
<<<<<<< Updated upstream
                label: 'MENUITEMS.SALES.LIST.DAILYSALESDATA',
                link: '/sales/dailysalesdata',
=======
                label: 'MENUITEMS.SALES.LIST.MONTHLYVALUEADDITIONTARGETV/SACTUAL',
                link: '/sales/monthlayvalueadditiontargetvsactual',
>>>>>>> Stashed changes
                parentId: 1
            },
            {
                id: 6,
<<<<<<< Updated upstream
                label: 'MENUITEMS.SALES.LIST.MONTHLYSALESANDTARGET',
                link: '/sales/monthlysalesandtarget',
                parentId: 1
            },
            {
                id: 7,
                label: 'MENUITEMS.SALES.LIST.CUSTOMERWISEPLANVS.ACTUALSALE',
                link: '/sales/customerwiseplanvs.actualsale',
=======
                label: 'MENUITEMS.SALES.LIST.SCHUDLEADHERENCEFORTHEMONTH',
                link: '/sales/scheduleadherenceforthemonth',
>>>>>>> Stashed changes
                parentId: 1
            }

        ]
    },
    {
        id: 11,
        icon: 'bxs-bar-chart-alt-2',
        label: 'MENUITEMS.FINANCE.TEXT',
        subItems: [

            {
                id: 12,
                label: 'MENUITEMS.FINANCE.LIST.CUSTOMERRECEIVABLECHART',
                link: '/finance/customerreceivablechart',
                parentId: 11
            }
        ]
    },
    {
        id: 21,
        icon: 'bxs-bar-chart-alt-2',
        label: 'MENUITEMS.PURCHASE.TEXT',
        subItems: [
            {
                id: 22,
                label: 'MENUITEMS.PURCHASE.LIST.SUPPLIERWISEPURCHASEANDCRNTONS',
                link: '/purchase/SupplierwisepurchaseandCRinTons',
                parentId: 21
            },
            {
                id: 23,
                label: 'MENUITEMS.PURCHASE.LIST.TOP5SUPPLIERSCRPERCENT',
                link: '/purchase/top5supplierscrpercentcomponent',
                parentId: 21
            },
            {
                id: 24,
                label: 'MENUITEMS.PURCHASE.LIST.PURCHASETONNAGE',
                link: '/purchase/PurchaseTonnage',
                parentId: 21
            }

        ]
    },
    {
        id:31,
        icon: 'bxs-bar-chart-alt-2',
        label:'MENUITEMS.WIPMACHINESHOP.TEXT',
        subItems: [
            {
                id:32,
                label:'MENUITEMS.WIPMACHINESHOP.LIST.OILCONSUMPTION',
                link:'/wipmachineshop/oilconsumption',
                parentId:31

            }
        ]
    }


];


