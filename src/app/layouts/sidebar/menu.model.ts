export interface MenuItem {
    isActive?: boolean;
    id?: number;
    label?: string;
    icon?: string;
    link?: string;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
    subItems?: MenuItem[];
}
