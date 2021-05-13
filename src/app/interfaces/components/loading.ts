export type type_loading =  'blank' | 'balls' | 'bars' | 'bubbles' | 'cubes' | 'cylon' | 'spin' | 'spinningBubbles' | 'spokes' ;

export interface i_loading {
    type: type_loading;
    color: string;
    delay?: number;
    height?: string;
    width?: string;
} 